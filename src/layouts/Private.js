import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../router/private-router";
import Cookies from "js-cookie";

import Navbar from "../pages/Private/common/Navbar";
import Sidebar from "../pages/Private/common/Sidebar";
import Footer from "../pages/Components/Common/Footer";

class Private extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
      let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));

      if (!(user && (user.userType === 'MARCHANT' || user.userType === "ADMIN") && Cookies.get("expressToken"))) {
        window.location = "/";
      }
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
            <div className="show" id="main-wrapper">
              <Navbar></Navbar>
              <Sidebar/>
              <div className="content-body">
                <div className="container-fluid">
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