const storage = require('../../services/storage/storage')

const formsRoute = (apiRoute) => {
    apiRoute.use('/forms', storage.array('images', 10))
    apiRoute.route('/forms').post((req, res, next) => {
        console.log(req.files)
    })
}

module.exports = formsRoute
