import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Landing page/Navbar'
import Footer from './Landing page/Footer'
// import {selectDoctor} from '../actionCreators/doctorAction'
// import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom'

class SearchPage extends Component {
      myDoc = (id) => {
            //this.props.selectDoctor(id)
            this.props.history.push('/bookappointment/' + id)

      }
      render() {
            console.log(this.props.doctor.search);
            return (
                  <div>
                        <Navbar />
                        <div className="container-fluid mt-5">
                              <div className="row">


                                    {
                                          this.props.doctor.search.map((doc, index) => (
                                                <div className="col-md-4">
                                                      <div className="card " style={{ width: "30rem", height: "16rem" }}>
                                                            <div class="card-body">
                                                                  <div className="row" key={index}>
                                                                        <div className="col-md-3">
                                                                              <img className="rounded-circle" src={doc.image} alt="" width="70" height="70" />
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                              <h5 className="card-title">{doc.name}</h5>
                                                                              <h6 className="card-subtitle mb-2 text-muted">{doc.education}</h6>
                                                                              <p className="card-subtitle">{doc.specialisation}</p>
                                                                              <p className="card-text"><span className="text-muted">License No</span>:{doc.LicenseNo}<br />
                                                                                    <span className="text-muted">Langauge</span>:{
                                                                                          doc.language.map(option =>(
                                                                                                <span>{option}&nbsp;</span>
                                                                                           ) )
                                                                                    }<br />
                                                                                    <span className="text-muted">Hospital</span>:{doc.hospital}</p>

                                                                              <button type="button" className="btn btn-outline-success" style={{ borderRadius: 20 }} value={doc._id} onClick={(e) => { this.myDoc(e.target.value) }}>Book Appointment</button>

                                                                        </div>
                                                                  </div>


                                                            </div>
                                                      </div><br />
                                                </div>
                                          ))
                                    }
                              </div>

                        </div>
                        <div className="mt-5">
                              <Footer />
                        </div>
                  </div>


            )
      }
}


const mapStateToProps = (state) => {
      return state
}
// const mapDispatchToProps=(dispatch)=>{
//       return bindActionCreators({selectDoctor},dispatch)
//     }
export default connect(mapStateToProps)(withRouter(SearchPage))