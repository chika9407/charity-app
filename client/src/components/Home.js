import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "test",
      password: "test",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //.........................
  login = async () => {
    const { username, password } = this.state;
    try {
      const results = await axios.post("/users/login", { username, password });
      console.log(results.data);

      localStorage.setItem("token", results.data.token);
      this.props.history.push(`/favorite`);
    } catch (err) {
      console.log(err.message);
      this.props.history.push(`/register`);
    }
  };

  //.........................

  render() {
    return (
      <div className="container-xl">
        <div className="row mt-5">
          <div className="col-5">
            <div className="card shadow-lg">
              <h5 className="card-header">
                Welcome to Your Global Charity Finder!
              </h5>
              <div className="card-body">
                <h6 className="card-title "> Find your perfect charity</h6>
                <p className="card-text">
                  This site uses the{" "}
                  <a className="card-text" href="https://www.globalgiving.org/">
                    GlobalGiving API
                  </a>{" "}
                  to get up to date information on charities around the world
                  and lets you filter them according to your needs.
                </p>
                <p className="card-text mb-3">
                  Sign In to save your favorite charities and donate to them
                  whenever you like.
                </p>
              </div>
            </div>
          </div>
          <div className="col"></div>
          {/* Log IN ................................. */}
          <div className="col">
            <div className="card">
              <h5 className="card-header">Sign into Giving</h5>
              <div className="card-body">
                <input
                  value={this.state.username}
                  onChange={this.handleChange}
                  name="username"
                  type="text"
                  className="form-control mb-2"
                  placeholder="Your name"
                />
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  className="form-control mb-2"
                  placeholder="Your Password"
                />
                <button className=" btn btn-primary" onClick={this.login}>
                  Sign In
                </button>
              </div>
            </div>
            {/* Register...........................*/}
            <div className="card mt-3">
              <h5 className="card-header">Not a member?</h5>
              <div className="card-body">
                <a href="/Register" className="btn btn-primary mt-2 shadow">
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Log OUT .................*/}

        {/* FaceBook .................
        <div className="text-right text-white mt-3 ">
          {" "}
          Or sign in with FaceBook
          <a href="/auth/facebook" className="btn btn-primary">
            <span></span> Facebook
          </a>
        </div> */}
      </div>
    );
  }
}

export default withRouter(Home);
