import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";

import { LOGIN_USER_INFO, UPLOAD_PROFILE_IMAGE, UPDATE_USER, GET_ORDER_LIST } from "../../scripts/api";
import { getData, postData, putData } from "../../scripts/api-service";
import demoUser from "../../assets/images/profile/17.jpg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment } from 'react';
import {dateFormat} from "../../scripts/helper";
import Cookies from "js-cookie";

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
            formData: this.formData,
            orderList: []
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));

        if (!(user && Cookies.get("expressToken"))) {
            window.location = "/";
        } else {
            this.getUserInfo();
            this.getuserOrders();
        }
    }

    getUserInfo = async () => {
        let res = await getData(LOGIN_USER_INFO);
        
        if (res?.data) {
            let data = res.data;
            this.setState({userInfo: data});

            this.setState({formData: {
                name: data.name,
                mobile: data.mobile,
                nid: data.nid,
                address: data.address,
                dateOfBirth: new Date(data.dateOfBirth) || null,
                bussinessName: data?.marchant?.bussinessName,
                marchentDesignation: data?.marchant?.marchantDesignation,
                accountName: data?.marchant?.bankInfo?.accountName,
                accountNumber: data?.marchant?.bankInfo?.accountNumber,
                branch: data?.marchant?.bankInfo?.branch
            }})
        }
    }

    getuserOrders = async () => {
        const user = JSON.parse(localStorage.getItem("ExpressUserInfo"));
        let res = await getData(GET_ORDER_LIST + "?user=" + user._id + "&limit=1000");

        if (res?.data?.isSuccess) {
            this.setState({orderList: res?.data?.data});
        }
    }

    uploadImage = async (e) => {
        let ele = e.target;
        
        let data = new FormData();
        let file = ele.files[0];
        data.append('avatar', file);
        
        let res = await postData(UPLOAD_PROFILE_IMAGE, data);
        if (res?.data?.isSuccess) {
            toast.success("Image Upload Successfully");
            let ele = document.getElementById('js-img-thumb');
            if (ele) ele.src = `http://easyexpress24.com:5000/static/${res.data.data}`
        } else {
            toast.error("Something went wrong!");
        }

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
        }

        if (this.state.userInfo.userType === 'MARCHANT') {
            let marchent = {
                "bussinessName": this.state.formData.bussinessName,
                "marchantDesignation": this.state.formData.marchentDesignation,
                "bankInfo":{
                    "accountName": this.state.formData.accountName,
                    "accountNumber": this.state.formData.accountNumber,
                    "branch": this.state.formData.branch
                }
            }

            data.marchant = marchent;
        }

        let res = await putData(UPDATE_USER, data);

        if (res?.data?.isSuccess) {
            toast.success("User info update successfully!");
        } else {
            toast.error(res?.data?.msg);
        }

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
                                        <img id="js-img-thumb" class="img-thumbnail"
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
                                    <div className="date-container">
                                        <DatePicker selected={ this.state?.formData?.dateOfBirth ?
                                             this.state?.formData?.dateOfBirth : new Date()} 
                                        onChange={date => this.setStartDate(date)} />
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
                        {/* MARCHANT */}
                        {
                            this.state?.userInfo?.userType === 'MARCHANT' ? 
                            <Fragment>
                                <hr/>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Business Name</label>
                                            <input type="text" value={this.state?.formData?.bussinessName}
                                             onChange={this.changeHandeler} name="bussinessName" class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Merchant Designation</label>
                                            <input type="text" value={this.state?.formData?.marchentDesignation} 
                                                onChange={this.changeHandeler}  name="marchentDesignation"  class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Account Name </label>
                                            <input type="text" value={this.state?.formData?.accountName} 
                                                onChange={this.changeHandeler} name="accountName"  class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Account Number </label>
                                            <input type="text" value={this.state?.formData?.accountNumber} 
                                                onChange={this.changeHandeler}  name="accountNumber"  class="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <label>Bank Branch </label>
                                            <input type="text" value={this.state?.formData?.branch} 
                                                onChange={this.changeHandeler}  name="branch" class="form-control"/>
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

                        <hr/>

                        <div className="row">
                            <h3>Orders</h3>

                            <div className="col-lg-12">
                                {/* <div className="card">
                                    <div className="card-body"> */}
                                        <div className="table-responsive">
                                            <table className="table table-responsive-md">
                                                <thead>
                                                    <tr>
                                                        {/* <th><strong>Order</strong></th> */}
                                                        <th><strong>#</strong></th>
                                                        <th><strong>Purchased</strong></th>
                                                        <th><strong>DATE</strong></th>
                                                        <th><strong>STATUS</strong></th>
                                                        <th><strong>TOTAL PRICE</strong></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state?.orderList?.length ? 
                                                        this.state.orderList.map((list, key) => {
                                                            return <Fragment>
                                                                <tr key={list._id}>
                                                                    <td><strong>{key + 1}</strong></td>
                                                                    {/* <td>{list?.user?.name}</td> */}
                                                                    <td>{list?.products?.length} Items</td>
                                                                    <td>{dateFormat(list.creatingDate)}</td>
                                                                    <td>
                                                                        <span className={`badge light ${list.orderStatus === 'PENDING' ? 'badge-warning' : list.orderStatus === 'CANCLED' ? 'badge-danger' : 'badge-success'}`}>{list.orderStatus}</span>
                                                                    </td>
                                                                    <td>{list.totalPrice}</td>
                                                                    <td>
                                                                        <div className="dropdown">
                                                                            <button type="button" className="btn btn-success light sharp" data-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                            </button>
                                                                            <div className="dropdown-menu">
                                                                                <Link to={`/order-details/${list._id}`} className="dropdown-item">View</Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        }) : "NO Order Found"
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    {/* </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}
