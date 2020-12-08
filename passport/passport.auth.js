const passport = require("passport")

module.exports = {
    local: (callback) => {
        passport.authenticate("local", {session: false}, callback)
    },
    isAuth: passport.authenticate("jwt", { session: false })
}