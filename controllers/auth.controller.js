const config = require("../config");
const jwt = require("jsonwebtoken");

const auth = require("../passport/passport.auth");

exports.signIn = (req, res, next) => {
    auth.local((err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        else if (!user) {
            return res.status(200).json({ message: "login failed" });
        }
        else {
            req.login(user, { session: false }, (err) => {
                if (err) next(err);
                else {
                    const token = jwt.sign(
                        { uid: user.userId }, 
                        config.auth.jwtSecret, 
                        { expiresIn: config.auth.expires }
                    )
                    return res.status(200).json({ token: token })
                }
            })
        }
    })
    (req, res, next);
};

exports.test = (req, res, next) => {
    res.send(req.user)
};