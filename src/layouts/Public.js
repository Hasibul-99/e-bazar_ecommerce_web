import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../router/public-router";


class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getRoutes = routes => {
      return routes.map((prop, key) => {  
        if (prop.layout === "/") {
          return(<Route
            path={prop.path}
            component={prop.component}
            key={key}
            exact = {prop.exact}
          />)
        } else {
          return null;
        }
      });
    };

    render() {
        return (
            <div>
                <Switch>
                  {this.getRoutes(routes)}
                </Switch>
            </div>
        )
    }
}

export default Public;