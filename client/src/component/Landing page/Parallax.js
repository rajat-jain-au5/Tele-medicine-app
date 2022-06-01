import React, { Component } from 'react'
import Typical from 'react-typical'
import CountUp from 'react-countup';
import '../../App.css'
import Guide from './guide'
import Aos from 'aos'
import 'aos/dist/aos.css'
export default class Parallax extends Component {
      componentDidMount = () => {
            Aos.init({ duration: 2000 })
      }
      render() {
            return (
                  <div className="test">
                        <div className="parallax">
                              <div className="typical"> 
                                    <h2><Typical
                                          loop={Infinity}
                                          wrapper="h2"
                                          steps={
                                                [
                                                      'Arogya',
                                                      2000,
                                                      'Exceptional Care close to You',
                                                      2000
                                                ]
                                          }
                                    /></h2>
                              </div>

                              <div data-aos="flip-up" style={{width: "400px", height:"150px",paddingLeft:"40px",marginLeft: "40px", marginTop : "150px", backgroundColor: "#BC9A39"}}>
                                    <div className="row m-3">
                                          <div className="col-8">
                                                <img src="https://www.practo.com/consult/static/images/top-speciality-pediatric.svg"/>
                                                <h2 className="mx-auto">Happy Users</h2></div>
                                          <div className="col-4 mt-1">
                                                <h3 className="mt-5">
                                                <CountUp start={12000}
                                                                  end={14485} duration={4}/>
                                                </h3>
                                                
                                          </div>
                                    </div>
                              </div>

                        </div>

                        <div className="parallax1">
                              <Guide />
                        </div>
                  </div>
            )
      }
}
