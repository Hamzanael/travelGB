const { HotelSchema } = require('../models/repository/schemas')
const Hotel = () => new mongoose.model('hotel', HotelSchema)
module.exports = Hotel