const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const doctorController = require('../Controllers/DoctorController')

router.get('/doc', doctorController.register)

router.post('/adddoctor',auth,doctorController.addDoctor)
router.post('/updateprofile', auth, doctorController.updateprofile)

router.post('/selectdoctor',auth,doctorController.doctor)

router.post("/docslot",auth, doctorController.appointment)

router.post("/bookslot",auth, doctorController.bookslot)

router.get('/getdoctor', auth, doctorController.getDoctor)

router.post("/booking",auth,doctorController.booking)
 
module.exports = router