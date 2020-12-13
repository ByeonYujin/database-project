const config = require("../config");
const db = require('../models');

const bcrypt = require("bcrypt");
const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');

const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require('passport-local').Strategy;

const localOpts = {
    usernameField: "email",
    passwordField: "password"
};
async function verifyLogin(email, password, done) {
    let user;
    try {
        user = await db.user.findOne({
            where: { email: email }
        });
        if (!user) return done(null, false);

        const pass = bcrypt.compareSync(password, user.password);
        if (!pass) return done(null, false);
    } catch (e) {
        return done(e);
    }
    return done(null, user);
}

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwtSecret
}
async function jwtVerify(payload, done) {
    let user;
    try {
        user = await db.user.findOne({
            where: { userId : payload.uid }
        });
        if (!user) return done(null, false);
    } catch (e) {
        return done(e);
    }
    return done(null, user);
}


module.exports = () => {
    passport.use(new LocalStrategy(localOpts, verifyLogin));
    passport.use(new JwtStrategy(jwtOpts, jwtVerify));
}
