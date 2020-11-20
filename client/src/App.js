import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorite from "./components/Favorite";
import Search from "./components/Search";
import Home from "./components/Home";
import Register from "./components/Register";
import Donate from "./components/Donate.js";
import Paypal from "./components/Paypal";
import MapContainer from "./components/MapContainer";
import ThankYou from "./components/ThankYou";
import Scatterplot from "./components/Scatterplot";
import { PrivateRoute } from "./components/PrivateRoute";

export default class App extends Component {
  render() {
    return (
      <div className="Background1">
        <Router>
          <Navbar />
          <div>
            <Switch>
              <PrivateRoute path="/favorite" exact component={Favorite} />

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

              <Route path="/ThankYou">
                <ThankYou />
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
