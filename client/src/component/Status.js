import React from 'react'
import $ from 'jquery'
import Navbar from './Landing page/Navbar'
import Footer from './Landing page/Footer'
import failed from '../images/failed.png'

class Status extends React.Component {
   
    result = () => {
        let url = window.location.pathname
        let urlId = url.split('/');
        if (urlId[2] === 'success') {
            return (
                <div className="card mx-auto mt-3" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={failed} alt="Card cap" />
                    <div className="card-body">
                        <h3 className="card-text">Registered Successfully.</h3>
                        <br />
                        <hr />
                        <p>Please Login</p>
                    </div>
                </div>
            )

        }
        if (urlId[2] === 'present') {
            return (
                <div className="card mx-auto mt-3" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={failed} alt="Card cap" />
                    <div className="card-body">
                        <h3 className="card-text">User is Already Present!!</h3>
                        <br />
                        <hr />
                    </div>
                </div>
            )

        }
        if (urlId[2] === 'expired') {
            return (
                <div className="card mx-auto mt-3" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={failed} alt="Card cap" />
                    <div className="card-body">
                        <h3 className="card-text">Link is Expired!!</h3>
                        <br />
                        <hr />
                        <p>Please try Again.</p>
                    </div>
                </div>
            )

        }
        if (urlId[2] === 'nouser') {
            return (
                <div className="card mx-auto mt-3" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={failed} alt="Card cap" />
                    <div className="card-body">
                        <h3 className="card-text">No User found!!</h3>
                        <br />
                        <hr />
                        <p>Please Regiser</p>
                    </div>
                </div>
            )

        }
        if(urlId[2] === 'newpassword'){
            return (
                <div className="card mx-auto mt-3" style={{ width: "25rem" }}>
                    <img className="card-img-top" src={failed} alt="Card cap" />
                    <div className="card-body">
                        <h3 className="card-text">Password Successfully Set!!</h3>
                        <br />
                        <hr />
                        <p>Please Login</p>
                    </div>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <Navbar />
                {
                    (() => {
                        $("body").removeClass("modal-open");
                        $("div.modal-backdrop").remove();
                    })()
                }
                {
                    this.result()
                }
                <Footer />
            </div>
        )
    }
}


export default Status