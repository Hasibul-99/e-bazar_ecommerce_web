import React, {useState, Fragment} from 'react';
import {Link} from "react-router-dom";

import logo from "../../assets/images/logo.png"
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Registration() {
    const [isShowSignIn, setIsShowSignIn] = useState(true);

    const changePage = (type) => {
        console.log(type);
        if (type === "signup") {
            setIsShowSignIn(false);
        } else if (type === 'signin') {
            setIsShowSignIn(true);
        }
    }

    return (
        <Fragment>
            <div className="sign-part">
                <div className="sign-content">
                    <div className="back-arrow">
                        <Link to="/"><i className="fas fa-arrow-left"></i></Link>
                    </div>
                    <div className="content-cover">
                        <Link to="/"><img src={logo} alt="logo"/></Link>
                        <h1>Biggest online vegan food ecommerce store in worldwide.</h1>
                    </div>
                </div>
                <div className="sign-form">
                    <div className="sign-card">
                        <ul className="nav nav-tabs">
                            <li onClick={() => setIsShowSignIn(true)}><span className={`nav-link ${isShowSignIn ? ' active': ''}`} data-toggle="tab">sign in</span></li>
                            <li onClick={() => setIsShowSignIn(false)}><span className={`nav-link ${isShowSignIn ? '': ' active'}`} data-toggle="tab">sign up</span></li>
                        </ul>
                    </div>

                    <div className="tab-pane active" id="signIn">
                        {
                            isShowSignIn ? <SignIn handelSetShowPage={changePage}/> : <SignUp handelSetShowPage={changePage}/>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
