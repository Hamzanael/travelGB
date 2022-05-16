const path = require('path')
const fs = require('fs')
const csv = require('csv-parser')
const HotelService = require('../../services/hotelService')
const RestaurantService = require('../../services/restaurantService')
const ActivityService = require('../../services/activityService')
const Plan = require('../../models/Plan')()
const hotelService = new HotelService()
const restaurantService = new RestaurantService()
const activityService = new ActivityService()
module.exports = class DataController {
    static async reader(fileName) {
        return new Promise(resolve => {
            let results = []
            fs.createReadStream(path.resolve('./hotelsWebScraping') + `/${fileName}.csv`)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    resolve(results)
                })
        })
    }

    static async restaurantReader() {
        return new Promise(resolve => {
            let results = []
            fs.createReadStream(path.resolve('./hotelsWebScraping') + `/restaurants.csv`)
                .pipe(csv())
                .on('data', (data) => {
                    data.category = data.category.replaceAll('\'', '').replaceAll('[', '').replaceAll(']', '').split(',')
                    data.Rating = Math.ceil(Math.random() * 5)
                    results.push(
                        data,
                    )
                })
                .on('end', async () => {
                    resolve(results)
                })
        })
    }

    static async prepareHotelsData() {
        return hotelService.insertHotels(await DataController.reader('hotels'))

    }

    static async prepareActivityData() {
        return activityService.insertActivities(await DataController.reader('tours'))

    }

    static async prepareRestaurantData() {
        return restaurantService.insertRestaurant(await DataController.restaurantReader())
    }

    async prepareData(req, res) {
        let result = await Promise.all([DataController.prepareRestaurantData(), DataController.prepareActivityData(), DataController.prepareHotelsData()])
        res.send('done')
    }


    async prepareRandomData(req, res) {
        let hotels = await hotelService.getAll()
        let restaurant = await restaurantService.getAll()
        let activity = await activityService.getAll()


        for (let i = 0; i < 100; i++) {
            const plan = new Plan({
                hotelId: hotels[Math.floor(Math.random() * hotels.length)]._id,
                restaurantId: restaurant[Math.floor(Math.random() * restaurant.length)]._id,
                activityId: activity[Math.floor(Math.random() * activity.length)]._id,
            })
            await plan.save()
        }
        res.sendStatus(200)

    }


}