import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../router/public-router";

import TopNavBar from "../pages/Components/Common/TopNavBar";
import SideBar from "../pages/Components/Common/LeftSidebar";
import CartBox from "../pages/Components/Common/CartBox";
import Footer from "../pages/Components/Common/Footer";
import BundlesPackagesOffer from "../pages/Components/Common/BundlesPackagesOffer";


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
            <div class="show" id="main-wrapper">
              <TopNavBar></TopNavBar>
              <SideBar/>
              <BundlesPackagesOffer/>
              <div class="content-body">
                <div class="container-fluid">
                  <Switch>
                    {this.getRoutes(routes)}
                  </Switch>

                  <CartBox></CartBox>
                </div>
              </div>
              <Footer></Footer>
            </div>
        )
    }
}

export default Public;