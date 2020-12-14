// const bcrypt = require("bcrypt");
// const password = '1234';

// const getPW = () => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt)

//     console.log(hash)
// }
// getPW()

// const sc = require('./security');
// const baseurl = require('url-safe-base64');

// const toSafeUrl = baseurl.encode("d9pgXY0pSb0ZJ24OIOucC28L/945+jTcTcFbezKWRym3N18vO7jWzg")
// console.log(toSafeUrl)
// console.log(sc.decrypt(toSafeUrl))

// const db = require("./models");

// db.post.create({
//     title: "Hello",
//     context: "헬로",
//     writer: "5b99102e-01e9-4ce2-a4eb-eb291938eea4"
// })
// .then(post => {
//     const postId = 
// })

const db = require("./models");
const config = require("./config");
const secure = require("./security");

const parsePageQuery = (queries) => {
    if (!queries) return {};

    // 카테고리
    const cats = [];
    if (queries.category) {
        if (queries.category in categories) {
            cats.push(...categories[queries.category].map(c => catIds[c]));
        }
        else if (catIds[queries.category]) {
            cats.push(catIds[queries.category]);
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
    const writer = queries.user || "";
    const writerOptions = writer.length > 0 ? { writer: writer } : {};
    
    // 키워드
    const keyword = queries.keyword || "";
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

const getPageNumbers = (req, res) => {
    const conditions = parsePageQuery();
    const postsPerPage = config.postsPerPage;

    db.post.count({
        include: [
            {
                model: db.product,
                required: true,
                attributes: []
            }
        ],
        where: {
            ...conditions
        },
        col: "postId",
    })
    .then(count => {
        const pageCount = Math.floor(count / postsPerPage) + 1;
        return console.log(count, pageCount)
    })
    .catch(err => {
        console.log(err)
    });
}

// getPageNumbers()

const conditions = {}
db.post.findAll({
    limit: 8, offset: 0, order: [["createdAt", "DESC"]],
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
        ...conditions,
        deletedAt: {
            [db.Op.eq]: null
        }
    }
})
.then((posts) => {
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
    console.log(results)
})
.catch(err => {
    console.log(err)
    return res.status(500).send({ err: err.message });
});