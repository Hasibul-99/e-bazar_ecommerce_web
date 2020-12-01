import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

import logo from "../../assets/images/logo.png"
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Registration() {
    return (
        <Fragment>
            <div className="sign-part">
                <div className="sign-content">
                    <div class="back-arrow">
                        <Link to="/"><i class="fas fa-arrow-left"></i></Link>
                    </div>
                    <div class="content-cover">
                        <Link to="/"><img src={logo} alt="logo"/></Link>
                        <h1>Biggest online vegan food ecommerce store in worldwide.</h1>
                    </div>
                </div>
                <div className="sign-form">
                    <div className="sign-card">
                        <ul class="nav nav-tabs">
                            <li><span class="nav-link active" data-toggle="tab">sign in</span></li>
                            <li><span class="nav-link" data-toggle="tab">sign up</span></li>
                        </ul>
                    </div>

                    <div className="tab-pane active" id="signIn">
                        <SignIn/>
                    </div>

                    <div className="tab-pane" id="signUp">
                        <SignUp/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
