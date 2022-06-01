import React, { Component } from "react";
import Navbar from "./Landing page/Navbar";
import Footer from './Landing page/Footer'
import "../App.css";
import Speciality from '../speciality.json'
import { searchSpeciality } from '../actionCreators/doctorAction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import axios from "axios"
import $ from 'jquery'




class Dashboard extends Component {
  state = {
    doctors: [],
    searchTerm: ""
  }
  handleSearch = (sp) => {

    this.props.searchSpeciality(sp)

    this.props.history.push(`/doctorprofile/${sp}`)
  }
  getSearchByName = (val) => {
    // console.log(val)
    this.setState({
      searchTerm: val
    })
    axios
      .get(`http://localhost:3010/doctorname/${val}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("patientAuth"),
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        this.setState({
          doctors: data
        })
      })
      .catch(({ err }) => {
        console.log(err);
      });

  }
  render() {
    // console.log(special)
    return (
      <div>
        <Navbar />
        {
                    (() => {
                        $("body").removeClass("modal-open");
                        $("div.modal-backdrop").remove();
                    })()
        }

        <div className="container-fluid">

          <div className="row banner">
            <div className="col-7">
              <div className="main">
                <h3>Book Video Consultation With Your Doctor</h3>
                <br />
                <div class="form-group has-search">
                  <span class="fa fa-search form-control-feedback"></span>
                  <input type="text" class="form-control" placeholder="Search" onChange={(e) => this.getSearchByName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="col-5 main">
               <a href="/appointments" class="btn btn-warning btn-lg" role="button" aria-pressed="true"><b>My Appointment</b></a>
            </div>

          </div>
          <div className="row mt-5">
            {this.state.searchTerm === "" ? "" :

              this.state.doctors.map((doc, index) => (
                <div className="col-md-4">
                  <div className="card shadow" style={{ width: "30rem" }}>
                    <div class="card-body">
                      <div className="row" key={index}>
                        <div className="col-md-3">
                          <img className="rounded-circle" src={doc.image} alt="" width="70" height="70" />
                        </div>
                        <div className="col-md-8">
                          <h5 className="card-title">{doc.name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">{doc.qualification}</h6>
                          <p className="card-subtitle">{doc.specialisation}</p>
                          <p className="card-text"><span className="text-muted">License No</span>:{doc.LicenseNo}<br />
                            <span className="text-muted">Langauge</span>:{doc.langauge}<br />
                            <span className="text-muted">Hospital</span>:{doc.hospital}</p>

                          <button className="btn btn-outline-success" style={{ borderRadius: 20 }}>Book Appointment</button>

                        </div>
                      </div>


                    </div>
                  </div>
                  <br />
                </div>
              ))
            }
          </div>

          <div className="row mt-5">
            {Speciality.map((sp) => (
              <div className="col-md-4">
                <button onClick={() => this.handleSearch(sp.speciality)} className="speciality">
                  <img
                    src={sp.image}
                    alt="Cardiology"
                    width="50px"
                    height="50px"
                    className="float-left"
                  />
                  <span>{sp.speciality}</span>
                </button>
              </div>
            ))}

          </div>
        </div>
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchSpeciality }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
