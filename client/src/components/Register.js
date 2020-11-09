import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Register extends Component {
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

  addUser = () => {
    const { username, password } = this.state;

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);
        this.props.history.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container-xl">
        <div className="row mt-4 text-white">Registration Page </div>

        <div className="row">
          <div className="col-7"></div>

          {/* Register...........................*/}
          <div className="card mt-3">
            <h5 className="card-header">Not a member?</h5>
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
              <button className=" btn btn-primary" onClick={this.addUser}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
