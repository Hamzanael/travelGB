const { RestaurantSchema } = require('../models/repository/schemas')
const Restaurant = () => new mongoose.model('restaurant', RestaurantSchema)
module.exports = Restaurant