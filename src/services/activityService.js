const Activity = require('../models/Activity')()

module.exports = class ActivityService {

    async saveActivity(user) {
        const newActivity = new Activity({
            ...user,
        })
        return newActivity.save()
    }

    async getActivities(searchParams) {
        let result = await Activity.find(
            {
                title: { '$regex': `${searchParams.title}`, '$options': 'i' }
                , $and: [{
                    Price: { $lte: searchParams.Price },
                }, { Price: { $gte: searchParams.Price - searchParams.Price * 0.6 } },
                ],
            },
        )

        if (result.length === 0) {
            result = await Activity.find({ title: { '$regex': `${searchParams.title}`, '$options': 'i' } })
            let best = result[0]
            for (let i = 1; i < result.length; i++) {
                if (best.Price > result[i].Price) {
                    for (let j = i; j < result.length; j++) {
                        if (best.Rating < result[j].Rating) {
                            best = result[j]
                        }
                    }
                }
            }
            result = [best, true]
        }
        return result.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t._id === value._id || t.title === value.title
                )),
        )

    }

    async insertActivities(activities) {
        for (let i = 0; i < activities.length; i++) {
            activities[i].Price = activities[i].Price.replaceAll('$', '')
            await this.saveActivity(activities[i])
        }
        console.log('Finishing insert all the activities')
    }

    async getAll() {
        return Activity.find({})
    }


}