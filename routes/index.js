const AuthRouter = require("./auth.routes");
const PostRouter = require("./post.routes");
const PostInfoRouter = require("./postInfo.routes")

module.exports = (app) => {
    AuthRouter(app);
    PostRouter(app);
    // PostInfoRouter(app);
}