import React, {useState, Fragment} from 'react';
import {Link} from "react-router-dom";

import logo from "../../assets/images/Easyexpress24-final.png"

export default function MarchentSignup() {
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
                    <div class="back-arrow">
                        <Link to="/"><i class="fas fa-arrow-left"></i></Link>
                    </div>
                    <div class="content-cover">
                        <Link to="/"><img src={logo} alt="logo"/></Link>
                        {/* <h1>Biggest online vegan food ecommerce store in worldwide.</h1> */}
                    </div>
                </div>
                <div className="sign-form">
                    <div className="sign-card">
                        <ul class="nav nav-tabs">
                            <li> <span className="nav-link active"> Marchent SIGN UP</span></li>
                        </ul>
                    </div>

                    <div className="tab-pane active" id="signIn">
                        <div className="register-content">
                            <div className="sign-heading">
                                <h2>Register</h2>
                                <p>Setup a new account in a minute.</p>
                            </div>

                            <form className="form">
                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Name</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" 
                                        placeholder="Enter Name"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Email address</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" 
                                        placeholder="Enter Email"/>
                                </div>

                                <fieldset class="form-group">
                                    <div class="row">
                                        <label class="col-form-label col-sm-3 pt-0">Gender</label>
                                        <div class="col-sm-9">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" value="option1" checked/>
                                                <label class="form-check-label">
                                                    Male
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="gridRadios" value="option2"/>
                                                <label class="form-check-label">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Mobile Number</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Date of Birth</label>
                                    <input type="date" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Business Catelog</label>
                                    <select class="form-control form-control-lg">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">You're Role</label>
                                    <select class="form-control form-control-lg">
                                        <option>Owner</option>
                                        <option>Manager</option>
                                        <option>Employer</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Address</label>
                                    <textarea class="form-control form-control-lg"></textarea>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Name of A/C Holder</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Bank A/C</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Name of Branch</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">District</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">City</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Name of Shop</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>
                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Shop Address</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>
                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Product Discretion</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Facebook Page Link</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                
                                <div class="form-group">
                                    <label for="exampleInputPassword1">NID Number</label>
                                    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Repeat Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password Again"/>
                                </div>

                                <button type="submit" class="btn btn-outline-success">SIGN IN NOW</button>
                            </form>

                            <div class="form-bottom">
                                <p>Already have an account? click on the <span onClick={() => this.props.handelSetShowPage("signin")}>( sign in )</span> button above.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
