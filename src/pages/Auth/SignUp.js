import React, { Component } from 'react';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    
    render() {
        return (
            <div className="register-content">
                <div className="sign-heading">
                    <h2>Register</h2>
                    <p>Setup a new account in a minute.</p>
                </div>

                <form className="form">
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" 
                            placeholder="Enter Name"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleFormControlInput1">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" 
                            placeholder="Enter Email"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                    </div>

                    <div className="form-group">
                        <label for="exampleInputPassword1">Repeat Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password Again"/>
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
