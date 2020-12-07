const config = require("../config")
const db = require("../models")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.signIn = (req, res) => {
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(403).send({ msg: "Email Not Found" })
        }

        let pwValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!pwValid) {
            return res.status(401).send({ token: null, msg: "invalid password" })
        }

        const token = jwt.sign({ id: user.userId }, config.auth.jwtSecret, {
            expiresIn: config.auth.expires
        })

        return res
            .cookie("x_auth", token, {
                maxAge: 1000 * 60 * 60,
                httpOnly: true
            })
            .status(200)
            .send({ accessToken: token, email: user.email })
    })
    .catch(err => {
        res.status(500).send({ msg: err.message })
    })
}
