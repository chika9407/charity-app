import "./App.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Favorite from "./components/Favorite";
import Search from "./components/Search";
import Home from "./components/Home";
import Register from "./components/Register";
import Donate from "./components/Donate.js";
import Paypal from "./components/Paypal";
import MapContainer from "./components/MapContainer";
import Scatterplot from "./components/Scatterplot";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_input: "",
      theme_input: "",
    };
  }

  logout = async () => {
    try {
      localStorage.setItem("token", "");
      this.props.history.push(`/`);
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    return (
      <div className="Background1">
        <Router>
          <div>
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
                      Favorites
                    </NavLink>
                  </li>
                  <li className="nav-item  ">
                    <NavLink className="nav-link" to="/map">
                      Map
                    </NavLink>
                  </li>
                  <li className="nav-item  ">
                    <NavLink className="nav-link" to="/Data">
                      Scatterplot
                    </NavLink>
                  </li>
                </ul>
                <form className="form-inline ml-auto my-2 my-lg-0 ">
                  <NavLink
                    className="btn btn-Warning"
                    to="/"
                    onClick={this.logout}
                  >
                    Sign out
                  </NavLink>
                </form>
              </div>
            </nav>

            <Switch>
              <Route path="/favorite" component={Favorite}>
                <Favorite />
              </Route>

              <Route path="/search" component={Search}>
                <Search />
              </Route>

              <Route path="/map" component={MapContainer}>
                <MapContainer />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/donate">
                <Donate />
              </Route>

              <Route path="/Paypal">
                <Paypal />
              </Route>
              <Route path="/Data">
                <Scatterplot />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
