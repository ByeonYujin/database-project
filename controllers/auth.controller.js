const config = require("../config");
const jwt = require("jsonwebtoken");

const Joi = require("joi");
const JoiPW = require("joi-password-complexity").default;
const auth = require("../passport/passport.auth");
const db = require("../models");

const bcrypt = require("bcrypt");
const saltRound = process.env.SALT_ROUND || 10;

const pwOptions = {
    min: 6,
    max: 50,
    numeric: 1,
    symbol: 1,
    requirementCout: 2
}

exports.signIn = (req, res, next) => {
    auth.local((err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        else if (!user) {
            return res.status(401).json({ message: "Login Failed" });
        }
        else {
            req.login(user, { session: false }, (err) => {
                if (err) next(err);
                else {
                    const token = jwt.sign(
                        {
                            uid: user.userId
                        }, 
                        config.auth.jwtSecret, 
                        { expiresIn: config.auth.expires }
                    )
                    return res.status(200).json({ accessToken: token })
                }
            })
        }
    })
    (req, res, next);
};

exports.signUp = async (req, res, next) => {
    
    const schema = {
        email: Joi.string().email(), // 유효한 이메일
        password: JoiPW(pwOptions), // 길이는 6 ~ 50, 숫자와 특수문자 각각 1개 이상
        zipcode: Joi.string().length(5).pattern(/^\d+$/).required(), // 5자리 숫자
        province: Joi.string().required(), // 시/도
        city: Joi.string().required(), // 시/군/구
        town: Joi.string().required() // 동/읍/면/리
    }
    const { error, value } = Joi.object(schema).validate(req.body, schema)

    if (error) {
        return res.status(400).send(error.details) // 유효하지 않은 신청
    }
    
    const user = await db.user.findOne({
        where: {
            email: value.email
        }
    })
    if (user) {
        return res.status(400).send({ message: "already signed" })
    } 
    else {
        db.user.create({
            ...value,
            password: bcrypt.hashSync(value.password, bcrypt.genSaltSync(saltRound))
        })
        .then(result => {
            return res.status(200).send({ email: value.email })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send()
        })
    }

}

exports.test = (req, res) => {
    res.send(req.user)
};