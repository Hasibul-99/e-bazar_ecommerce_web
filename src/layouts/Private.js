import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../router/private-router";

import Navbar from "../pages/Private/common/Navbar";
import Sidebar from "../pages/Private/common/Sidebar";
import Footer from "../pages/Components/Common/Footer";

class Private extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getRoutes = routes => {
      return routes.map((prop, key) => {  
        if (prop.layout === "/admin") {
          return(<Route
            exact
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
            <div class="show" id="main-wrapper">
              <Navbar></Navbar>
              <Sidebar/>
              <div class="content-body">
                <div class="container-fluid">
                  <Switch>
                    {this.getRoutes(routes)}
                  </Switch>
                </div>
              </div>
              <Footer></Footer>
            </div>
        )
    }
}

export default Private;