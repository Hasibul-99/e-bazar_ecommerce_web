import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import routes from "../router/auth-route";


class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
      let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));

      if (user && Cookies.get("expressToken")) {
        if (user.userType === 'MARCHANT') {
          window.location = "/admin/products"
        } else {
          window.location = "/";
        }
      }
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/auth") {
            return(<Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />)
          } else {
            return null;
          }
        });
    };

    render() {
        return (
            <div>
                <Switch>{this.getRoutes(routes)}</Switch>
            </div>
        )
    }
}

export default Auth;