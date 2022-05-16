const Plan = require('../models/Plan')()
const Hotel = require('../models/Hotel')()
const Restaurant = require('../models/Restaurant')()
const Activity = require('../models/Activity')()
module.exports = class PlanService {

    async getAll() {
        let plans = await Plan.find({})
        let readyPlans = []
        for (const plan of plans) {
            let [hotel, restaurant, activity] = await Promise.all([Hotel.findById(plan.hotelId), Restaurant.findById(plan.restaurantId), Activity.findById(plan.activityId)])
            readyPlans.push({
                hotel, restaurant, activity,
            })
        }
        return readyPlans

    }


}