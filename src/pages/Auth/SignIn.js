import React, { Component,Fragment } from 'react';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import { LOGIN } from "../../scripts/api";
import { checkRes } from "../../scripts/checkRes";
import { postData } from "../../scripts/api-service";

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: "",
            password: "",
            error: ""
        };
    }

    changeHandeler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({ [nam]: val });
        this.setState({ error: "" });
    }

    loginSubmit = async (e) => {
        e.preventDefault();

        const {mobile, password} = this.state;

        if (mobile && password) {

            let signIn = {
                userName: mobile.trim(),
                password: password
            }

            let res = await postData(LOGIN, signIn, "no_token");

            if (res?.status && checkRes(res.status) && res.data.isSuccess) {
                Cookies.set("expressToken", res.data.data);
                window.location = "/";

            } else if(!res.data.isSuccess) {
                this.setState({ error: res.data.msg });
            }
        } else if (!mobile) {
            this.setState({error: "Mobile number is required"})
        } else if (!password) {
            this.setState({error: "Password is required"})
        }

        if (this.state.error) {
            toast(this.state.error);
        }
    }

    render() {
        return (
            <div className="register-content">
                <div className="sign-heading">
                    <h2>Login</h2>
                    <p>Use credentials to access your account.</p>
                </div>
                <form className="form" onSubmit={this.loginSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Mobile Number</label>
                        <input type="text" className="form-control" name="mobile"
                            onChange={this.changeHandeler}  placeholder="Enter Mobile Number"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" 
                            onChange={this.changeHandeler} placeholder="Password"/>
                    </div>

                    <button type="submit" className="btn btn-outline-success">SIGN IN NOW</button>
                </form>

                <div className="form-bottom">
                    <p>Don't have an account? click on the <span onClick={() => this.props.handelSetShowPage("signup")}>( sign up )</span> button above.</p>
                </div>
            </div>
        )
    }
}
