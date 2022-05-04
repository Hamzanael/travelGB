const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../models/User')()

const facebookStrategy = () => {
    passport.use(new FacebookStrategy({
            clientID: '2812636518974701',
            clientSecret: '677940a5aaeabe010446ae1769959a5b',
            callbackURL: 'https://matlabakena.com/auth/facebook/home',
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({
                facebookId: profile.id,
                name: profile.displayName,
                username: profile.id,
                Role: 'User',
            }, function(err, user) {
                return cb(err, user)
            })
        },
    ))
}
module.exports = facebookStrategy