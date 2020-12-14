const db = require("../models");
const loadPost = require("./post.controller").loadPost;

const postInfo = {}

db.post.findAll ({
    where: {
        postId: {
            loadPost
        }
    },
    include :[
        {
            model: db.like,
            required: false,
            attributes: ['user']
        },
        {
            model: db.user,
            required: false,
            attributes: ['province', 'city', 'town'],
        },
        {
            model: db.product,
            required: false,
            attributes: ['price', 'direct', 'indirect', 'soldout']
        },
        {
            model: db.message,
            required: false,
            attributes: ['messageId']
        },
        {
            model: db.image,
            required: false,
            attributes: ['url']
        }
    ]
})
.then(results => {
    postInfo = results
    return postInfo
 })
.catch(err => {
    console.error(err);
 });

 exports.getImages = (req, res) => {
    const image = postInfo.image.url
    return res.status(200).send(JSON.stringify(image))
}

exports.getTitle = (req, res) => {
    const title = postInfo.title || "제품"
    return res.status(200).send(JSON.stringify(title))
}

exports.getPrice = (req, res) => {
    const price = postInfo.price || 0
    return res.status(200).send(JSON.stringify(price))
}

exports.getUserAddress = (req, res) => {
    const province = postInfo.user.province
    const city = postInfo.user.city
    const town = postInfo.user.town
    const address = province + city + town
    return res.status(200).send(JSON.stringify(address))
}

exports.getLikeNum = (req, res) => {
    const likeNum = postInfo.like.length
    return res.status(200).send(JSON.stringify(likeNum))
}

exports.getChatNum = (req, res) => {
    const chatNum = postInfo.message.messageId.length
    return res.status(200).send(JSON.stringify(chatNum))
}

exports.getChatUrl = (req, res) => {
    const chatUrl = postInfo.message.messageId
    return res.status(200).send(JSON.stringify(chatUrl))
}

exports.getMeans = (req, res) => {
    const direct = postInfo.product.direct || false
    const indirect = postInfo.product.indirect || false
    const mean = {direct, indirect}
    return res.status(200).send(JSON.stringify(mean))
}

exports.soldOut = (req, res) => {
    return res.status(200).send(JSON.stringify(soldOut))
}