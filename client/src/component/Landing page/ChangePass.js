import React,{useRef} from 'react'
import { useForm } from 'react-hook-form'
import { withRouter, useHistory} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function ChangePass(){

  const { register, handleSubmit, errors, watch } = useForm()
  const history = useHistory()
  const password = useRef({});
  password.current = watch("password", "");
  var token = localStorage.getItem('setpass')

    const setPass = (data) => {
        data.token = token
        delete data.cPassword
        axios.post("/setpass",data).then(res => {
            if(res.data === 'expired'){
              history.push("/register/expired")
            }
            if(res.data === 'passwordSuccess'){
              localStorage.removeItem('setpass')
              history.push('register/newpassword')
            }
            if(res.data === null){
              toast.error('Server Error, Please Try again', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
              
            }
        })
        
    }
    return(
        <div>

      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
          <div class="card border-warning mb-3">
            <div class="card-header"><b>Set Your New Password</b></div>
            <div class="card-body">
              <form onSubmit={handleSubmit(setPass)}>
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
                    {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword2"><b>Confirm Password</b></label>
                    <input type="password" name="cPassword" ref={register({
                      validate: value =>
                        value === password.current || "The passwords do not match"
                    })} className="form-control" id="exampleInputPassword2"
                      placeholder="Confirm Password"></input>
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

export default withRouter(ChangePass)