const { ActivitySchema } = require('../models/repository/schemas')
const Activity = () => new mongoose.model('activity', ActivitySchema)
module.exports = Activity