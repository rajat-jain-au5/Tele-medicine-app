import React, { Component } from 'react'
import logo from '../../images/logo1.png'

class Footer extends Component {
      render() {
            return (
                  <div className="footer">
                        <hr />
                        <div className="container-fluid">
                              <div className="row">
                                    <div className="col-lg-2 mt-5">

                                          <ul className="first">
                                                <h4 className="text-dark">Arogya</h4>
                                                <li >About</li>
                                                <li>Blog</li>
                                                <li>Careers</li>
                                                <li><a href="/contactus">Contact Us</a></li>

                                          </ul>
                                    </div>
                                    <div className="col-lg-2 mt-5">

                                          <ul className="first">
                                                <h4 className="text-dark">Platform</h4>
                                                <li >Platform Overview</li>

                                                <li>Advantage</li>
                                                <li>primary Care</li>
                                                <li>Speciality Care</li>
                                                <li>Request Demo</li>
                                          </ul>
                                    </div>
                                    <div className="col-lg-2 mt-5">

                                          <ul className="first">
                                                <h4 className="text-dark">For Patients</h4>
                                                <li >Search for Doctors</li>
                                                <li >Search for Hospitals</li>
                                                <li >Book Health checkup</li>
                                                <li >Book Appointments</li>
                                          </ul>
                                    </div>
                                    <div className="col-lg-2 mt-5">

                                          <ul className="first">
                                                <h4 className="text-dark">For Doctors</h4>
                                                <li >Arogya Profile</li>
                                                <li>Data Security</li>
                                                <li>Verified Patients</li>

                                          </ul>
                                    </div>
                                    <div className="col-lg-1 mt-5">

                                    </div>
                                    <div className="col-lg-2 mt-5">
                                          <h4 className="text-dark"><img src={logo} style={{ height: "100%", width: "100%" }} alt=""/> </h4>
                                          <div className="social-icon">
                                                <a href="#"><i class="fab fa-instagram fa-2x"></i></a>
                                                <a href="#"><i class="fab fa-facebook fa-2x"></i></a>
                                                <a href="#"><i class="fab fa-twitter fa-2x"></i></a>
                                          </div>

                                    </div>
                              </div>
                        </div>
                        <h3 className="text-center">Arogya</h3>
                        <p className="text-center">Copyright © 2020, Arogya. All rights reserved.</p>
                  </div>

            )
      }
}
export default Footer