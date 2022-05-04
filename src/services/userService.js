const User = require('../models/User')()

module.exports = class UserService {

    async saveUser(user) {
        const newUser = new User({
            ...user,
        })
        return newUser.save()
    }

    async deleteUser(id) {
        return User.findByIdAndRemove(id)
    }

    async updateUser(id, data) {
        return User.findByIdAndUpdate(id, data)
    }

    async getUser(id) {
        return User.findById(id)
    }

    async getAllUsers() {
        return User.find({})
    }


}