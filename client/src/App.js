import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import Splash from './component/Splash'
import { Offline } from "react-detect-offline";
import Register from './component/Landing page/Register'
import DoctorRegistration from './component/DoctorRegistration'
import PatientRegistration from './component/PatientRegistration'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import ForgotPassword from './component/Landing page/ForgetPassword';
import ChangePass from './component/Landing page/ChangePass';
import DocProtected from './component/DocProtected'
import PatientProtected from './component/PatProtected'
import SearchPage from './component/SearchPage'
import BookAppointment from './component/BookAppointment'
import DocProfile from './component/DocProfile';
import DocBooking from './component/DocBooking';
import Payment from './component/Payment';
import Video from './component/videocall/Video'
import Appointment from './component/Appointment';
import Status from './component/Status'
import Conatct from './component/Landing page/contact'
toast.configure()
function App() {


  const [timePassed, setTimepassed] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setTimePassed();
    }, 2000);
  }, [])
  const setTimePassed = () => {
    setTimepassed(true)
  }
  if (!timePassed) {
    return <Splash />
  }
  else {
    return (
      <div>
        <Offline>
          <div className="alert alert-danger text-center fixed-top" role="alert">
            Weak Internet Connection!!
          </div>
        </Offline>

        <BrowserRouter>
          <Switch>

            <Route exact path="/" component={Register} />
            <PatientProtected exact path="/home" component={Dashboard} />
            <PatientProtected exact path="/doctorprofile/:speciality" component={SearchPage} />
            <PatientProtected exact path="/patient" component={PatientRegistration} />
            <DocProtected exact path="/doc" component={DoctorRegistration} />
            <DocProtected exact path="/profile" component={DocProfile} />
            <DocProtected exact path="/docbooking" component={DocBooking} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <PatientProtected path="/bookappointment" component={BookAppointment} />
            <PatientProtected path="/payment" component={Payment} />
            <PatientProtected path="/appointments" component={Appointment} />
            <Route path="/newpass" component={ChangePass} />
            <Route path='/videocall/:id' component={Video} />
            <Route path="/register/:status" component={Status} />
            <Route path='/contactus' component={Conatct}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
