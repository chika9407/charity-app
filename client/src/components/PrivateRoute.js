import React from "react";
import { Route, Redirect } from "react-router-dom";
//import AuthButton from "./AuthButton";
import { userIsLoggedIn } from "./userIsLoggedIn";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userIsLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
