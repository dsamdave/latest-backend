// firstName, lastName, email, password,phoneNumber, address

const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true},

    lastName: {
    type: String,
    required: true},

    email: {
    type: String,
    required: true,
    unique: true },

    password: {
    type: String,
    required: true},

    phoneNumber: {
    type: String,},

    address: {
    type: String,},

}, {timestamps: true})

const Users = mongoose.model('Users', userSchema)

module.exports = Users