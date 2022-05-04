const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../models/User')()

const googleStrategy = () => {
    passport.use(new GoogleStrategy({
            clientID: '959087872527-ukiqk3auesmjaf7813qoe808v0ol86sa.apps.googleusercontent.com',
            clientSecret: 'Fu9wNkYlpOua5-EnhOWt9Qod',
            callbackURL: 'http://localhost:3000/auth/google/home',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({
                googleId: profile.id,
                username: profile.id,
                name: profile.displayName,
                Role: 'User',
            }, function(err, user) {
                return cb(err, user)
            })
        },
    ))
}

module.exports = googleStrategy