const Hotel = require('../models/Hotel')()

module.exports = class HotelService {

    async saveHotel(hotel) {
        const newHotel = new Hotel({
            ...hotel,
        })
        return newHotel.save()
    }

    async getAll() {
        return Hotel.find({})
    }


    async getHotel(searchParams) {
        let result = await Hotel.find(
            {
                location: { '$regex': `${searchParams.location}`, '$options': 'i' }
                , $and: [{
                    Price: { $lte: searchParams.Price },
                }, { Price: { $gte: searchParams.Price - searchParams.Price * 0.1 } },
                ],
            },
        )
        if (result.length === 0) {
            result = await Hotel.find(
                {
                    location: { '$regex': `${searchParams.location}`, '$options': 'i' },
                },
            )
            let bestHotel = result[0]
            for (let i = 1; i < result.length; i++) {
                if (bestHotel.Price > result[i].Price) {
                    for (let j = i; j < result.length; j++) {
                        if (bestHotel.Rating < result[j].Rating) {
                            bestHotel = result[j]
                        }
                    }
                }
            }
            result = [bestHotel, true]
        }
        return result.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t._id === value._id || t.title === value.title
                )),
        )
    }

    async insertHotels(hotels) {
        for (let i = 0; i < hotels.length; i++) {
            hotels[i].Price = hotels[i].Price.replaceAll('JOD', '')
            await this.saveHotel(hotels[i])
        }
        console.log('Finishing insert all the hotels')
    }

}