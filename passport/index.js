const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const config = require("../config");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.jwtSecret
};

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        return done(null, false)
    })
);