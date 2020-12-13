const passport = require("passport")

exports.local = (callback) => {
    return passport.authenticate("local", {session: false}, callback)
}

exports.isAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            return res.status(500).send({ err })
        }
        else if (user) {
            req.user = user;
            next()
        }
        else {
            return res.status(401).send({ err: "not logged in" })
        }
    })(req, res, next);
}