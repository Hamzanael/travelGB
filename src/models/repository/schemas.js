const ActivitySchema = new mongoose.Schema({
    title: String,
    Price: Number,
    Rating: Number,
})
const RestaurantSchema = new mongoose.Schema({
    title: String,
    Price: Number,
    Rating: Number,
    location: String,
    category: [],
})
const HotelSchema = new mongoose.Schema({
    title: String,
    location: String,
    Price: Number,
    Rating: Number,
})

const PlanSchema = new mongoose.Schema({
    hotelId: String,
    restaurantId: String,
    activityId: String,
})

module.exports = {
    ActivitySchema, HotelSchema, RestaurantSchema, PlanSchema,
}