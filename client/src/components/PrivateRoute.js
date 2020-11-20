import React from "react";
import { Route, Redirect } from "react-router-dom";
//import AuthButton from "./AuthButton";
import { userIsLoggedIn } from "./userIsLoggedIn";
import { checkUser } from "./checkUser";

export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return checkUser() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
