import "./App.css";
//import Search from "./Search";
import React, { Component, useState, useEffect } from "react";
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";*/
//import axios from "axios";
import api from "./api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_input: "",
      theme_input: "",
    };
  }

  componentDidMount() {
    let country_input = "IN";
    let themeId = "edu";
    //api.getProjects();
    //api.getProjectsByCountry(country_input);
    //api.getAllThemesByName();
    api.getProjectsByTheme(themeId);
    api.getAllRegions();
  }

  render() {
    return <div>works.</div>;
  }
}
