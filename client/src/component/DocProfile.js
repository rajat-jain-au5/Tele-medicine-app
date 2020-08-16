import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Navbar from './Landing page/Navbar'
import Footer from './Landing page/Footer';
function DocProfile() {
      const { register, handleSubmit, errors } = useForm();
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [hospital, setHospital] = useState("")
      const [address, setAddress] = useState("")
      const [fees, setFees] = useState("")
      const [bio, setBio] = useState("")
      const [image, setImage] = useState("")
      const token = localStorage.getItem("doctorAuth");
      useEffect(() => {
            getDoctor()
      }, [])
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
                  console.log(res)
                  setImage(res.data.url)
            })
      }
      const getDoctor = () => {

            let request = axios({
                  method: "GET",
                  url: "/getdoctor",
                  headers: {
                        "x-auth-token": token
                  },
            });
            request.then(res => {
                  // console.log(res)
                  setName(res.data.name)
                  setEmail(res.data.email)
                  setBio(res.data.bio)
                  setHospital(res.data.hospital)
                  setAddress(res.data.address)
                  setFees(res.data.fees)
            })
      }
      const docsave = (data) => {
            setTimeout(function () {
                  const doc = { name, email, image, bio, hospital, address, fees }
                  let request = axios({
                        method: "POST",
                        url: "/updateprofile",
                        data: doc,
                        headers: {
                              "x-auth-token": token
                        },
                  });
                  request.then(res => {
                        console.log(res)
                        // window.location.href="/profile"
                  })
            }, 5000);



      }
      return (
            <div>
                  <Navbar />
                  <div className="container mt-5">
                        <div className="row">

                              <h1 className="col-4 offset-md-3">Profile</h1>
                        </div>
                        <div className="row">
                              <div className="col-md-6 offset-md-3  p-3  rounded shadow">
                                    <form onSubmit={handleSubmit(docsave)}>
                                          <div className="form-group">
                                                <label for="userName">
                                                      <b>Name</b>
                                                </label>
                                                <input type="text" name="name" value={name} disabled className="form-control" onChange={(e) => setName(e.target.value)} ref={register({ required: true })} id="userName" aria-describedby="emailHelp" placeholder="Enter name"></input>
                                                {errors.name && <p style={{ color: "red" }}>Please Enter Your Name</p>}
                                          </div>
                                          <div className="form-group">
                                                <label for="userEmail"><b>Email address</b></label>
                                                <input type="text" name="email" disabled value={email} className="form-control" id="userEmail"
                                                      aria-describedby="emailHelp" ref={register({ required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ })} placeholder="Enter email"></input>
                                                {errors.email && <p style={{ color: "red" }}>Please enter valid E-mail</p>}
                                          </div>
                                          <div className="form-group">
                                                <label for="image1">
                                                      <b>Select Your Image</b>
                                                </label>
                                                <input type="file" name="image" className="form-control" onChange={(e) => uploadPic(e.target.files[0])} id="image1"></input>
                                                {/* {errors.image && <p style={{color : "red"}}>Share your Image</p>} */}
                                          </div>
                                          <div className="form-group">
                                                <label for="Bio">
                                                      <b>Bio</b>
                                                </label>
                                                <input type="text" name="bio" className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} ref={register({ required: true })} id="Bio" placeholder="About yourself"></input>
                                                {errors.bio && <p style={{ color: "red" }}>We want to know about you.</p>}
                                          </div>
                                          <div class="form-group">
                                                <label for="hospital">
                                                      <b>Hospital</b>
                                                </label>
                                                <input type="text" className="form-control" value={hospital} name="hospital" onChange={(e) => setHospital(e.target.value)} ref={register({ required: true })} id="hospital" placeholder="Hospital Name"></input>
                                                {errors.hospital && <p style={{ color: "red" }}>Please mention hospital name.</p>}
                                          </div>
                                          <div className="form-group">
                                                <label for="address">
                                                      <b>Address</b>
                                                </label>
                                                <textarea className="form-control" name="address" value={address} onChange={(e) => setAddress(e.target.value)} ref={register({ required: true })} id="address" placeholder="Enter address"></textarea>
                                                {errors.address && <p style={{ color: "red" }}>Please mention clinic address</p>}
                                          </div>
                                          <div className="form-group">
                                                <label for="fees">
                                                      <b>Fee</b>
                                                </label>
                                                <input type="number" name="fees" className="form-control" value={fees} onChange={(e) => setFees(e.target.value)} ref={register({ required: true })} id="fees" placeholder="How much You Charge"></input>
                                                {errors.fees && <p style={{ color: "red" }}>How much you charge?</p>}
                                          </div>
                                          <button type="submit" className="btn btn-warning">
                                                <b>Update</b>
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

export default DocProfile