const API_URL = "/api/auth"

const isAuth = require("../passport").isAuth;
const controller = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", controller.signIn);
router.post("/register", controller.signUp);
router.post("/signed", controller.dupeAjax);

router.get("/member", isAuth, controller.member);

module.exports = (app) => {
    app.use(API_URL, router);
}