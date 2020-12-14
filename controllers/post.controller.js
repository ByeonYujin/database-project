const db = require("../models");
const secure = require("../security");
const baseurl = require('url-safe-base64');
const url = require("url");
const uuidv4 = require("uuid").v4;

const config = require("../config");

const categories = {}
const catIds = {}

// Categories caching
db.category.findAll({
    include: [
        {
            model: db.category,
            required: true,
            attributes: ["catId", "name"]
        }
    ]
})
.then(res => {
    for (const parent of res) {
        const children = []

        for (const child of parent.categories) {
            catIds[child.dataValues.name] = child.dataValues.catId
            children.push(child.dataValues.name)
        }
        catIds[parent.dataValues.name] = parent.dataValues.catId 
        categories[parent.dataValues.name] = children
    }
})
.catch(console.log)

exports.getCategories = (req, res) => {
    if (Object.keys(categories).length > 0) {
        return res.status(200).send(JSON.stringify(categories))
    }
    else {
        return res.status(500).send({ msg: "Category empty" })
    }
}

exports.upload = (req, res) => {
    const body = req.body

    db.product.create({
        category: catIds[body.childCategory],

        price: parseInt(body.price),
        direct: body.direct,
        indirect: body.indirect,
        soldout: false
    })
    .then(product => {
        return db.post.create({
            writer: req.user.userId,
            
            title: body.title,
            context: body.context,

            sell: product.dataValues.id
        })
    })
    .then(post => {
        req.postId = post.dataValues.postId

        let pool = []
        for (const image of req.imgURLs) {
            pool.push(db.image.create({
                url: image,
                included: req.postId
            }))
        }
        return Promise.all(pool)
    })
    .then(() => {
        return res.status(200).send({ linkTo: secure.encrypt(req.postId) })
    })
    .catch(console.log)
}

const parseConditions = (query) => {
    if (!query) return {};

    // 카테고리
    const cats = [];
    if (query.category) {
        if (query.category in categories) {
            cats.push(...categories[query.category].map(c => catIds[c]));
        }
        else if (catIds[query.category]) {
            cats.push(catIds[query.category]);
        }
    }
    const catOptions = 
    cats.length > 0 ? 
    {
        category: {
            [db.Op.or] : cats
        }
    } : {};

    // 작성자
    const writer = query.user || "";
    const writerOptions = writer.length > 0 ? { writer: writer } : {};
    
    // 키워드
    const keyword = query.keyword || "";
    const keywordOptions = 
    keyword.length > 0 ? {
        title: {
            [db.Op.like]: `%${keyword}%`
        }
    } : {};

    return {
        productWhere: {
            ...catOptions
        },
        postWhere: {
            ...writerOptions,
            ...keywordOptions
        }
    }
} 

exports.getPageNumbers = (req, res) => {
    const query = url.parse(req.url, true).query;
    const conditions = parseConditions(query);

    const postsPerPage = query.per > 0 ? query.per : config.postsPerPage;

    db.post.count({
        include: [
            {
                model: db.product,
                required: true,
                where: {
                    ...conditions.productWhere
                },
                attributes: []
            }
        ],
        where: {
            ...conditions.postWhere,
            deletedAt: {
                [db.Op.eq]: null
            }
        },
        col: "postId",
    })
    .then(count => {
        const pageCount = Math.floor(count / postsPerPage) + 1;
        return res.status(200).send({ total: count, pageCount: pageCount });
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({ err: err.message });
    });
}

exports.loadPage = (req, res) => {
    const query = url.parse(req.url, true).query;
    const conditions = parseConditions(query);

    // 페이지 번호
    const page = query.page && query.page > 1 ? query.page - 1 : 0;
    const lim = config.postsPerPage;

    db.post.findAll({
        limit: lim, offset: page, order: [["createdAt", "DESC"]],
        attributes: [ "postId", "title", "writer" ],
        include: [
            {
                model: db.product,
                required: true,
                where: {
                    ...conditions.productWhere,
                    soldout: false
                },
                attributes: [ "price", "direct", "indirect", "soldout", "category" ]
            },
            {
                model: db.user,
                required: true,
                attributes: [ "province", "city", "town" ]
            },
            {
                model: db.image,
                required: true,
                order: [["imgId", "ASC"]],
                limit: 1,
                attributes: [ "url" ]
            }
        ],
        where: {
            ...conditions.postWhere,
            deletedAt: {
                [db.Op.eq]: null
            }
        }
    })
    .then(async (posts) => {
        const results = []
    
        for(const p of posts) {
            const result = {}
    
            const post = p.dataValues
            const product = p.product.dataValues
            const writer = p.user.dataValues
    
            result.link = secure.encrypt(post.postId)
    
            result.thumbnail = post.images[0].dataValues.url
            result.title = post.title
            result.price = product.price
    
            result.province = writer.province
            result.city = writer.city
            result.town = writer.town
    
            result.direct = product.direct
            result.indirect = product.indirect
    
            const _nums = [
                db.like.count({
                    where: {
                        post: post.postId
                    }
                }),
                db.message.count({
                    where: {
                        target: post.postId
                    }
                })
            ]
            results.push(
                Promise.all(_nums).then(nums => {
                    result.likeNum = nums[0]
                    result.chatNum = nums[1]
    
                    return result
                })
            )
        }
        return Promise.all(results)
    })
    .then(results => {
        return res.status(200).send({ payload: results });
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({ err: err.message });
    });
}

exports.loadPost = (req, res) => {
    db.post.findOne({
        where: {
            postId: req.pid,
            deletedAt: {
                [db.Op.eq]: null
            }
        },
        attributes: [ "title", "context", "createdAt", "updatedAt" ],
        include: [
            {
                model: db.product,
                required: true,
                attributes: [ "price", "direct", "indirect", "soldout", "category" ]
            },
            {
                model: db.user,
                required: true,
                attributes: [ "email", "profile", "province", "city", "town" ]
            },
            {
                model: db.image,
                required: true,
                order: [["imgId", "ASC"]],
                attributes: [ "url" ]
            }
        ]
    })
    .then(p => {
        const result = {}
    
        const post = p.dataValues
        const product = p.product.dataValues
        const writer = p.user.dataValues
    
        result.images = []
        for (const img of post.images) {
            result.images.push(img.dataValues.url)
        }
        result.title = post.title
        result.context = post.context

        result.created = post.createdAt
        result.updated = post.updatedAt

        result.price = product.price
        result.soldout = product.soldout
        result.direct = product.direct
        result.indirect = product.indirect
            
        // Awful but no time
        for (const name in catIds) {
            if (parseInt(catIds[name]) === product.category) {
                result.childCat = name
                break
            }
        }
        for (const parent in categories) {
            if (categories[parent].includes(result.childCat)) {
                result.parentCat = parent
                break
            }
        }

        result.writer = writer.email
        result.profile = writer.profile
        result.province = writer.province
        result.city = writer.city
        result.town = writer.town

        const _nums = [
            db.like.count({
                where: {
                    post: req.pid
                }
            }),
            db.message.count({
                where: {
                    target: req.pid
                }
            })
        ]
        return Promise.all(_nums).then(nums => {
            result.likeNum = nums[0]
            result.chatNum = nums[1]

            return result
        })
    })
    .then(results => {
        return res.status(200).send({ payload: results });
    })
    .catch(err => {
        console.log(err)
        return res.status(400).send({ err: "not exist" });
    });
} 

exports.checkPostId = (req, res, next) => {
    if (req.params.id && baseurl.isUrlSafeBase64(req.params.id)) {
        try {
            let pid = secure.decrypt(req.params.id)
            if (secure.isUUID(pid)) {
                pid = secure.parseUUID(pid)
                req.pid = pid
                next();
            }
        } catch (err) {
            return res.status(404).send({ err: "page not found" })
        }
    }
    else {
        return res.status(404).send({ err: "page not found" })
    }
}