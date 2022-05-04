const UserService = require('../../services/userService')
const userService = new UserService()

module.exports = class UserController {

    async getAllUsers(req, res) {
        let allUsers = await userService.getAllUsers()
        res.status(200)
        res.send(allUsers)
    }

    async getUser(req, res) {
        let { id } = req.params
        try {
            let user = await userService.getUser(id)
            res.status(200)
            res.send(user)
        } catch (e) {
            res.redirect('/failure/get/user')
        }
    }

    async createUser(req, res) {
        try {
            const user = req.body
            let savedUser = await userService.saveUser(user)
            res.status(201)
            res.send(savedUser)
        } catch (e) {
            res.redirect('/failure/register/user')
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            await userService.deleteUser(id)
            res.sendStatus(202)
        } catch (e) {
            res.redirect('/failure/delete/user')
        }
    }

    async updateUser(req, res) {
        try {
            let { id } = req.params
            await userService.updateUser(id, req.body)
            res.sendStatus(200)
        } catch (e) {
            res.redirect('/failure/update/user')
        }
    }
}