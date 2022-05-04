const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    Role: String,
    googleId: String,
    facebookId: String,
    orders: [],
})

UserSchema.plugin(passportLocalMongoose)
UserSchema.plugin(findOrCreate)

module.exports = {
    UserSchema,
}