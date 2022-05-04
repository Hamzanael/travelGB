const express = require('express')
const ViewController = require('../controller/viewController')
const viewController = new ViewController()
const viewRouter = () => {
    const apiRoute = express.Router()
    apiRoute.get('/', viewController.mainPageView)
    apiRoute.get('/plan', viewController.planPageView)

    return apiRoute
}
module.exports = viewRouter