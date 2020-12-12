const API_URL = "/api/post"

const router = require("express").Router()
// const MultipartMiddleware = require("connect-multiparty")()

const multer = require("multer");
const storage = multer.memoryStorage();

const ALLOW_MAXSIZE = 5 * 1024 * 1024; // The size of all images shoud be less than this (default: 5MB).
const ImageMiddleware = multer({ storage: storage, limits: { fileSize: ALLOW_MAXSIZE }})

// TEST CODE
const imgController = require("../controllers/image.controller")
router.post("/test", ImageMiddleware.array("images", 10), imgController.upload, imgController.reserved)
// END

module.exports = (app) => {
    app.use(API_URL, router);
}