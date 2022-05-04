const express = require('express')
const userRoute = require('./routes/userRoute')
const storage = require('../services/storage/storage')
const formsRoute = require('./routes/formRoute')

const routes = () => {
    const apiRoute = express.Router()
    userRoute(apiRoute)
    formsRoute(apiRoute)
    return apiRoute
}
module.exports = routes