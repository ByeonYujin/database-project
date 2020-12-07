const controller = require("../controllers/auth.controller")

module.exports = (app) => {
    app.post("/api/auth/login", controller.signIn)
}