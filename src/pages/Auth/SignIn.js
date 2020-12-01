import React, { Component,Fragment } from 'react';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="register-content">
                <div className="sign-heading">
                    <h2>Login</h2>
                    <p>Use credentials to access your account.</p>
                </div>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" 
                            placeholder="name@example.com"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
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
