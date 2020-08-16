const express = require('express')
const router = express.Router();
const verifyController = require("../Controllers/VerifyController");
const doctorController = require('../Controllers/DoctorController');
const patientController = require('../Controllers/PatientController')

router.post("/verify",(req,res) => {
    verifyController.verify(req,res)
})

//set New Password
router.post("/setpassword",(req,res) => {
    if(req.body.userInfo == "doc"){
        doctorController.setpass(req,res)

    } 
    if(req.body.userInfo == "patient"){
        patientController.setpass(req,res)
    }
})

module.exports = router