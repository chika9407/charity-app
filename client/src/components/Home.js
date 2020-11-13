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
  logout = async () => {
    try {
      localStorage.setItem("token", "");
      this.props.history.push(`/search`);
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <div className="container-xl">
        <div className="row mt-4 text-white">Welcome to the Charity App</div>

        <div className="row">
          <div className="col-7"></div>
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
                <a href="/Register" class="btn btn-primary mt-2 shadow">
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Log OUT .................*/}
        <div className="text-right mt-3">
          <button className=" btn btn-dark" onClick={this.logout}>
            Sign out
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
