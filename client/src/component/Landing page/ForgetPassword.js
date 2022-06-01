import React from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {toast} from 'react-toastify'
import { withRouter, useHistory} from 'react-router-dom'
function ForgotPassword() {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const setPass = (data) => {
    axios.post("http://localhost:3010/setpassword",data).then(res => {
      if(res.data === 'noUser'){
        history.push("/register/nouser")
      }else{
        toast.success('We sent You a mail', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        localStorage.setItem('setpass', res.data);
      } 
    })
  } 
  return (
    <div>

      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
          <div class="card border-warning mb-3">
            <div class="card-header"><b>Forgot Password</b></div>
            <div class="card-body">
              <form onSubmit={handleSubmit(setPass)}>
                <div className="form-group">
                  <label className="d-block"><b>As a</b></label>
                  <input type="radio" className="userInfo" name="userInfo" value="doc" ref={register({ required: true })}></input><b>  Doctor</b>
                  <input type="radio" className="userInfo ml-5" name="userInfo" value="patient" ref={register({ required: true })}  ></input><b>  User</b>
                  {errors.userInfo && <p style={{ color: "red" }}>Please select one</p>}
                </div>
                <div className="form-group">
                  <label for="userEmail"><b>Please Enter Your Email</b></label>
                  <input type="text" className="form-control" id="userEmail" name="email" ref={register({ required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/})} placeholder="email"></input>
                  {errors.email && <p style={{ color: "red" }}>Please enter a valid Email</p>}
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-warning">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  )
}

export default withRouter(ForgotPassword);