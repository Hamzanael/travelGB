const express = require('express')
const searchRoute = require('./routes/formRoute')
const DataController = require('./controller/dataController')
const dataController = new DataController()
const routes = () => {
    const apiRoute = express.Router()
    apiRoute.get('/prepareData', dataController.prepareData)
    apiRoute.get('/preparePlans', dataController.prepareRandomData)
    searchRoute(apiRoute)
    return apiRoute
}
module.exports = routes