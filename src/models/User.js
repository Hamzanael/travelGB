const { UserSchema } = require('../models/repository/schemas')
const User = () => new mongoose.model('user', UserSchema)
module.exports = User