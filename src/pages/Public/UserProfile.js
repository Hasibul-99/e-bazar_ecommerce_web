import React, { Component } from 'react';

import { LOGIN_USER_INFO, UPLOAD_PROFILE_IMAGE, UPDATE_USER } from "../../scripts/api";
import { getData, postData, putData } from "../../scripts/api-service";
import demoUser from "../../assets/images/profile/17.jpg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment } from 'react';

export default class UserProfile extends Component {
    formData = {
        name: "",
        mobile: "",
        nid: "",
        address: "",
        dateOfBirth: "",
        bussinessName: "",
        marchentDesignation: "",
        accountName: "",
        accountNumber: "",
        branch: "",
    }
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            formData: this.formData
        };
    }

    componentDidMount() {
        this.getUserInfo()
    }

    getUserInfo = async () => {
        let res = await getData(LOGIN_USER_INFO);

        console.log("res", res.data);

        if (res?.data) {
            let data = res.data;
            this.setState({userInfo: data});

            this.setState({formData: {
                name: data.name,
                mobile: data.mobile,
                nid: data.nid,
                address: data.address,
                dateOfBirth: data.dateOfBirth,
            }})
        }
    }

    uploadImage = async (e) => {
        console.log("e", e.target);
        let ele = e.target;
        
        let data = new FormData();
        let file = ele.files[0];
        data.append('avatar', file);
        
        let res = await postData(UPLOAD_PROFILE_IMAGE, data);

        console.log("res", res);
        // if (res?.data?.isSuccess) {
        //     toast.success("Product Image Upload Successfully");
        //     window.location = '/admin/products';
        // }

    }

    setStartDate = (date) => {
        this.setState({ 
            formData: {
                ...this.state.formData,
                ["dateOfBirth"]: date,
            }
        });
    }

    changeHandeler = (e) => {
        let name = e.target.name,
            value = e.target.value;

        this.setState({ 
            formData: {
                ...this.state.formData,
                [name]: value,
            }
        });
    } 

    formSubmit = async() => {
        let data = {
            "name": this.state.formData.name,
            "mobile": this.state.formData.mobile,
            "nid": this.state.formData.nid,
            "address": this.state.formData.address,
            "dateOfBirth": this.state.formData.dateOfBirth,
            // "marchant":{
            //     "bussinessName":"A Enter Prize",
            //     "marchantDesignation":"OWNER",
            //     "bankInfo":{
            //         "accountName":"ARIF JAHAN",
            //         "accountNumber":"123456789",
            //         "branch":"Dhanmondi,dhaka"
            //     }
            // }
        }

        let res = await putData(UPDATE_USER, data);

        console.log("res", res);


    }

    render() {
        return (
            <div className="user-profile">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                {/* <img class="img-thumbnail" src={demoUser} /> */}
                                <div class="avatar-upload">
                                    <div class="avatar-edit">
                                        <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" onChange={this.uploadImage} />
                                        <label for="imageUpload"></label>
                                    </div>
                                    <div className="user-acater">
                                        <img class="img-thumbnail"
                                             src={ this.state?.userInfo?.avatar ? `http://easyexpress24.com:5000/static/${this.state.userInfo.avatar}` : demoUser} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" class="form-control" name="name" onChange={this.changeHandeler} value={this.state?.formData?.name}/>
                                </div>

                                {/* <div class="form-group d-none">
                                    <label>Email</label>
                                    <input type="email" class="form-control" value={this.state?.userInfo?.email}/>
                                </div> */}
                            </div>

                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Mobile Number</label>
                                    <input type="text" class="form-control" name="mobile" 
                                        onChange={this.changeHandeler}  value={this.state?.formData?.mobile}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>NID</label>
                                    <input type="text" class="form-control" name="nid" onChange={this.changeHandeler} 
                                        value={this.state?.formData?.nid}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Date of Birth</label>
                                    {/* <input type="date" class="form-control" value={this.state?.userInfo?.dateOfBirth}/> this.state.formData?.dateOfBirth || */}
                                    <div className="date-container">
                                        <DatePicker selected={ new Date()} onChange={date => this.setStartDate(date)} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea class="form-control" rows="3" name="address" onChange={this.changeHandeler} 
                                        value={this.state?.formData?.address}></textarea>
                                </div>
                            </div>
                        </div>
                        
                        {
                            this.state?.userInfo?.userType === 'MARCHANT' ? 
                            <Fragment>
                                <hr/>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Business Name</label>
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Marchent Designation</label>
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Account Name </label>
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Account Number </label>
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Branch </label>
                                            <input type="text" class="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </Fragment> : ""
                        }
                        <hr/>

                        <div className="row mb-5">
                            <div className="col-12">
                                <button className="btn btn-success float-right" onClick={this.formSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
