const DoctorSchema = require('../Model/doctorSchema')
const AppointmentSchema = require('../Model/appointmentSchema')
const PatientSchema = require('../Model/patientSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const doctorController = {}


doctorController.register = function (req, res) {
    jwt.verify(req.query.token, "amit", function (err, decode) {
        if (decode) {
            DoctorSchema.findOne({ email: decode.email }).then(user => {
                if (!user) {
                    bcrypt.hash(decode.password, 10, (err, hash) => {
                        if (err) console.log(err)
                        else {
                            const newUser = new DoctorSchema({
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
                } else { res.redirect('https://arogya-149.herokuapp.com/register/present')}
            })

        } else (
            res.redirect('https://arogya-149.herokuapp.com/register/expired')
        )

    })

}

doctorController.login = function(req,res){
    const { email, password} = req.body
  
    DoctorSchema.findOne({email : email}).then( user => { 
        if(user){
            bcrypt.compare(password, user.password, function(err,result){
                if(result){
                    jwt.sign(
                        {id : user._id},
                        "sharma",
                        { expiresIn : 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user : {
                                    id : user.id,
                                    email : user.email,
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
    

doctorController.addDoctor= async(req,res)=>{
    const userId = req.user.id
    const {name, gender, image, license, qualification,bio,specialisation,hospital,address,lang,state,city,age,fees}=req.body
    const doctor = await DoctorSchema.findOne({_id:userId})
  
    doctor.name=name
    doctor.gender=gender
    doctor.image=image
    doctor.license=license
    doctor.qualification = qualification
    doctor.bio = bio
    doctor.specialisation = specialisation
    doctor.hospital = hospital
    doctor.address = address
    doctor.language = lang
    doctor.state=state
    doctor.city=city
    doctor.fees=fees
    doctor.age= age
    doctor.save();
    //  console.log("new Registered DOc",doctor)
}

doctorController.getDoctor= async (req,res)=>{
    const userId = req.user.id
    let doc = await DoctorSchema.findOne({ _id: userId })
    res.send(doc)
}

doctorController.updateprofile = async (req,res)=>{
    const userId = req.user.id
    const { name,email, image,bio,hospital, address,  fees } = req.body
    let doc = await DoctorSchema.findOne({ _id: userId })
     doc.name=name
     doc.email=email
     doc.image=image
     doc.bio= bio
     doc.hospital = hospital
     doc.address = address
     doc.fees= fees
     doc.save();
     res.send(doc)

}



//set New Password for Docotr
doctorController.setpass = function(req,res){
    const { email, userInfo } = req.body
    DoctorSchema.findOne({email : email}).then(user =>{

        if(user){
            let data = {
                _id : user._id,
                userInfo : userInfo
            }
            jwt.sign(
                data,
               "amit",
               { expiresIn : 15*60},
              async (err, token) => {
                   
                   if(err) throw err;
                     //step 1
           let transpoter = nodemailer.createTransport({
               host: 'smtp.gmail.com',
               port: 465,
               secure: true,
               auth : {
                 user : "medicalapp331@gmail.com",
                 pass : "rajat@1993"
               }
             })
         
             //step 2
             let mailOptions ={
               from : "medicalapp331@gmail.com",
               to : email,
               subject : "Med - Tech ",
               text: "IT works",
               html:
                   "Welcome to Med-Tech.Please click on Link to set Your New Password <br><a href=https://arogya-149.herokuapp.com/setpass?token=" + token +" target='_blank'>https://arogya-149.herokuapp.com/setpass</a>"  
             }
         
           await  transpoter.sendMail(mailOptions, function(err, userData) {
               if(err){
                 console.log("error occurs",err)
               }else{
                //  console.log("Email sent for set password", userData)
                 res.json(token)
               }
             })
         }
           )

        }else{
            res.send("noUser")
        }
    })

}

doctorController.doctor = function(req,res){
    const{ myId } = req.body;
    DoctorSchema.findById(myId, function(err,resp){
        if(err) console.log('Server Error')
        res.send(resp)
    }) 
}

doctorController.appointment = function(req,res){
    var { date, docId} = req.body
    AppointmentSchema.find({ date : date, docId : docId }, (err,data) => {
        if(err) console.log("let Err", err)
        res.send(data)
    })
}
   
doctorController.bookslot = async function(req,res){
    const { date, docId, name, email, mobile, gender, age, state, city  } = req.body
    var patientId= req.user.id
    console.log(req.body)
    if(req.body.slot_1){
        console.log("DoctorController 188", patientId, age)
        AppointmentSchema.findOneAndUpdate({ date : date, docId : docId },{slot_1 : {status : true, patientId, name, email, mobile, gender, age, state, city }},
            {upsert: true, new : true},
            (err, doc) =>{
                if (err) {
                    // console.log("hello arr", err)
                    res.send(null)
                }
                if(doc){
                    PatientSchema.findOneAndUpdate({_id : patientId},{$push : {booking : { date: date, slot : "slot_1", docId : docId, patId : patientId }}}, 
                    function(err,resp){
                                if(err) console.log('Server Error')
                            }) 
                            res.send(doc)
                        }
            }
        )

     }
    if(req.body.slot_2){
        AppointmentSchema.findOneAndUpdate({ date : date, docId : docId },{slot_2 : {status : true, patientId, name, email, mobile, gender, age, state, city }},
            {upsert: true, new : true},
            (err, doc) =>{
                if (err) {
                    // console.log("hello arr", err)
                    res.send(null)
                }
                if(doc){
                    PatientSchema.findOneAndUpdate({_id : patientId},{$push : {booking : { date: date, slot : "slot_2", docId : docId, patId : patientId }}}, 
                    function(err,resp){
                                if(err) console.log('Server Error')
                            }) 
                            res.send(doc)
                        }
            }
        )

    }
    if(req.body.slot_3){
        AppointmentSchema.findOneAndUpdate({ date : date, docId : docId },{slot_3 : {status : true, patientId, name, email, mobile, gender, age, state, city }},
            {upsert: true, new : true},
            (err, doc) =>{
                if (err) {
                    // console.log("hello arr", err)
                    res.send(null)
                }
                if(doc){
                    PatientSchema.findOneAndUpdate({_id : patientId},{$push : {booking : { date: date, slot : "slot_3", docId : docId, patId : patientId }}}, 
                    function(err,resp){
                                if(err) console.log('Server Error')
                            }) 
                            res.send(doc)
                        }
                
            }
        )
        
    }
    if(req.body.slot_4){
        AppointmentSchema.findOneAndUpdate({ date : date, docId : docId },{slot_4 : {status : true, patientId, name, email, mobile, gender, age, state, city }},
            {upsert: true, new : true},
            (err, doc) =>{
                if (err) {
                    // console.log("hello arr", err)
                    res.send(null)
                }
                if(doc){
                    PatientSchema.findOneAndUpdate({_id : patientId},{$push : {booking : { date: date, slot : "slot_4", docId : docId, patId : patientId }}}, 
                    function(err,resp){
                                if(err) console.log('Server Error')
                            }) 
                            res.send(doc)
                        }
            }
        )
        
    }
    if(req.body.slot_5){
        AppointmentSchema.findOneAndUpdate({ date : date, docId : docId },{slot_5 : {status : true, patientId,  name, email, mobile, gender, age, state, city }},
            {upsert: true, new : true},
            (err, doc) =>{
                if (err) {
                    // console.log("hello arr", err)
                    res.send(null)
                }
                if(doc){
                    PatientSchema.findOneAndUpdate({_id : patientId},{$push : {booking : { date: date, slot : "slot_5", docId : docId, patId : patientId }}}, 
                    function(err,resp){
                                if(err) console.log('Server Error')
                            }) 
                            res.send(doc)
                        }
            }
        )
        
    }
    if(req.body.slot_6){
        AppointmentSchema.findOneAndUpdate({ date : date, docId : docId },{slot_6 : {status : true, patientId, name, email, mobile, gender, age, state, city }},
            {upsert: true, new : true},
            (err, doc) =>{
                if (err) {
                    // console.log("hello arr", err)
                    res.send(null)
                }
                if(doc){
                    PatientSchema.findOneAndUpdate({_id : patientId},{$push : {booking : { date: date, slot : "slot_6", docId : docId, patId : patientId }}}, 
                    function(err,resp){
                                if(err) console.log('Server Error')
                            }) 
                            res.send(doc)
                        }
            }
        )
        
    }
}

doctorController.booking = function(req,res){
    req.body.docId = req.user.id
    AppointmentSchema.findOne(req.body,
        (err, doc) =>{
            if (err) {
                // console.log("hello arr", err)
                res.send(null)
            }
            res.send(doc)
        }
    )
}
module.exports = doctorController