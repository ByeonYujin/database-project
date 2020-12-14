const API_URL = "/api/postInfo"
const router = require("express").Router();
const postInfoController = require("../controllers/postInfo.controller")

// router.get("/title", postInfoController.getTitle)
// router.get("/means", postInfoController.getMeans)
router.get("/all", postInfoController.getAll)

module.exports = (app) => {
    app.use(API_URL, router);
    
    // app.get("/product/:id", postController.loadPost)
}