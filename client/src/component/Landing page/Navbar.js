import React, { useRef }  from "react";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
// import "../../App.css";
import logo from '../../images/logo1.png'
import axios from "axios";
import { useForm } from "react-hook-form"
import { withRouter, useHistory } from "react-router-dom";
import $ from 'jquery'
function Navbar() {
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory()
  const password = useRef({});
  password.current = watch("password", "");
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm();
  const logoutUser =()=>{
    localStorage.removeItem('patientAuth')
    localStorage.removeItem('doctorAuth')
    localStorage.removeItem('setSplash')
  }
  const onSubmit = (data) => {
    axios.post("http://localhost:3010/verify", data).then(res => {
      if(res.data){
        toast.success('We have Sent you a Mail, Please Verify', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      }else{
        toast.error('Server Error, Try Again', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      }
    })

    //console.log(data)
  }

  const onLogin = (data) => {
    console.log("login",data)
    axios.post("http://localhost:3010/login", data).then(res => {
      console.log("nav 41", res.data)
      if(res.data){
        if(res.data === "incorrectPassword") {
          toast.error('Password is Incorrect', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        }
        if(res.data === "noUser"){
          history.push("/register/nouser")
        }
          if(data.userinfo === 'patient' && res.data !== 'incorrectPassword' && res.data !== 'noUser' ){
            localStorage.setItem('patientAuth', res.data.token);
           localStorage.setItem("setSplash",'true')
            if(res.data.user.name){
               history.push('/home')
            }else{
              history.push('/patient')
            }
         }
         if(data.userinfo === 'doc' && res.data !== 'incorrectPassword' && res.data !== 'noUser'){
          localStorage.setItem('doctorAuth', res.data.token);
         localStorage.setItem("setSplash", 'true')
          if(res.data.user.name){
            history.push('/docbooking')
          }else{
                history.push('/doc')
          }
         }
                
         
      }else{
        toast.error('Server Error, Try Again', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      // console.log(res)

      }
    })
  }
  $(window).scroll(function() {
    if ($(document).scrollTop() > 370) {
      $('.navbar').removeClass('bg-transparent').addClass('bg-nav');
    } else {
      $('.navbar').removeClass('bg-nav').addClass('bg-transparent');
    }
  });
  
  return (
   
    <div className="row">
      <div className="w-100 bg-nav">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
         
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand ml-5" href="/home"><img src={logo} style={{height : "100%", width:"100%"}}/></a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          {
              localStorage.getItem("doctorAuth") ?
               <a href="/profile" className="btn btn-warning mr-3">
                <b>profile</b>
                </a>
                 : localStorage.getItem("patientAuth")
                 ? <a href="/patient" className="btn btn-warning mr-3">
                    <b>profile</b>
                  </a>

              :
          
            <button type="button" className="btn btn-warning mr-3" data-toggle="modal" data-target="#userLogin">
              <b>Login</b>
            </button>
          }
          {
            localStorage.getItem("patientAuth")?
                <a  href="/" onClick ={logoutUser} className="btn btn-warning mr-5 mb-5">
                  <b>Logout</b>
                </a>
                : localStorage.getItem("doctorAuth")
                  ? <a  href="/" onClick={logoutUser} className="btn btn-warning mr-5">
                    <b>Logout</b>
                  </a>
                  : <button type="button" className="btn btn-warning mr-5" data-toggle="modal" data-target="#userSignup">
                  <b>Register</b>
                </button>
          }
           
          </div>
        </nav>
      </div>
      <div className="modal fade" id="userLogin" data-backdrop="true" tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit2(onLogin)}>

              <div className="form-group">
                  <label className="d-block"><b>As a</b></label>
                  <input type="radio"  className="userInfo" name="userinfo" value="doc" ref={register2({required : true})}></input><b>  Doctor</b>
                  <input type="radio" className="userInfo ml-5" name="userinfo" value="patient" ref={register2({required : true})}  ></input><b>  User</b>
                  {errors2.userinfo && <p style={{ color: "red" }}>Please select one</p>}
                </div>
                <div className="form-group">
                  <label for="userLoginEmail"><b>Email address</b></label>
                  <input type="email" className="form-control" id="userLoginEmail"
                    aria-describedby="emailHelp" name="email" ref={register2({required : true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/})} placeholder="Enter email"></input>
                  {errors2.email && <p style={{ color: "red" }}>Please Enter Valid Email</p>}
                </div>
                <div className="form-group">
                  <a href="/forgotpassword" className="float-right text-warning" target="_blank">Forgot Password</a>
                </div>
                <div className="form-group">
                  <label for="userLoginPassword"><b>Password</b></label>
                  <input type="password" className="form-control" name="password" ref={register2({required : true, minLength: 8})} id="userLoginPassward"
                    placeholder="Password"></input>
                  {errors2.password && <p style={{ color: "red" }}>Password should be 8 Character long</p>}
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-warning"><b>Submit</b></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="userSignup" data-backdrop="true" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Register</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group">
                  <label className="d-block"><b>As a</b></label>
                  <input type="radio"  className="userInfo" name="userinfo" value="doc" ref={register({required : true})}></input><b>  Doctor</b>
                  <input type="radio" className="userInfo ml-5" name="userinfo" value="patient" ref={register({required : true})}  ></input><b>  User</b>
                  {errors.userinfo && <p style={{ color: "red" }}>Please select one</p>}
                </div>

                <div className="form-group">
                  <label for="userEmail"><b>Email address</b></label>
                  <input type="text" name="email" className="form-control" id="userEmail"
                    aria-describedby="emailHelp" ref={register({ required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ })} placeholder="Enter email"></input>
                  {errors.email && <p style={{ color: "red" }}>Please enter valid E-mail</p>}
                </div>
                <div className="form-group">
                  <label for="mobNum"><b>Mobile Number</b></label>
                  <input type="text" name="mobile" id="mobNum" className="form-control" ref={register({ required: true, minLength: 10, maxLength: 10, pattern: /[7-9]{1}[0-9]{9}/ })} placeholder="Mobile number"></input>
                  {errors.mobile && <p style={{ color: "red" }}>Mobile number is in-valid</p>}
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1"><b>Password</b></label>
                  <input type="password" name="password" ref={register({
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        })} className="form-control" id="exampleInputPassword1"
                    placeholder="Password"></input>
                  {errors.password && <p style={{color : "red"}}>{errors.password.message}</p>}
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword2"><b>Confirm Password</b></label>
                  <input type="password" name="cPassword" ref={register({
          validate: value =>
            value === password.current || "The passwords do not match"
        })} className="form-control" id="exampleInputPassword2"
                    placeholder="Confirm Password"></input>
                  {errors.cPassword && <p style={{color : "red"}}>{errors.cPassword.message}</p>}

                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-warning">
                    <b>Submit</b>
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  );

}
export default withRouter(Navbar);