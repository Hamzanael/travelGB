const User = require('../../models/User')()

const localStrategy = () => passport.use(User.createStrategy())

module.exports = localStrategy