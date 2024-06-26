const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const publicKey = 'TempPhraseToChange'
const User = require('../models/user.models')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithms: ['HS256']
}

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.findByUsername(jwt_payload.sub, function(err, user) {
            if (err) {
                console.log("JWT Auth: Error: " + JSON.stringify(err))
                return done(err, false)
            }
            if (user) {
                console.log("JWT Auth: User found: " + JSON.stringify(user))
                return done(null, user)
            } else {
                console.log("JWT Auth: Uknown Error: " + JSON.stringify(err))
                return done(null, false)
            }
        })
    }))
}