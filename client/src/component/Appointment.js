import React from 'react'
import Navbar from './Landing page/Navbar'
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom'
import { selectDoctor } from '../actionCreators/doctorAction'
import { patientBooking } from '../actionCreators/patientAction'
import Footer from '../component/Landing page/Footer'
class Appointment extends React.Component {
    constructor(props) {
        super(props)
        this.props.patientBooking()
    }
    state = {
        date: new Date(),
        calDate: new Date()
    }
    timeSlot = {
        slot_1: "10:00AM - 10:30AM",
        slot_2: "11:00AM - 11:30AM",
        slot_3: "12:00AM - 12:30PM",
        slot_4: "4:00PM - 4:30PM",
        slot_5: "5:00PM - 5:30PM",
        slot_6: "6:00PM - 6:30PM"
    }
    buttonSlot = {
        slot_1: { startHour: 10, endHour: 10, startMin: 0, endMin: 59 },
        slot_2: { startHour: 11, endHour: 11, startMin: 0, endMin: 30 },
        slot_3: { startHour: 12, endHour: 12, startMin: 0, endMin: 30 },
        slot_4: { startHour: 16, endHour: 16, startMin: 0, endMin: 30 },
        slot_5: { startHour: 17, endHour: 17, startMin: 0, endMin: 30 },
        slot_6: { startHour: 18, endHour: 18, startMin: 0, endMin: 30 }
    }


    onChange = date => {
        this.setState({
            calDate: date
        })
    }

    myDoc = (id) => {
        this.props.selectDoctor(id)
    }
    componentDidMount() {
        setInterval(
            () => this.setState({ date: new Date() }),
            1000
        );
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <br />
                    <div className="row border border-warning">
                        <div className="col-4 mt-2 mb-2">
                            <Calendar onChange={this.onChange} value={this.state.calDate} minDate={new Date()} locale />
                        </div>
                        <div className="col-5 mt-2 mb-2">
                            <hr />
                            <h6 className="text-center">Today's Appointment</h6>
                            <hr />
                            {
                                this.props.patientDetails.map((item, index) => {
                                    if (item.date === this.state.calDate.toLocaleDateString()) {
                                        return (
                                            <div key={"my" + index}>
                                                <div class="card">
                                                    <h5 class="card-header" style={{ color: "red" }}>{this.timeSlot[item.slot]}</h5>
                                                    <div class="card-body">
                                                        <button type="button" class="btn btn-outline-warning" onClick={() => { this.myDoc(item.docId) }} data-toggle="modal" data-target=".bd-example-modal-lg">
                                                            Your Doctor
                                                        </button>
                                                        {(this.buttonSlot[item.slot].startHour === this.state.date.getHours() &&
                                                            this.buttonSlot[item.slot].startMin <= this.state.date.getMinutes() &&
                                                            this.buttonSlot[item.slot].endMin >= this.state.date.getMinutes()) ?
                                                            <a href={"/videocall/" + item.patId} target="_blank" class="btn btn-warning float-right"><b>Join</b></a> :
                                                            <a href={"/videocall/" + item.patId} target="_blank" class="btn btn-outline-danger float-right disabled"><b>Join</b></a>

                                                        }

                                                       
                                                            
                                                    </div>
                                                </div>

                                            </div>

                                        )
                                    } else { return false }
                                })
                            }

                        </div>
                        <div className="col-3 mt-2 mb-2 pt-1">
                            <Clock className="mx-auto mt-5" value={this.state.date} />
                        </div>

                    </div>

                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Hey Doctor!!</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-5 mx-auto">
                                            <img src={this.props.doc.image} style={{ height: "150px", width: "150px" }} alt="Doctor" />
                                        </div>
                                        <div className="col-7">
                                            <div class="card" style={{ width: "22rem" }}>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item"><b>Name: </b>{this.props.doc.name}</li>
                                                    <li class="list-group-item"><b>Email: </b>{this.props.doc.email}</li>
                                                    <li class="list-group-item"> <b>Fee: </b>{this.props.doc.fees}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                        <hr />
                                        <b>About : </b> {this.props.doc.bio}
                                        <hr />
                                        <b>Gender : </b> {this.props.doc.gender}
                                        <hr />
                                        <b>Language : </b> {this.props.doc.language}
                                        <hr />
                                        <b>specialisation : </b> {this.props.doc.specialisation}
                                        <hr />
                                        <b>City : </b> {this.props.doc.city}
                                </div>
                            </div>
                        </div>
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
    return {
        patientDetails: state.patient.patientData,
        doc: state.doctor.selecteddoctor
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ patientBooking, selectDoctor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Appointment))