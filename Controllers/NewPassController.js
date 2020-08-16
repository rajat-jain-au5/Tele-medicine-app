const PatientSchema = require('../Model/patientSchema');
const DoctorSchema = require('../Model/doctorSchema')
const bcrypt = require('bcrypt')

const newPassController = {}

newPassController.changePass = function (req, res) {

    if (req.body.userInfo === 'doc') {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) console.log(err)
            else {
                DoctorSchema.findOneAndUpdate({ '_id': req.body._id }, { 'password': hash }, {
                    new: true
                }, (err, doc) => {
                    if (err) res.send(null)
                    res.send("passwordSuccess")
                })
            }
        })
    }

    if (req.body.userInfo === 'patient') {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) console.log(err)
            else {
                PatientSchema.findOneAndUpdate({ '_id': req.body._id }, { 'password': hash }, {
                    new: true
                }, (err, doc) => {
                    if (err) res.send(null)
                    res.send("passwordSuccess")
                })
            }
        })
    }

}

module.exports = newPassController