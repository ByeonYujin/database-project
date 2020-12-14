const AuthRouter = require("./auth.routes");
const PostRouter = require("./post.routes");
const PostInfoRouter = require("./postInfo")

module.exports = (app) => {
    AuthRouter(app);
    PostRouter(app);
    PostInfoRouter(app);
}