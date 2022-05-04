const setEventEmitter = require('./eventsConfig')
const expressConfig = require('./expressConfig')
const mainSubscriber = require('../subscribers/mainSubsciber')
const prepareDBConnection = require('../models/repository/mongo.repository')
const securityConfig = require('../security/securityConfig')
const configureApp = (app) => {
    securityConfig()
    setEventEmitter()
    expressConfig(app)
    mainSubscriber()
    prepareDBConnection()
}

module.exports = configureApp