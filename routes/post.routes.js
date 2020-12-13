const API_URL = "/api/post"

const router = require("express").Router();

const authMiddleware = require("../passport");

const multer = require("multer");
const storage = multer.memoryStorage();

// The size of all images shoud be less than this (default: 5MB).
const ALLOW_MAXSIZE = process.env.MAX_IMAGE_SIZE * 1024 * 1024; 
const ImageMiddleware = multer({ storage: storage, limits: { fileSize: ALLOW_MAXSIZE }})

const imgController = require("../controllers/image.controller")
const postController = require("../controllers/post.controller")

router.post("/upload", authMiddleware.isAuth, ImageMiddleware.array("images", 10), imgController.upload, postController.upload) // imgController.upload, imgController.reserved)
router.get("/category", postController.getCategories)
// END

module.exports = (app) => {
    app.use(API_URL, router);

    app.get("/product/:id", postController.loadPost)
}