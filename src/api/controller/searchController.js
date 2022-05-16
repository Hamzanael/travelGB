const HotelService = require('../../services/hotelService')
const RestaurantService = require('../../services/restaurantService')
const ActivityService = require('../../services/activityService')
const hotelService = new HotelService()
const restaurantService = new RestaurantService()
const activityService = new ActivityService()

module.exports = class SearchController {

    /*
      * We will take the rating params and multiply it as percentage
      * with the total budget the highest priority for Hotels then Food then Activities
      * let says that budget = 150, and we got the rating [5,5,5] [hotels, restaurants, activities]
      * the calculation will be
      * hotels = 150 * 50%  =  75
      * restaurants = (150 - hotels)*50% = 37
      * activities  150 - (hotels + restaurants)   = 38
      * */

    async getSearchResults(req, res) {
        let {
            generalPlace,
            generalNumberOfDays,
            totalPrice,
            hotelsRating,
            restaurantRating,
            activityRating,
            restaurantCategories,
        } = req.body
        let oneDayPrice = totalPrice / generalNumberOfDays
        let hotelPrice = oneDayPrice * (hotelsRating * 0.1)
        let restaurantPrice = (oneDayPrice - hotelPrice) * (restaurantRating * 0.1)
        let activitiesPrice = oneDayPrice - (hotelPrice + restaurantPrice)

        let noActivities = false
        let noHotels = false
        let noRestaurants = false


        let hotels = await hotelService.getHotel({
            location: generalPlace, Price: hotelPrice,
        })
        let restaurant = await restaurantService.getRestaurants({
            location: generalPlace, Price: restaurantPrice, category: restaurantCategories,
        })
        let activities = await activityService.getActivities({
            title: generalPlace, Price: activitiesPrice,
        })
        if (activities[activities.length - 1] === true) {
            noActivities = true
        }
        if (hotels[hotels.length - 1] === true) {
            noHotels = true
        }
        if (restaurant[restaurant.length - 1] === true) {
            noRestaurants = true
        }
        res.render('utils/results', {
            hotels: [...hotels],
            restaurants: [...restaurant],
            activities: [...activities],
            bestHotel: getBestObject(hotels),
            bestRestaurant: getBestObject(restaurant),
            bestActivities: getBestObject(activities),
            noRestaurants, noActivities, noHotels,
        })


        function getBestObject(results) {
            let bestObject = results[0]
            for (let i = 1; i < results.length; i++) {
                if (bestObject.Price > results[i].Price) {
                    for (let j = i; j < results.length; j++) {
                        if (bestObject.Rating < results[j].Rating) {
                            bestObject = results[j]
                        }
                    }
                }
            }
            return bestObject
        }

    }


}