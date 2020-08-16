import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Navbar from './Landing page/Navbar'
import Footer from './Landing page/Footer'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { withRouter } from 'react-router-dom'
import { docSlott, bookSlot, selectDoctor } from '../actionCreators/doctorAction'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class BookAppointment extends React.Component {
    constructor(props) {
        super(props)
        let url = window.location.pathname
        let urlId = url.split('/');
        this.props.selectDoctor(urlId[2])
        let data_1 = new Date()
        this.props.docSlott(data_1, urlId[2])
    }


    state = {
        date: new Date(),
        slot: "",
        patientId: "",
        name: "",
        email: "",
        mobile: "",
        gender: "",
        age: "",
        state: "",
        city: ""
    }

    onChange = date => {
        this.setState({ date },
            () => {
                this.props.docSlott(this.state.date, this.props.myDoc._id)
            })
    }



    submit = (selectedSlot) => {
        let token = localStorage.getItem("patientAuth");
        let request = axios({
            method: "GET",
            url: "/getuser",
            headers: {
                "x-auth-token": token
            },
        });
        request.then((res) => {
            this.setState({
                slot: selectedSlot,
                patientId: res.data._id,
                name: res.data.name,
                email: res.data.email,
                mobile: res.data.mobile,
                gender: res.data.gender,
                age: res.data.age,
                state: res.data.state,
                city: res.data.city

            })
        })
        confirmAlert({
            title: 'Confirm Booking',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.bookSlot(this.props.myDoc._id, this.state)
                        this.props.history.push('/payment')
                    }
                },
                {
                    label: 'No',
                    //onClick: () => {}
                }
            ]
        })
    }

    render() {

        return (
            <div>
                <Navbar />

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div class="card" style={{width: "22rem"}}>
                                <div class="card-header text-center">
                                    <b>{this.props.myDoc.name}</b>
                                </div>
                                <ul class="list-group list-group-flush">
                                    
                                    <li class="list-group-item">
                                        <b>Qualification: </b><span> &nbsp;{this.props.myDoc.qualification}</span><br />
                                    </li>
                                    <li class="list-group-item">
                                        <b>Spaeciality:</b> <span> &nbsp;{this.props.myDoc.specialisation}</span><br />
                                    </li>
                                    <li class="list-group-item">
                                        <b>City: </b><span> &nbsp;{this.props.myDoc.city}</span><br />
                                    </li>
                                </ul>
                            </div>



                        </div>
                        <div className="col-md-4 text-center">
                            <img className="rounded" src={this.props.myDoc.image} style={{ width: "80%", height: "80%" }} alt="doc"></img>
                        </div>
                        <div className="col-md-4">

                        <div class="card" style={{width: "22rem"}}>
                                <ul class="list-group list-group-flush">
                                    
                                    <li class="list-group-item">
                                        <b>Bio: </b><span> &nbsp;{this.props.myDoc.bio}</span><br />
                                    </li>
                                    <li class="list-group-item">
                                        <b>Email: </b><span> &nbsp;{this.props.myDoc.email}</span><br />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
  
                    <hr></hr>
                    <h5 className="text-center">Book Appointment</h5>
                    <hr></hr>
                    <div className="row">
                        <div className="col-4">
                            <Calendar onChange={this.onChange} value={this.state.date} minDate={new Date()} locale />
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <p className="text-center"><b>Morning Slot</b></p>

                                    <p className="text-center" key="b_1">{
                                        (this.props.slot.slot_1.status === 'false') ? <button type="button" value="slot_1" onClick={(e) => { this.submit(e.currentTarget.value) }} class="btn btn-outline-success mb-3" ><b>10:00AM - 10:30AM</b></button> : <button type="button" class="btn btn-outline-danger mb-3" disabled><b>10:00AM - 10:30AM</b></button>
                                    }</p>

                                    <p className="text-center" key="b_2">{
                                        (this.props.slot.slot_2.status === 'false') ? <button type="button" value="slot_2" onClick={(e) => { this.submit(e.currentTarget.value) }} class="btn btn-outline-success mb-3" ><b>11:00AM - 11:30AM</b></button> : <button type="button" class="btn btn-outline-danger mb-3" disabled><b>11:00AM - 11:30AM</b></button>
                                    }</p>

                                    <p className="text-center" key="b_3">{
                                        (this.props.slot.slot_3.status === 'false') ? <button type="button" value="slot_3" onClick={(e) => { this.submit(e.currentTarget.value) }} class="btn btn-outline-success mb-3" ><b>12:00AM - 12:30PM</b></button> : <button type="button" class="btn btn-outline-danger mb-3" disabled><b>12:00AM - 12:30PM</b></button>
                                    }</p>


                                </div>
                                <div className="col-6">
                                    <p className="text-center"><b>Evening Slot</b></p>
                                    <p className="text-center" key="b_4">{
                                        (this.props.slot.slot_4.status === 'false') ? <button type="button" value="slot_4" onClick={(e) => { this.submit(e.currentTarget.value) }} class="btn btn-outline-success mb-3" ><b>4:00PM - 4:30PM</b></button> : <button type="button" class="btn btn-outline-danger mb-3" disabled><b>4:00PM - 4:30PM</b></button>
                                    }</p>

                                    <p className="text-center" key="b_5">{
                                        (this.props.slot.slot_5.status === 'false') ? <button type="button" value="slot_5" onClick={(e) => { this.submit(e.currentTarget.value) }} class="btn btn-outline-success mb-3" ><b>5:00PM - 5:30PM</b></button> : <button type="button" class="btn btn-outline-danger mb-3" disabled><b>5:00PM - 5:30PM</b></button>
                                    }</p>

                                    <p className="text-center" key="b_6">{
                                        (this.props.slot.slot_6.status === 'false') ? <button type="button" value="slot_6" onClick={(e) => { this.submit(e.currentTarget.value) }} class="btn btn-outline-success mb-3" ><b>6:00PM - 6:30PM</b></button> : <button type="button" class="btn btn-outline-danger mb-3" disabled><b>6:00PM - 6:30PM</b></button>
                                    }</p>


                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <br/>
               <div className="mt-5">
                   
                <Footer/>
               </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("asdfhh", state)
    return {
        myDoc: state.doctor.selecteddoctor,
        slot: state.doctor.docSlot
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ docSlott, selectDoctor, bookSlot }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookAppointment))