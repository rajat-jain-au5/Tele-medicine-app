const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    date: {
        type: String
    },
    docId : {
        type: String
    },
    slot_1: {
        status : {
            type : String,
            default : false
        },
        patientId : {
            type : String
        },
        name : {
            type : String
        },
        email : {
            type :String
        },
        mobile : {
            type : String
        },
        gender : {
            type : String
        },
        age : {
            type : String
        },
        state : {
            type : String
        },
        city : {
            type : String
        }
    },
    slot_2: {
        status : {
            type : String,
            default : false
        },
        patientId : {
            type : String
        },
        name : {
            type : String
        },
        email : {
            type :String
        },
        mobile : {
            type : String
        },
        gender : {
            type : String
        },
        age : {
            type : String
        },
        state : {
            type : String
        },
        city : {
            type : String
        }
    },
    slot_3: {
        status : {
            type : String,
            default : false
        },
        patientId : {
            type : String
        },
        name : {
            type : String
        },
        email : {
            type :String
        },
        mobile : {
            type : String
        },
        gender : {
            type : String
        },
        age : {
            type : String
        },
        state : {
            type : String
        },
        city : {
            type : String
        }
    },
    slot_4: {
        status : {
            type : String,
            default : false
        },
        patientId : {
            type : String
        },
        name : {
            type : String
        },
        email : {
            type :String
        },
        mobile : {
            type : String
        },
        gender : {
            type : String
        },
        age : {
            type : String
        },
        state : {
            type : String
        },
        city : {
            type : String
        }
    },
    slot_5: {
        status : {
            type : String,
            default : false
        },
        patientId : {
            type : String
        },
        name : {
            type : String
        },
        email : {
            type :String
        },
        mobile : {
            type : String
        },
        gender : {
            type : String
        },
        age : {
            type : String
        },
        state : {
            type : String
        },
        city : {
            type : String
        }
    },
    slot_6: {
        status : {
            type : String,
            default : false
        },
        patientId : {
            type : String
        },
        name : {
            type : String
        },
        email : {
            type :String
        },
        mobile : {
            type : String
        },
        gender : {
            type : String
        },
        age : {
            type : String
        },
        state : {
            type : String
        },
        city : {
            type : String
        }
    }
})

const Appointment = mongoose.model('appointments', appointmentSchema)

module.exports = Appointment