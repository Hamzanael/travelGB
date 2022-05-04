const events = require('events')
const setEventEmitter = () => global.eventEmitter = new events.EventEmitter()
module.exports = setEventEmitter