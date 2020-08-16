import React, { Component } from "react";

export default class Contact extends Component {
  render() {
    return (
      <div>
        {/* <!-- contact form --> */}
        <section className="container mt-5">
          <div class="row">
            <div class="col-md-6">
              <h2>Get in Touch</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum at lacus congue, suscipit elit nec, tincidunt orci.
              </p>
              <p>
                Mauris dolor augue, vulputate in pharetra ac, facilisis nec
                libero. Fusce condimentum gravida urna, vitae scelerisque erat
                ornare nec.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum at lacus congue, suscipit elit nec, tincidunt orci.
              </p>
              <p>
                Mauris dolor augue, vulputate in pharetra ac, facilisis nec
                libero. Fusce condimentum gravida urna, vitae scelerisque erat
                ornare nec.
              </p>
            </div>
            <div class="col-md-6">
              <form>
                <div>
                  <label htmlfor="email"> Email</label>
                  <input className="form-control" type="email" id="email" placeholder="enter Email"/>
                </div>
                <div>
                  <label htmlfor="message">Message</label>
                  <textarea
                  className="form-control"
                  ></textarea>
                 
                </div>
              <br/>
               
                <div>
                  <button class="btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
