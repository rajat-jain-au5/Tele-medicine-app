import React from "react";
import '../App.css'
class Splash extends React.Component {
  render() {
    return (
      <div class="card splash">
        <div className="container">
          <div className="circle">
            <img  style={{borderRadius:"100px"}} src={require('../images/23.png')} alt="" width="100px" height="100px"/>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Splash;
