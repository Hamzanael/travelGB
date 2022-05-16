const setEventEmitter = require('./eventsConfig')
const expressConfig = require('./expressConfig')
const mainSubscriber = require('../subscribers/mainSubsciber')
const prepareDBConnection = require('../models/repository/mongo.repository')
const configureApp = (app) => {
    setEventEmitter()
    expressConfig(app)
    mainSubscriber()
    prepareDBConnection()
}

module.exports = configureApp