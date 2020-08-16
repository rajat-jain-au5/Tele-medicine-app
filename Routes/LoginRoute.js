const express = require('express');
const router = express.Router();
const doctorController = require("../Controllers/DoctorController")
const patientController = require("../Controllers/PatientController")

router.post("/login",(req,res) => {
    if(req.body.userinfo == "doc"){
        doctorController.login(req,res)
    }
    if(req.body.userinfo == "patient"){
        patientController.login(req,res)
    }
})

module.exports = router