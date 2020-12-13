const ParserClass = require("datauri/parser");
const URIParser = new ParserClass();

const path = require("path")

const { config: CloudinaryConfig, uploader } = require("cloudinary").v2;
CloudinaryConfig({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = (bufferedImg, options = { public_id: `product/${new Date().toISOString()}`}) => {
    const image_file = URIParser.format(path.extname(bufferedImg.originalname).toString(), bufferedImg.buffer).content

    return uploader.upload(image_file, options)
}