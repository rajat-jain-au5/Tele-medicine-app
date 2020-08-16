const express  = require('express')
var path = require("path")
const cors = require('cors')
require('dotenv').config()
var app = express();

app.use(express.json());
app.use(cors())

app.use('/',require('./Routes/PatientRoute'))
app.use('/',require('./Routes/DoctorRoute'))
app.use('/',require('./Routes/VerifyRoute'))
app.use('/',require('./Routes/LoginRoute'))
app.use('/',require('./Routes/NewPassRoute'))

if (process.env.NODE_ENV === "production") {
      // Set static folder
      app.use(express.static("client/build"));
      app.get("/*", function (req, res) {
            res.sendFile(path.join(__dirname, "./client/build/index.html"));
      });
} 
module.exports = app
