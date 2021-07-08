const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseValidator = require('mongoose-unique-validator')

const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true}
})

UserSchema.plugin(mongooseValidator)
module.exports = mongoose.model('User', UserSchema);