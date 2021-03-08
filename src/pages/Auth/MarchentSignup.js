import React, {useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

import logo from "../../assets/images/Easyexpress24-final.png";
import { postData } from "../../scripts/api-service";
import { CREATE_MARCHANT_USER } from "../../scripts/api";
import { checkRes } from "../../scripts/checkRes";

export default function MarchentSignup() {
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        let userData = {
            "email": data.email,
            "password": data.password,
            "name": data.name,
            "mobile": data.mobile,
            "nid": data.nid,
            "address": data.address,
            "dateOfBirth": data.dateOfBirth,
            'facebook': data.facebook,
            "marchant":{
                "bussinessName": data.bussinessName,
                "marchantDesignation": data.marchantDesignation,
                "bankInfo":{
                    "accountName": data.accountName,
                    "accountNumber": data.accountNumber,
                    "branch": data.branch
                }
            }
        }

        let res = await postData(CREATE_MARCHANT_USER, userData, "no_token");

        if (res?.status && checkRes(res.status) && res.data.isSuccess) {
            // Cookies.set("expressToken", res.data.data);
            toast.success('Admin will varify you!');
            setTimeout(() => {
                window.location = "/";
            }, 1500);
        } else if(!res.data.isSuccess) {
            setError(res.data.msg);
        }

        if (error) {
            toast(error);
        }
    };

    return (
        <Fragment>
            <div className="sign-part">
                <div className="sign-content">
                    <div className="back-arrow">
                        <Link to="/"><i className="fas fa-arrow-left"></i></Link>
                    </div>
                    <div className="content-cover">
                        <Link to="/"><img src={logo} alt="logo"/></Link>
                        {/* <h1>Biggest online vegan food ecommerce store in worldwide.</h1> */}
                    </div>
                </div>
                <div className="sign-form">
                    <div className="sign-card">
                        <ul className="nav nav-tabs">
                            <li> <span className="nav-link active"> Marchent SIGN UP</span></li>
                        </ul>
                    </div>

                    <div className="tab-pane active" id="signIn">
                        <div className="register-content">
                            <div className="sign-heading">
                                <h2>Register</h2>
                                <p>Setup a new account in a minute.</p>
                            </div>

                            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Name</label>
                                    <input type="text" className="form-control" name="name"
                                        ref={register} placeholder="Enter Name"/>
                                </div>

                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input type="text" className="form-control"
                                        name="mobile" ref={register}  placeholder="Enter Mobile Number"/>
                                </div>

                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Email address</label>
                                    <input type="email" className="form-control" name="email"
                                        ref={register}  placeholder="Enter Email"/>
                                </div>

                                <fieldset className="form-group">
                                    <div className="row">
                                        <label className="col-form-label col-sm-3 pt-0">Gender</label>
                                        <div className="col-sm-9">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" 
                                                    ref={register} value="male" checked/>
                                                <label className="form-check-label">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gender" 
                                                    ref={register}  value="female"/>
                                                <label className="form-check-label">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group">
                                    <label  >Date of Birth</label>
                                    <input type="date" className="form-control" 
                                        name="dateOfBirth" ref={register} placeholder="Enter Birthdate"/>
                                </div>

                                <div className="form-group">
                                    <label  >Business Name</label>
                                    {/* <select className="form-control form-control-lg" name="businessCatelog" ref={register}>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select> */}
                                    <input type="text" className="form-control" 
                                        name="bussinessName" ref={register} placeholder="Enter Business Name"/>
                                </div>

                                <div className="form-group">
                                    <label>You're Role</label>
                                    <select className="form-control form-control-lg" name="marchantDesignation" ref={register}>
                                        <option>Owner</option>
                                        <option>Manager</option>
                                        <option>Employer</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label >Address</label>
                                    <textarea className="form-control form-control-lg" name="address" ref={register}></textarea>
                                </div>

                                <div className="form-group">
                                    <label>Name of A/C Holder</label>
                                    <input type="text" className="form-control" 
                                        name="accountName" ref={register} placeholder="Enter Name of A/C Holder"/>
                                </div>

                                <div className="form-group">
                                    <label>Bank A/C</label>
                                    <input type="text" className="form-control" name="accountNumber" ref={register} placeholder="Enter Bank A/C"/>
                                </div>

                                
                                <div className="form-group">
                                    <label>Name of Branch</label>
                                    <input type="text" className="form-control" name="branch" ref={register} placeholder="Enter Name of Branch"/>
                                </div>

                                
                                <div className="form-group d-none">
                                    <label>District</label>
                                    <input type="text" className="form-control" name="district" ref={register}  placeholder="Enter District"/>
                                </div>

                                
                                <div className="form-group d-none">
                                    <label>City</label>
                                    <input type="text" className="form-control" name="city" ref={register}  placeholder="Enter City"/>
                                </div>

                                
                                <div className="form-group d-none">
                                    <label>Name of Shop</label>
                                    <input type="text" className="form-control" name="nameOfShop" ref={register} placeholder="Enter Name of Shop"/>
                                </div>
                                
                                <div className="form-group d-none">
                                    <label  >Shop Address</label>
                                    <input type="text" className="form-control" name="shopAddress" ref={register} placeholder="Enter Shop Address"/>
                                </div>
                                
                                <div className="form-group  d-none">
                                    <label  >Product Discretion</label>
                                    <input type="text" className="form-control" name="productDiscription" ref={register} placeholder="Enter Product Discretion"/>
                                </div>

                                
                                <div className="form-group">
                                    <label  >Facebook Page Link</label>
                                    <input type="text" className="form-control" name="facebook" ref={register}  placeholder="Enter Facebook Page Link"/>
                                </div>

                                
                                <div className="form-group">
                                    <label  >NID Number</label>
                                    <input type="text" className="form-control" name="nid" ref={register}  placeholder="Enter NID Number"/>
                                </div>

                                <div className="form-group">
                                    <label  >Password</label>
                                    <input type="password" className="form-control" name="password" ref={register}  placeholder="Enter Password"/>
                                </div>

                                <div className="form-group">
                                    <label  >Repeat Password</label>
                                    <input type="password" className="form-control" name="repassword" ref={register}  placeholder="Enter Password Again"/>
                                </div>

                                <button type="submit" className="btn btn-outline-success">SIGN IN NOW</button>
                            </form>

                            <div className="form-bottom">
                                <p>Already have an account? click on the <span onClick={() => window.location="/auth/registration"}>( sign in )</span> button above.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
