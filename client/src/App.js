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
    this.state = {};
  }

  componentDidMount() {
    api.getProjects();
  }

  render() {
    return <div>works.</div>;
  }
}
