import React from 'react';
import { connect } from 'react-redux'
import $ from 'jquery'
import Navbar from './Landing page/Navbar'
import Calendar from 'react-calendar';
import Clock from 'react-clock';
import 'react-calendar/dist/Calendar.css';
import { bindActionCreators } from "redux";
import { docBooking } from '../actionCreators/doctorAction'
import { withRouter, Link } from 'react-router-dom'
import Footer from './Landing page/Footer';

class DocBooking extends React.Component {
   constructor(props) {
        super(props)
       
        let date = new Date()
        this.props.docBooking(date.toLocaleDateString())
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
        slot_1: {startHour : 10, endHour: 10, startMin: 0, endMin: 30},
        slot_2: {startHour : 11, endHour: 11, startMin: 0, endMin: 30},
        slot_3: {startHour : 12, endHour: 12, startMin: 0, endMin: 30},
        slot_4: {startHour : 16, endHour: 16, startMin: 0, endMin: 30},
        slot_5: {startHour : 17, endHour: 17, startMin: 0, endMin: 30},
        slot_6: {startHour : 18, endHour: 18, startMin: 0, endMin: 30}
    }

    state = {
        id:"",
        date: new Date(),
        dateCal : new Date()
      }
     
      componentDidMount() {
        setInterval(
          () => this.setState({ date: new Date() }),
          1000
        );

    // const token = localStorage.getItem("doctorAuth")
    // const payload = JSON.parse(atob(token.split(".")[1]));
    // this.setState({
    //     id:payload.id
    // })
         
      }
      onChange = dateCal => {
        this.setState({ dateCal },
            () => {
                this.props.docBooking(this.state.dateCal.toLocaleDateString())
            }
            )
           
    }
    
    render() {
        // console.log(this.props)
        
        return (
            <div>
                <Navbar />
                {
                    (() => {
                        $("body").removeClass("modal-open");
                        $("div.modal-backdrop").remove();
                    })()
                }
                <div className="container mt-3">
                    <div className="row border border-warning">
                        <div className="col-6">
                            <Calendar onChange={this.onChange} value={this.state.dateCal} locale />
                        </div>
                        <div className="col-6">
                            <Clock value={this.state.date}  />
                        </div>
                    
                    </div>

                
                            
                    <div className="row border border-primary ">
                        <div className="col-5">
                      
                        </div>

                    
                        <div className="col-7">
                            
                            {
                                Object.entries(this.props.myBooking).map(([key, value], index) => {
                                    if (value.status === "true") {
                                        return (
                                            <div class="card m-3 w-40" key={'docBooking'+index}>
                                                <div class="card-header">
                                                    <b>{value.name}</b>
                                                    <h6 className="float-right" style={{ color: "red" }}>{this.timeSlot[key]}</h6>
                                                </div>
                                                <div class="card-body">
                                                    <p className="card-text"><b>Gender: </b> {value.gender} <b>Age: </b> {value.age}</p>
                                                    <p className="card-text"><b>Contact Details: </b> {value.email} <b>Mob: </b>{value.mobile}</p>
                                                    <p class="card-text"><b>City: </b> {value.city} <b>State: </b> {value.state}</p>

                                                    <p>{(this.buttonSlot[key].startHour === this.state.date.getHours() && 
                                                        this.buttonSlot[key].startMin <= this.state.date.getMinutes() && 
                                                        this.buttonSlot[key].endMin >= this.state.date.getMinutes()) ? 
                                                        <Link to={`/videocall/${value.patientId}`} target="_blank" className="btn btn-warning btn-lg active"  aria-pressed="true"><b>Join</b></Link> :
                                                         <Link to="#" className="btn btn-outline-danger btn-lg disabled"  aria-pressed="true"><b>Join</b></Link> }</p>
                                                    {/* <Link to={`/videocall/${value.patientId}`} target="_blank" className="btn btn-warning btn-lg active" aria-pressed="true"><b>Join</b></Link> */}
                                                </div>

                                            </div>


                                        )
                                    } else { return false }
                                })
                            }
                        </div>

                        </div>
                </div>
                <div className="mt-5">
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("gdgf", state.doctor.booking)
    return {
        myBooking: state.doctor.booking
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ docBooking }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocBooking))
