const userSubscriber = require('./userSubscriber')
const mainSubscriber = () => {
    userSubscriber()
}
module.exports = mainSubscriber