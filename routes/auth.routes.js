const isAuth = require("../passport/passport.auth").isAuth;
const controller = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", controller.signIn);
router.get("/test", isAuth, controller.test);

module.exports = (app) => {
    app.use("/api/auth", router);
}