const passport = require("passport")

exports.local = (callback) => {
    return passport.authenticate("local", {session: false}, callback)
}

exports.isAuth = passport.authenticate("jwt", { session: false })