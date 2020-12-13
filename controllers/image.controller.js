const upload = require("../cloudinary");
const TRIM_URL = "http://res.cloudinary.com/"

exports.upload = (req, res, next) => {
    if (req.files && req.files.length > 0) {
        const uploadPool = []
        for (const image of req.files) {
            uploadPool.push(upload(image))
        }

        Promise.all(uploadPool)
        .then(uploaded => {
            req.imgURLs = []
            for (const res of uploaded) {
                req.imgURLs.push(res.url.replace(TRIM_URL, ""))
            }
            next()
        })
        .catch(err => {
            return res.status(400).send({ msg: err.message })
        })
    }
    else {
        return res.status(400).send({ msg: "file not found" })
    }
}