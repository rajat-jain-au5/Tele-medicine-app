import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './Landing page/Navbar'
import failed from '../images/failed.png'
import { connect } from 'react-redux'


class Payment extends React.Component {
    success = () => {
        return (
            <div>
                <div className="card mx-auto mt-5" style={{width: "18rem"}}>
                        <img className="card-img-top" src={this.props.docInfo.image} alt="Card cap" />
                        <div className="card-body">
                            <h5 className="card-title text-center">Booking Successful!!</h5>
                            <b>Name: </b> {this.props.docInfo.name}<br />
                            <b>Hospital: </b>{this.props.docInfo.hospital}<br />
                            <b>Fee: </b>{this.props.docInfo.fees}
                        </div>
                </div>
                <hr></hr>
                    <h5 className="text-center">We have sent you a Mail regarding your Booking</h5>
                <hr></hr>
            </div>
        )
    }

    failed = () => {
        return (
            <div>
                    <div className="card mx-auto mt-5" style={{width: "18rem"}}>
                        <img className="card-img-top" src={failed} alt="Card cap" />
                        <div className="card-body">
                            <h5 className="card-title text-center">Booking Failed!!</h5>
                            <h5 className="card-title text-center">Pleaser try again.</h5>
                        </div>
                    </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row bg-secondary mt-2">
                        <div className="col-6 pt-3 pb-2">
                            <p className="text-center">
                                <a href="/home" class="btn btn-outline-warning btn-lg" role="button" aria-pressed="true">Home</a>
                            </p>
                        </div>
                        <div className="col-6 pt-3 pb-2">
                            <p className="text-center">
                                <a href="/appointments" class="btn btn-outline-warning btn-lg" role="button" aria-pressed="true">My Booking</a>
                            </p>
                        </div>
                    </div>

                    {this.props.bookingStatus ? this.success() : this.failed()}

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Payment 35", state)
    return {
        bookingStatus: state.doctor.cBooking.status,
        docInfo: state.doctor.selecteddoctor
    }

}
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ docSlott, selectDoctor }, dispatch)
// }

export default connect(mapStateToProps)(withRouter(Payment))