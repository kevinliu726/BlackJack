import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ path: path, isAuth: isAuth, component: Component, ...rest }) {
  console.log(path);
  return (
    <Route
      path={"/Menu/Kevin"}
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
}

export default AuthRoute;
