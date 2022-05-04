global.mongoose = require('mongoose')
const databaseSettings = require('../../config/settings/database.settings')
let url = databaseSettings.host

const prepareDBConnection = () => {
    mongoose.connect(url, {
        user: databaseSettings.user,
        pass: databaseSettings.pass,
        dbName: databaseSettings.dbName,
    })
}
module.exports = prepareDBConnection
