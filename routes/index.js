const AuthRouter = require("./auth.routes");
const PostRouter = require("./post.routes");

module.exports = (app) => {
    AuthRouter(app);
    PostRouter(app);
}