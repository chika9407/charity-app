import './App.css';
import Search from './Search';
import React, { Component, useState, useEffect  } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import axios from "axios";

export default class App extends Component {
    render() {
        return (
            <div>
              works.
              {Search}
            </div>
        )
    }
}
