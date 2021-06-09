import React, { Component } from 'react';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import PublicLayout from "../layouts/Public";
import PrivateLayout from "../layouts/Private";
import AuthLayout from "../layouts/Auth";
import PaymentLayout from '../layouts/Payment';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import {Provider} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isAdmin: false,
        }
    }
    componentDidMount() {
        // store.dispatch(loadUser());
    }

    render() {
        return (
            <>
            {/* // <Provider store={store}> */}
                <Switch>
                    <Route path="/payment" render={props => <PaymentLayout {...props} />}></Route> 
                    <Route path="/admin" render={props => <PrivateLayout {...props} />} ></Route>
                    <Route path="/auth" render={props => <AuthLayout {...props} />}></Route> 
                    <Route path="/" render={props => <PublicLayout {...props} />}></Route>
                    <Redirect from="/" to="/" /> 
                </Switch>
                <ToastContainer position="top-right"/>
            {/* // </Provider> */}
            </>
        )
    }
}

export default App;