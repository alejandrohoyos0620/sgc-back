const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const boom = require('boom');
const CustomerLib = require('../../../libraries/customers');
const EmployeeLib = require('../../../libraries/employees');
const {config} = require('../../../configuration/authConfig');
passport.use(
    new Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
        let user;
        try{ 
            if(tokenPayload.hasOwnProperty('role')) {
                user = await CustomerLib.login(tokenPayload.email);
            } else {
                user = await EmployeeLib.login(tokenPayload.email);
            }
            if(!user) {
                return cb(boom.unauthorized, false);
            }
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    })
)