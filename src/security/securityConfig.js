global.passport = require('passport')
const googleStrategy = require('./strategies/googleStrategy')
const facebookStrategy = require('./strategies/facebooklStrategy')
const localStrategy = require('./strategies/localStrategy')
const userSerializer = require('./userSerializer')

const securityConfig = () => {
    prepareStrategies()
    userSerializer()
}

const prepareStrategies = () => {
    googleStrategy()
    facebookStrategy()
    localStrategy()
}


module.exports = securityConfig