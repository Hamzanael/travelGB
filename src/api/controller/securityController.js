const User = require('../../models/User')()
module.exports = class SecurityController {

    async authorizeUser(req, res, next) {
        User.register({
            username: req.body.username, name: req.body.name, Role: 'User',
        }, req.body.password, function(err, user) {
            if (!err) {
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/')
                })
            } else {
                console.log(err)
                res.render('userLogin')
            }
        })
    }

    async authenticateUserLocally(req, res, nex) {
        const data = req.body
        const user = new User({ username: data.username, password: data.password })
        req.login(user, function(err) {
            if (!err) {
                passport.authenticate('local', { failureRedirect: '/admin/Login' })
                (req, res, function() {
                    res.redirect('/admin/main')
                })
            } else {
                console.log(err)
                res.redirect('/')
            }
        })
    }

    async facebookAuthenticateUser(req, res, nex) {
        passport.authenticate('facebook', {
            failureRedirect: '/login',
        })
    }

    async googleAuthenticateUser(req, res, nex) {
        passport.authenticate('google', {
            failureRedirect: '/login',
        })
    }

}
