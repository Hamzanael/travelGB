const express = require('express')
const SecurityController = require('../controller/securityController')
const securityController = new SecurityController()
const authRouter = () => {
    const apiRoute = express.Router()

    apiRoute.route('/signup').post(securityController.authorizeUser)
    apiRoute.route('/login').post(securityController.authenticateUserLocally)


    apiRoute.get('/google/home', securityController.googleAuthenticateUser, (req, res) => {
        res.redirect('/')
    })
    apiRoute.get('/facebook/home', securityController.facebookAuthenticateUser,
        (req, res) => {
            res.redirect('/')
        },
    )
    apiRoute.get('/auth/google', passport.authenticate('google', {
        scope: ['profile'],
    }))

    apiRoute.get('/auth/facebook', passport.authenticate('facebook'))


    return apiRoute
}
module.exports = authRouter