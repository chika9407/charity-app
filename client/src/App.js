import "./App.css";
import React, { Component, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Favorite from "./components/Favorite";
import About from "./components/About";
import Search from "./components/Search";
import Home from "./components/Home";
import api from "./components/api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_input: "",
      theme_input: "",
    };
  }

  /*componentDidMount() {
    // let country_input = "IN";
    // let themeId = "edu";
    //api.getProjects();
    //api.getProjectsByCountry(country_input);
    //api.getAllThemesByName();
    // api.getProjectsByTheme(themeId);
    // api.getAllRegions();
  }*/

  render() {
    return (
      <div className="Background1">
        <Router>
          <div>
            <nav className="navbar  navbar-expand-lg navbar-light bg-warning">
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
                    <NavLink className="nav-link" to="/about">
                      About us
                    </NavLink>
                  </li>
                  <li className="nav-item  ">
                    <NavLink className="nav-link" to="/favorite">
                      Favorite
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>

            <Switch>
              <Route path="/favorite" component={Favorite}>
                <Favorite />
              </Route>
              <Route path="/search" component={Search}>
                <Search />
              </Route>
              <Route path="/about">
                <About />
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
