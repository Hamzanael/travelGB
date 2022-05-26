const Restaurant = require('../models/Restaurant')()

module.exports = class RestaurantService {

    async saveRestaurant(user) {
        const newRestaurant = new Restaurant({
            ...user,
        })
        return newRestaurant.save()
    }

    async getRestaurants(searchParams) {
        let restaurantArray = []
        for (const searchParamsKey of searchParams.category) {
            let result = await Restaurant.find({
                location: { '$regex': `${searchParams.location}`, '$options': 'i' }
                , $and: [{
                    Price: { $lte: searchParams.Price + searchParams.Price * 0.1 },
                }, { Price: { $gte: searchParams.Price - searchParams.Price * 0.1 } },
                ],
                category: { $all: searchParamsKey },
            })
            restaurantArray.push(...result)
        }
        if (restaurantArray.length === 0) {
            let result = await Restaurant.find(
                {
                    location: { '$regex': `${searchParams.location}`, '$options': 'i' },
                },
            )
            let bestRestaurant = result[0]
            for (let i = 1; i < result.length; i++) {
                if (bestRestaurant.Price > result[i].Price) {
                    for (let j = i; j < result.length; j++) {
                        if (bestRestaurant.Rating < result[j].Rating) {
                            bestRestaurant = result[j]
                        }
                    }
                }
            }
            restaurantArray.push(bestRestaurant)
            restaurantArray.push(true)
        }
        return restaurantArray.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t._id === value._id || t.title === value.title
                )),
        )
    }

    async insertRestaurant(restaurant) {
        for (let i = 0; i < restaurant.length; i++) {
            await this.saveRestaurant(restaurant[i])
        }
        console.log('Finishing insert all the restaurant')
    }

    async getAll() {
        return Restaurant.find({})
    }
}