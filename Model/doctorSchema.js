const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: String
    },
    gender: {
        type: String
    },
    bio: {
        type: String
    },
    specialisation: {
        type: String
    },
    hospital: {
        type: String
    },
    address: {
        type: String
    },
    language: {
        type: Array
    },
    state: {
        type: String
    },
    city: {
        type: String,
    },
    age: {
        type: String
    },
    fees: {
        type: String
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dsmr18nsi/image/upload/v1592852682/22_yi2ky2.jpg"
    },
    licenseNo: {
        type: String
    },
    qualification: {
        type: String
    }
})

const Doctor = mongoose.model('doctor', doctorSchema)

module.exports = Doctor