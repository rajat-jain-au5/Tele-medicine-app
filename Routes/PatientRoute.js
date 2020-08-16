const express = require('express');
const router = express.Router()
const patientController = require('../Controllers/PatientController')
const auth = require('../middleware/auth')

router.get('/patient',(req,res)=>{
      patientController.register(req,res)
})



router.post("/addpatient", auth,patientController.addPatient)
router.get("/doctor/:search", auth, patientController.searchSpeciality)
router.get('/getuser',auth,patientController.getUser)
router.get('/doctorname/:name', auth, patientController.getSearchByName)
router.get('/doctor/getbyid/:id',auth,patientController.getDocById)
router.get('/getbooking', auth,patientController.patientBooking)

module.exports = router