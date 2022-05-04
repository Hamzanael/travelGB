const UserController = require('../controller/userController')
const userController = new UserController()
const userRoute = (apiRoute) => {
    apiRoute.route('/users')
        .get(userController.getAllUsers)
        .post(userController.createUser)

    apiRoute.route('/user/:id')
        .get(userController.getUser)
        .delete(userController.deleteUser)
        .patch(userController.updateUser)

}

module.exports = userRoute