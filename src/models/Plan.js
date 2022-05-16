const { PlanSchema } = require('../models/repository/schemas')
const Plan = () => new mongoose.model('plan', PlanSchema)
module.exports = Plan