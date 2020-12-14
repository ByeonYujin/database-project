const API_URL = "/api/product"
const router = require("express").Router();
const postInfoController = require("../controllers/postInfo.controller")

router.get("/title", postInfoController.getTitle)

module.exports = (app) => {
    app.use(API_URL, router);

    // app.get("/product/:id", postController.loadPost)
}