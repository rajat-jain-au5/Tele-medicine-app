import React, { useState, useEffect } from 'react';
import Navbar from './Landing page/Navbar'
import Footer from './Landing page/Footer'
import { useForm } from 'react-hook-form'
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios'
import $ from 'jquery'
function PatientRegistrtation() {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory()
    const token = localStorage.getItem("patientAuth");
    const getStateCity = () => {
        let request = axios({
            method: "GET",
            url: "https://freegeoip.app/json/"
        });
        request.then(res => {
            setState(res.data.region_name)
            setCity(res.data.city)
        })

    }
    const getPatient = () => {
        let request = axios({
            method: "GET",
            url: "/getuser",
            headers: {
                "x-auth-token": token
            },
        });
        request.then(res => {
            setName(res.data.name)
            setGender(res.data.gender)
            setAge(res.data.age)

        })
    }
    useEffect(() => {
        getPatient()
        getStateCity()
    }, [])
    const patientregister = (data) => {
        console.log("patient data", data)
        let token = localStorage.getItem("patientAuth");
        const pat = { name, age, gender, state, city }
        let request = axios({
            method: "POST",
            url: "/addpatient",
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
        <div >
            <Navbar />
            {
                (() => {
                    $("body").removeClass("modal-open");
                    $("div.modal-backdrop").remove();
                })()
            }
            <div className="container mt-5 ">
                <div className="row">

                    <h1 className="col-4 offset-md-3">Profile</h1>
                </div>
                <div className="row">
                    <div className="col-7 offset-md-3 p-3  rounded shadow">
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
                            <input type="hidden" name="country" id="countryId" value="IN" />
                            <div className="form-group">
                                <label for="state">
                                    <b>State</b>
                                </label>
                                <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" />


                                {errors.state && <p style={{ color: "red" }}>Your State</p>}
                            </div>
                            <div className="form-group">
                                <label for="city">
                                    <b>City</b>
                                </label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />

                                {errors.city && <p style={{ color: "red" }}>Your City</p>}
                            </div>
                            {
                                age === "" ? <button type="submit" className="btn btn-warning">
                                    <b>Submit</b>
                                </button> :
                                    <button type="submit" className="btn btn-warning">
                                        <b>Update</b>
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