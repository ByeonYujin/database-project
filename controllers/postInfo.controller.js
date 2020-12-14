const db = require("../models");
const loadPost = require("./post.controller").loadPost;

const postInfo = {}

db.post.findAll ({
    where: {
        postId: loadPost
    },
    include :[
        {
            model: db.like,
            required: false,
            attributes: ["user"],
            where: {post: loadPost}
        },
        {
            model: db.user,
            required: false,
            attributes: ["province", "city", "town"]
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
            model: db.images,
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

 exports.getAll = (req, res) => {
     return res.status(200).send(JSON.stringify(postInfo))
 }

 exports.getImages = (req, res) => {
    const image = postInfo.images.url
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
    const province = postInfo.users.province
    const city = postInfo.users.city
    const town = postInfo.users.town
    const address = {province, city, town}
    return res.status(200).send(JSON.stringify(address))
}

exports.getLikeNum = (req, res) => {
    const likeNum = postInfo.likes.length
    return res.status(200).send(JSON.stringify(likeNum))
}

exports.getChatNum = (req, res) => {
    const chatNum = postInfo.messages.messageId.length
    return res.status(200).send(JSON.stringify(chatNum))
}

exports.getChatUrl = (req, res) => {
    const chatUrl = postInfo.messages.messageId
    return res.status(200).send(JSON.stringify(chatUrl))
}

exports.getMeans = (req, res) => {
    const direct = postInfo.products.direct || false
    const indirect = postInfo.products.indirect || false
    const mean = {direct, indirect}
    return res.status(200).send(JSON.stringify(mean))
}

exports.soldOut = (req, res) => {
    return res.status(200).send(JSON.stringify(soldOut))
}