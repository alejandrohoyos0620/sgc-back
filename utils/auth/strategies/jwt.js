const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const boom = require('boom');
const {config} = require('../../../configuration/authConfig');
passport.use(
    new Strategy({
        secretOrKey: config.jwtSecret,
        jetFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
        
    })
)