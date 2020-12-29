import React from "react";
import routes from "../../../routes/routes";
import { Switch, Route, Redirect } from "react-router-dom";
const Content = () => {
  return (
    <div className="main">
      <Switch>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            component={route.Component}
            exact={route.exact}
          />
        ))}
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </div>
  );
};

export default Content;
