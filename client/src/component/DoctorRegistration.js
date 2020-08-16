import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import Navbar from './Landing page/Navbar'
import speciality from '../speciality.json'
import Footer from './Landing page/Footer'
import { useForm } from 'react-hook-form'
import Aos from 'aos';
import 'aos/dist/aos.css'
import axios from 'axios'
import { withRouter, useHistory } from 'react-router-dom'
import Select from 'react-select';


function DoctorRegistration() {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const [bio, setBio] = useState("")
    const [specialisation, setSpecialisation] = useState("")
    const [license, setLicense] = useState("")
    const [hospital, setHospital] = useState("")
    const [address, setAddress] = useState("")
    const [language, setLangauge] = useState([])
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [fees, setFees] = useState("")
    const [image, setImage] = useState(undefined)
    const token = localStorage.getItem("doctorAuth");

    var history = useHistory()
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        Aos.init({ duration: 2000 })
        getStateCity()
    }, [])
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
    const uploadPic = (image) => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "medicalapp")
        data.append("cloud_name", "dsmr18nsi")
        let img = axios({
            method: "POST",
            url: "https://api.cloudinary.com/v1_1/dsmr18nsi/image/upload",
            data: data,
        });
        img.then(res => {
            // console.log(res)
            setImage(res.data.url)
        })
    }
    const docregister = (data) => {
        // console.log("doc data", data)

        const lang = language.map(el => el.value)
        const doc = {
            name, age, image, gender, qualification, bio, specialisation, license, hospital, address, lang, state, city, fees
        }
        // console.log(doc)
        let request = axios({
            method: "POST",
            url: "/adddoctor",
            data: doc,
            headers: {
                "x-auth-token": token
            },
        });
        request.then(res => {
            console.log(res)
            history.push('/docbooking')
        })




    }
    const handleChange = (e) => {
        console.log(e)


    }
    const colourOptions = [{ value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Kannada', label: 'Kannada' }]
    console.log(language)
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

                    <h1 className="col-4 offset-md-3">Registration</h1>
                </div>
                <div className="row">
                    
                    <div className="col-md-6 offset-md-3 shadow doctor-register">
                        <form onSubmit={handleSubmit(docregister)}>
                            <div className="form-group">
                                <label for="userName">
                                    <b>Name</b>
                                </label>
                                <input type="text" name="name" className="form-control" onChange={(e) => setName(e.target.value)} ref={register({ required: true })} id="userName" aria-describedby="emailHelp" placeholder="Enter name"></input>
                                {errors.name && <p style={{ color: "red" }}>Please Enter Your Name</p>}
                            </div>
                            <div className="form-group">
                                <label for="age1">
                                    <b>Age</b>
                                </label>
                                <input type="number" name="age" className="form-control" onChange={(e) => setAge(e.target.value)} ref={register({ required: true })} id="age1" placeholder="Your Age"></input>
                                {errors.age && <p style={{ color: "red" }}>Please Enter Your age</p>}
                            </div>
                            <div className="form-group">
                                <label for="image1">
                                    <b>Select Your Image</b>
                                </label>
                                <input type="file" name="image" className="form-control" onChange={(e) => uploadPic(e.target.files[0])} id="image1"></input>
                                {/* {errors.image && <p style={{color : "red"}}>Share your Image</p>} */}
                            </div>

                            <div class="form-group">
                                <label for="gender1"><b>Gender</b></label>
                                <select className="form-control" name="gender" onChange={(e) => setGender(e.target.value)} ref={register({ required: true })} id="gender1">
                                    <option value="" disabled selected>Please Select</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                {errors.gender && <p style={{ color: "red" }}>Please select gender</p>}
                            </div>
                            <div className="form-group">
                                <label for="education1">
                                    <b>Qualification</b>
                                </label>
                                <input type="text" name="qualification" className="form-control" onChange={(e) => setQualification(e.target.value)} ref={register({ required: true })} id="education1" placeholder="Qualification"></input>
                                {errors.education && <p style={{ color: "red" }}>Please mention Your Qualification.</p>}
                            </div>
                            <div className="form-group">
                                <label for="Bio">
                                    <b>Bio</b>
                                </label>
                                <input type="text" name="bio" className="form-control" onChange={(e) => setBio(e.target.value)} ref={register({ required: true })} id="Bio" placeholder="About yourself"></input>
                                {errors.bio && <p style={{ color: "red" }}>We want to know about you.</p>}
                            </div>

                            <div class="form-group">
                                <label for="speciality">
                                    <b>Specialisation</b>
                                </label>
                                <select className="form-control" name="specialisation" onChange={(e) => setSpecialisation(e.target.value)} ref={register({ required: true })} id="speciality" >
                                    <option value="" disabled selected>Please select</option>
                                    {speciality.map((sp) => (
                                        <option key={sp.speciality} value={sp.speciality}>{sp.speciality}</option>
                                    ))}
                                </select>
                                {errors.specialisation && <p style={{ color: "red" }}>Please select your speciality.</p>}
                            </div>

                            <div className="form-group">
                                <div class="form-group">
                                    <label for="License">
                                        <b>License No</b>
                                    </label>
                                    <input type="text" className="form-control" name="LicenseNo" onChange={(e) => setLicense(e.target.value)} ref={register({ required: true })} id="LicenseNo" placeholder="License No."></input>
                                    {errors.LicenseNo && <p style={{ color: "red" }}>Please mention Your license No.</p>}
                                </div>
                                <div class="form-group">
                                    <label for="hospital">
                                        <b>Hospital</b>
                                    </label>
                                    <input type="text" className="form-control" name="hospital" onChange={(e) => setHospital(e.target.value)} ref={register({ required: true })} id="hospital" placeholder="Hospital Name"></input>
                                    {errors.hospital && <p style={{ color: "red" }}>Please mention hospital name.</p>}
                                </div>
                                <div className="form-group">
                                    <label for="address">
                                        <b>Address</b>
                                    </label>
                                    <textarea className="form-control" name="address" onChange={(e) => setAddress(e.target.value)} ref={register({ required: true })} id="address" placeholder="Enter address"></textarea>
                                    {errors.address && <p style={{ color: "red" }}>Please mention clinic address</p>}
                                </div>
                                <div className="form-group">
                                    <label for="langauge1">
                                        <b>Language</b>
                                    </label>
                                    <Select
                                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                                        onChange={(e) => { setLangauge([...e]); handleChange(e) }}

                                        value={language}
                                        isMulti
                                        name="language1"
                                        options={colourOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select language"
                                        ref={register({ required: true })} id="language"
                                    />

                                    <span style={{ display: 'inline-block', width: 20 }} />
                                    {errors.language && <p style={{ color: "red" }}>Your language</p>}
                                </div>

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
                                <div className="form-group">
                                    <label for="fees">
                                        <b>Fee</b>
                                    </label>
                                    <input type="number" name="fees" className="form-control" onChange={(e) => setFees(e.target.value)} ref={register({ required: true })} id="fees" placeholder="How much You Charge"></input>
                                    {errors.fees && <p style={{ color: "red" }}>How much you charge?</p>}
                                </div>

                            </div>

                            <button type="submit" className="btn btn-warning">
                                <b>Submit</b>
                            </button>

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


export default withRouter(DoctorRegistration)