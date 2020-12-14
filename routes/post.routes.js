const API_URL = "/api/post"

const router = require("express").Router();
const config = require("../config");
const authMiddleware = require("../passport");

const multer = require("multer");
const storage = multer.memoryStorage();

// The size of all images shoud be less than this (default: 5MB).
const ALLOW_MAXSIZE = config.maxImageSize * 1024 * 1024; 
const ImageMiddleware = multer({ storage: storage, limits: { fileSize: ALLOW_MAXSIZE }})

const imgController = require("../controllers/image.controller")
const postController = require("../controllers/post.controller")

router.post("/upload", authMiddleware.isAuth, ImageMiddleware.array("images", 10), imgController.upload, postController.upload) // imgController.upload, imgController.reserved)
router.get("/page", postController.loadPage)

router.get("/category", postController.getCategories)
router.get("/count", postController.getPageNumbers)

router.post("/content/:id", postController.checkPostId, postController.loadPost)
// END

module.exports = (app) => {
    app.use(API_URL, router);
}