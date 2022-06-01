import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import SliderComponent from './slider'
import Parallax from './Parallax'

class Register extends Component {
      render() {
            
            return (
                  <div>
                        <Navbar/>
                        <Parallax/>
                        <br />
                        <hr />
                        <h5 className="text-center">What our Users have to say</h5>
                        <hr />
                        <SliderComponent />
                        <Footer/>
                  </div>
            )
      }
}

export default Register