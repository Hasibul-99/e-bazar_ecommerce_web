import React, { Component } from 'react';

import { LOGIN_USER_INFO, UPLOAD_PROFILE_IMAGE } from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import demoUser from "../../assets/images/profile/17.jpg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
    }

    componentDidMount() {
        this.getUserInfo()
    }

    getUserInfo = async () => {
        let res = await getData(LOGIN_USER_INFO);

        console.log("res", res.data);

        if (res?.data) {
            this.setState({userInfo: res?.data});
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
                                    <input type="text" class="form-control" value={this.state?.userInfo?.name}/>
                                </div>

                                {/* <div class="form-group d-none">
                                    <label>Email</label>
                                    <input type="email" class="form-control" value={this.state?.userInfo?.email}/>
                                </div> */}
                            </div>

                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Mobile Number</label>
                                    <input type="text" class="form-control" value={this.state?.userInfo?.mobile}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>NID</label>
                                    <input type="text" class="form-control" value={this.state?.userInfo?.nid}/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Date of Birth</label>
                                    {/* <input type="date" class="form-control" value={this.state?.userInfo?.dateOfBirth}/> */}
                                    <div className="date-container">
                                        <DatePicker selected={new Date()} onChange={date => this.setStartDate(date)} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div class="form-group">
                                    <label>Address</label>
                                    <textarea class="form-control" rows="3" value={this.state?.userInfo?.address}></textarea>
                                </div>
                            </div>
                        </div>

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


                    </div>
                </div>
            </div>
        )
    }
}
