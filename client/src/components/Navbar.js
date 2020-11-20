import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
  logout = async () => {
    try {
      localStorage.removeItem("token");
      this.props.history.push(`/`);
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    return (
      <nav className=" navbar border border-secondary navbar-expand-lg navbar-light bg-warning">
        <NavLink className=" nav-item nav-link" to="/">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search for Charities
              </NavLink>
            </li>

            <li className="nav-item  ">
              <NavLink className="nav-link" to="/favorite">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item  ">
              <NavLink className="nav-link" to="/map">
                Map
              </NavLink>
            </li>
            <li className="nav-item  ">
              <NavLink className="nav-link" to="/Data">
                Data Snapshot
              </NavLink>
            </li>
          </ul>
          <form className="form-inline ml-auto my-2 my-lg-0 ">
            <NavLink className="btn btn-Warning" to="/" onClick={this.logout}>
              Sign out
            </NavLink>
          </form>
        </div>
      </nav>
    );
  }
}
