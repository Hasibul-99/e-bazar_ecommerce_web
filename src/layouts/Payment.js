import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import routes from "../router/payment-router";

export default class Payment extends Component {
    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/payment") {
              console.log("prop", prop);
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
