const db = require("../models");
const secure = require("../security");

const categories = {}
const catIds = {}

// Categories caching
db.category.findAll({
    where: {
        catId: {
            [db.Op.notIn]: db.sequelize.literal('(SELECT DISTINCT `parent` FROM `categories` WHERE `parent` IS NOT NULL)')
        }
    }
})
.then(children => {
    const pool = []
    for (const res of children) {
        catIds[res.dataValues.name] = res.dataValues.catId

        pool.push(db.category.findOne({
            where: {
                catId: {
                    [db.Op.eq]: res.dataValues.parent
                }
            }
        }))
    }
    return Promise.all(pool).then(parents => {
        for (let i = 0; i < children.length; ++i) {
            const parent = parents[i].dataValues.name
            const child = children[i].dataValues.name

            catIds[parent] = parents[i].dataValues.catId
            if (categories[parent]) {
                categories[parent].push(child)
            } else {
                categories[parent] = [child]
            }
        }
        return categories
    })
})
.catch(console.log);

exports.getCategories = (req, res) => {
    if (Object.keys(categories).length > 0) {
        return res.status(200).send(JSON.stringify(categories))
    }
    else {
        return res.status(500).send({ msg: "Category empty" })
    }
}

exports.upload = (req, res, next) => {
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
                post: req.postId
            }))
        }
        return Promise.all(pool)
    })
    .then(() => {
        return res.status(200).send({ linkTo: secure.encrypt(req.postId) })
    })
    .catch(console.log)
}