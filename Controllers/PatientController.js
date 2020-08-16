const PatientSchema = require('../Model/patientSchema');
const DoctorSchema = require('../Model/doctorSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const patientController = {}

patientController.register = function (req, res) {
    jwt.verify(req.query.token, "amit", function (err, decode) {

        if (decode) {
            PatientSchema.findOne({ email: decode.email }).then(user => {
                if (!user) {
                    bcrypt.hash(decode.password, 10, (err, hash) => {
                        if (err) console.log(err)
                        else {
                            const newUser = new PatientSchema({
                                email: decode.email,
                                mobile: decode.mobile,
                                password: hash
                            })
                            newUser.save((err, user) => {
                                if (err) return console.error(err);
                                res.redirect('https://arogya-149.herokuapp.com/register/success')
                            })
                        }
                    })
                } else { res.redirect('https://arogya-149.herokuapp.com/register/present') }
            })

        } else (
            res.redirect('https://arogya-149.herokuapp.com/register/expired')
        )

    })

}

patientController.login = function (req, res) {
    const { email, password } = req.body
    PatientSchema.findOne({ email: email }).then(user => {
        if(user){
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    jwt.sign(
                        { id: user._id },
                        "sharma",
                        { expiresIn: 60*60*24 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    email: user.email,
                                    name : user.name
                                }
                            })
                        }
                    )
                }else{
                    res.send("incorrectPassword")
                }
            });
        }else{
            res.send("noUser")
        }
    })
}

patientController.addPatient = async (req, res) => {
    const userId = req.user.id
    const { name, gender, state, city, age } = req.body
    var patient = await PatientSchema.findOne({ _id: userId })
    patient.name = name
    patient.gender = gender
    patient.state = state
    patient.city = city
    patient.age = age
    patient.save()
    res.send(patient)
}

patientController.searchSpeciality=async (req,res)=>{
    try{
        let speciality= req.params.search
        let doc = await DoctorSchema.find({specialisation:speciality});
        res.send(doc);
    }
    catch(err){
        console.log(err)
    }
   }

patientController.getUser = async (req,res)=>{
   const userId = req.user.id
   let patient = await PatientSchema.findOne({_id:userId})

   res.send(patient)
}

patientController.getSearchByName = async (req, res) => {
    var userId=req.user.id
    var search = req.params.name
    await DoctorSchema.find({ name: { $regex: search, $options: "i" } }, function (err, docs) {
        res.send(docs)

    });
    
}

// Set new Password for Pateint
patientController.setpass = function (req, res) {
    const { email, userInfo } = req.body
    PatientSchema.findOne({ email: email }).then(user => {
        if (user) {
            let data = {
                _id: user._id,
                userInfo: userInfo
            }
            jwt.sign(
                data,
                "amit",
                { expiresIn: 600 },
                async (err, token) => {

                    if (err) throw err;
                    //step 1
                    let transpoter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: "medicalapp331@gmail.com",
                            pass: "rajat@1993"
                        }
                    })

                    //step 2
                    let mailOptions = {
                        from: "medicalapp331@gmail.com",
                        to: email,
                        subject: "Med - Tech ",
                        text: "IT works",
                        html:
                            "Welcome to Med-Tech.Please click on Link to set Your New Password <br><a href=https://arogya-149.herokuapp.com/setpass?token=" + token + " target='_blank'>https://arogya-149.herokuapp.com/setpass</a>"
                    }

                    await transpoter.sendMail(mailOptions, function (err, userData) {
                        if (err) {
                            console.log("error occurs", err)
                        } else {
                            // console.log("Email sent for set password", userData)
                            res.json(token)
                        }
                    })
                }
            )
            }else{
                res.send('noUser')
            }
        })

}


patientController.getDocById = async(req,res)=>{
    var userId = req.user.id
    var id = req.params.id
    let doc = await DoctorSchema.findOne({ _id: id })

    res.send(doc)

}

patientController.patientBooking = function(req,res){
    PatientSchema.findById(req.user.id,function(err,patient){
        if(err)  res.send({})
        res.send(patient)
    })
}
module.exports = patientController