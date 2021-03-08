import React, { Component } from 'react';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import { checkRes } from "../../scripts/checkRes";
import { postData } from "../../scripts/api-service";
import { CREATE_USER } from "../../scripts/api";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            mobile: '',
            password: "",
            conPassword: "",
            error: ""
        };
    };

    chnageHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({ [nam]: val });
        this.setState({ error: "" });
    }

    registrationSubmit = async (e) => {
        e.preventDefault();
        let {email, mobile, name, password, conPassword} = this.state;
        
        if (mobile && name && password && conPassword && password === conPassword) {
            
            let signUpdata = {
                mobile: mobile.trim(),
                email: email.trim(),
                name: name.trim(),
                password: password
            }

            let res = await postData(CREATE_USER, signUpdata, "no_token");

            if (res?.status && checkRes(res.status) && res.data.isSuccess) {
                
                Cookies.set("expressToken", res.data.data);
                window.location = "/";

            } else if(!res.data.isSuccess) {
                this.setState({ error: res.data.msg });
            }
        } else if (!mobile.trim()) {
            this.setState({error: "Mobile is Required"});
        } else if (!name.trim()) {
            this.setState({error: "Name is required"});
        } else if (password !== conPassword) {
            this.setState({error: "Password not match"})
        }
        
        if (this.state.error) {
            toast(this.state.error);
        }
    }
    
    render() {
        return (
            <div className="register-content">
                <div className="sign-heading">
                    <h2>Register</h2>
                    <p>Setup a new account in a minute.</p>
                </div>

                <form className="form" onSubmit={this.registrationSubmit}>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="text" onChange={this.chnageHandler} 
                            className="form-control" name="name" placeholder="Enter Name"/>
                    </div>
                    
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Mobile</label>
                        <input type="text" onChange={this.chnageHandler} 
                            className="form-control" name="mobile" placeholder="Enter Mobile Number"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleFormControlInput1">Email address</label>
                        <input type="email" onChange={this.chnageHandler} 
                            className="form-control" name="email" placeholder="Enter Email"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" onChange={this.chnageHandler}  
                            className="form-control" name="password" placeholder="Enter Password"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Repeat Password</label>
                        <input type="password" onChange={this.chnageHandler} 
                            className="form-control" name="conPassword" placeholder="Enter Password Again"/>
                    </div>

                    <div className="invalid-feedback d-block">
                        {this.state.error}
                    </div>

                    <button type="submit" className="btn btn-outline-success">SIGN IN NOW</button>
                </form>

                <div className="form-bottom">
                    <p>Already have an account? click on the <span onClick={() => this.props.handelSetShowPage("signin")}>( sign in )</span> button above.</p>
                </div>
            </div>
        )
    }
}
