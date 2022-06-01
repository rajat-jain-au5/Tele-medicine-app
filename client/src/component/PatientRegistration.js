import React,{useState,useEffect} from 'react';
import Navbar from './Landing page/Navbar'
import Footer from './Landing page/Footer'
import { useForm } from 'react-hook-form'
import {withRouter, useHistory} from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery'
function PatientRegistrtation(){
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory()
    const token = localStorage.getItem("patientAuth");
    const getPatient=()=>{
        let request = axios({
            method: "GET",
            url: "http://localhost:3010/getuser",
            headers: {
                "x-auth-token": token
            },
        });
        request.then(res => {
            setName(res.data.name)
            setGender(res.data.gender)
            setAge(res.data.age)
            setState(res.data.state)
            setCity(res.data.city)
        })
    }
    useEffect(() => {
        getPatient()
      
    }, [])
    const patientregister=(data)=>{
        console.log("patient data", data)
        let token = localStorage.getItem("patientAuth");
        const pat= {name,age,gender,state,city}
        let request = axios({
            method: "POST",
            url: "http://localhost:3010/addpatient",
            data: pat,
            headers: {
                "x-auth-token": token
            },
        });
        request.then(res => {
            
            history.push('/home');

        })
     
    }
        return (
            <div>
                <Navbar />
                {
                    (() => {
                        $("body").removeClass("modal-open");
                        $("div.modal-backdrop").remove();
                    })()
                }
                <div className="container">
                    <div className="row">
                        <div className="col-5"></div>
                        <div className="col-7">
                            <h2>Welcome to user Page</h2>
                            <form onSubmit={handleSubmit(patientregister)}>
                                <div className="form-group">
                                    <label for="userName">
                                        <b>Name</b>
                                    </label>
                                    <input type="text" name="name" value={name} className="form-control" onChange={(e) => setName(e.target.value)} ref={register({ required: true })} id="userName" aria-describedby="emailHelp" placeholder="Enter name"></input>
                                    {errors.name && <p style={{ color: "red" }}>Please Enter Your Name</p>}
                                </div>
                                <div className="form-group">
                                    <label for="age1">
                                        <b>Age</b>
                                    </label>
                                    <input type="number" name="age" value={age} className="form-control" onChange={(e) => setAge(e.target.value)} ref={register({ required: true })} id="age1" placeholder="Your Age"></input>
                                    {errors.age && <p style={{ color: "red" }}>Please Enter Your age</p>}
                                </div>
                                <div class="form-group">
                                    <label for="gender1"><b>Gender</b></label>
                                    <select className="form-control" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} ref={register({ required: true })} id="gender1">
                                        <option value="" disabled selected>Please Select</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="T">Transgender</option>

                                    </select>
                                    {errors.gender && <p style={{ color: "red" }}>Please select gender</p>}
                                </div>
                                <input type="hidden" name="country"  id="countryId" value="IN" />
                                <div className="form-group">
                                    <label for="state">
                                        <b>State</b>
                                    </label>
                                    <select name="state" ref={register({ required: true })} onChange={(e) => setState(e.target.value)} className="states order-alpha form-control" id="stateId">
                                        <option value={state} >Select State</option>
                                    </select>
                                    {errors.state && <p style={{ color: "red" }}>Your State</p>}
                                </div>
                                <div className="form-group">
                                    <label for="city">
                                        <b>City</b>
                                    </label>
                                    <select name="city" ref={register({ required: true })}  onChange={(e) => setCity(e.target.value)} className="cities order-alpha limit-pop-70000 form-control" id="cityId">
                                        <option value={city}>Select City</option>
                                    </select>
                                    {errors.city && <p style={{ color: "red" }}>Your City</p>}
                                </div>
                                {
                                    age === "" ? <button type="submit" className="btn btn-warning">
                                        <b>Submit</b>
                                    </button>:
                                        <button type="submit" className="btn btn-warning">
                                            <b>Save</b>
                                        </button>
                                }
                               
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Footer />
                </div>
            </div>
        )
    
}


export default withRouter(PatientRegistrtation)