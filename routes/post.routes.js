const API_URL = "/api/post"

const router = require("express").Router()
// const MultipartMiddleware = require("connect-multiparty")()

const multer = require("multer");
const storage = multer.memoryStorage();

// The size of all images shoud be less than this (default: 5MB).
const ALLOW_MAXSIZE = process.env.MAX_IMAGE_SIZE * 1024 * 1024; 
const ImageMiddleware = multer({ storage: storage, limits: { fileSize: ALLOW_MAXSIZE }})

// TEST CODE
// const imgController = require("../controllers/image.controller")
const postController = require("../controllers/post.controller")
router.post("/test", ImageMiddleware.array("images", 10), postController.upload) // imgController.upload, imgController.reserved)
// END

module.exports = (app) => {
    app.use(API_URL, router);
}