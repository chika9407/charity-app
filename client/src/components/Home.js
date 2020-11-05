import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="container-xl">
        <div className="row mt-4 text-white">
          Home Splash! page .... + login page?{" "}
        </div>

        <div className="row">
          <div className="col-7"></div>
          {/* spaceeee */}
          <div className="col">
            <div className="card">
              <h5 className="card-header">Sign into Giving</h5>
              <div className="card-body">
                <input
                  // value={this.state.username}
                  // onChange={this.handleChange}
                  name="username"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Your name"
                />
                <input
                  //value={this.state.password}
                  //onChange={this.handleChange}
                  name="password"
                  type="password"
                  className="form-control mb-2"
                  placeholder="Your Password"
                />
                <button className=" btn btn-primary" /*onClick={this.login}*/>
                  Sign In
                </button>
              </div>
            </div>
            {/* spaceeee */}
            <div className="card mt-3">
              <h5 className="card-header">Not a member?</h5>
              <div className="card-body">
                <input
                  // value={this.state.username}
                  // onChange={this.handleChange}
                  name="username"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Your name"
                />
                <input
                  //value={this.state.password}
                  //onChange={this.handleChange}
                  name="password"
                  type="password"
                  className="form-control mb-2"
                  placeholder="Your Password"
                />
                <button className=" btn btn-primary" /*onClick={this.login}*/>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* spaceeee*/}
        <div className="text-right mt-3">
          <button className=" btn btn-dark" /*onClick={this.logout}*/>
            Sign out
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
