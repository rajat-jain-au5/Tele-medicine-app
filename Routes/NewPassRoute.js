const express = require('express');
const router = express.Router();
const newPassController = require('../Controllers/NewPassController')
const jwt = require('jsonwebtoken');

router.get("/setpass",(req,res) => {
    jwt.verify(req.query.token,"amit",function(err) {
        if(err){
            res.redirect("https://arogya-149.herokuapp.com/register/expired")
        }else{
            res.redirect("https://arogya-149.herokuapp.com/newpass")
        }
    })
})
 
router.post("/setpass",(req,res) =>{
    const{ password } = req.body
    jwt.verify(req.body.token,"amit",function(err,decode){
        if(err){
            res.send("expired")
        } else{
            req.body = decode
            req.body.password = password
            newPassController.changePass(req,res);
        }
    })
})

module.exports = router