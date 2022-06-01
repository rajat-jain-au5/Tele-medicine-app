import React, { Component } from "react";


export default class Guide extends Component {

  render() {
    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col s12 l4 mt-5">
                <img
                data-aos="fade-right"
                className="guide"
                  src={require("../../images/4-1.png")}
                  style={{width: "380px", height:"284px "}}
                  alt=""
                />
              </div>
              <div className="col s12 l6 offset-l1 mt-5">
                <h4 class="indigo-text text-darken-4">Lord Byron</h4>
                <p>
                  “Always laugh when you can, it is cheap medicine.”
              </p>
              </div>
            </div>
            <div className="row">
              
              <div className="col s12 l6 offset-l1 mt-5">
                <h4 class="indigo-text text-darken-4">Luther Burbank</h4>
                <p>
                  
                  “Flowers always make people better, happier, and more helpful; they are sunshine, food and medicine to the mind.”
                  
              </p>
              </div>
              <div className="col s12 l4 mt-5">
                <img
                  className="guide"
                  data-aos="fade-left"
                  style={{width: "380px", height:"284px", marginLeft:"70px"}}
                  src={require("../../images/4.png")}
                  alt=""
                />
              </div>
            </div>
            
          </div>

        </section>
        {/* <section class="container section scrollspy" id="photos">
          <div class="row">
            <div class="col s12 l4">
              <img
                src={require("../../images/4.jpg")}
                alt=""
                class="responsive-img materialboxed"
              />
            </div>
            <div class="col s12 l6 offset-l1">
              <h4 class="indigo-text text-darken-4">Albert Einstein</h4>
              <p>
                The only thing you absolutely have to know is the location of
                the library.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col s12 l4 offset-l1 push-l7">
              <img
                src={require("../../images/3.jpg")}
                alt=""
                class="responsive-img materialboxed"
              />
            </div>
            <div class="col s12 l6 offset-l1 pull-l5 right-align">
              <h4 class="indigo-text text-darken-4">Precious C Okolo</h4>
              <p>
                I would pick a Good book Over an Interesting movie. Any time.
                Any day.
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col s12 l4">
              <img
                src={require("../../images/3.jpg")}
                alt=""
                class="responsive-img materialboxed"
              />
            </div>
            <div class="col s12 l6 offset-l1">
              <h4 class="indigo-text text-darken-4">Dr. Seuss​​</h4>
              <p>
                The more that you read, the more things you will know. The more
                that you learn, the more places you'll go.
              </p>
            </div>
          </div>
        </section> */}
      </div>
    );
  }
}
