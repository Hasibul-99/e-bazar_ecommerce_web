import React, { Component, Fragment } from 'react';
import demoUserImage from "../../../assets/images/profile/17.jpg";
import $ from "jquery";

import { toast } from 'react-toastify';

import { postData, getData } from "../../../scripts/api-service";
import { GET_USERS, VERIFY_USER, COUNT_USER } from "../../../scripts/api";

import {loadPageVar, dateFormat} from "../../../scripts/helper";
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';


export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageValue: 1, 
            userType: 'all',
            users: [],
            allUsers: [],
            totalUser: 0,
            totalMerchant: 0
        };
    }

    componentDidMount() {
        this.setState({pageValue: loadPageVar('page') });
        this.getUsersList(loadPageVar('page'));
        this.countUser();
        this.countMarchant();
    }

    getUsersList = async (page) => {
        let url = page ? GET_USERS + '?page='+ page : GET_USERS;
        let res = await getData(url);
        
        if (res?.data?.isSuccess) {
            this.setState({users: res?.data?.data, allUsers: res?.data?.data});
        }
    }

    countUser = async () => {
        let res = await getData(COUNT_USER);

        if (res?.data?.isSuccess) {
            this.setState({totalUser: res.data.data});
        }
    }

    countMarchant = async () => {
        let res = await getData(COUNT_USER+ "?userType=MARCHANT");

        if (res?.data?.isSuccess) {
            this.setState({totalMerchant: res.data.data});
        }
    }

    handelPagination = (page) => {
        this.props.history.push(`${window.location.pathname}?page=${page}`);
        this.getUsersList(page);
    }

    verifiedUser = async (user) => {
        swal.fire({
            title: 'Are you sure?',
            text:'You want to Change this user status!',
            icon: 'warning',
            showCancelButton: "true",
            confirmButtonText:'Yes',
            cancelButtonText: 'Cancel',
          }).then( async result => {
            if (result.value) {
                let res = await postData(VERIFY_USER, {userId: user._id});

                if (res?.data?.isSuccess) {
                    toast.success("User status update successfully!");
                    this.getUsersList(this.state.pageValue);
                } else {
                    toast("Something went wrong");
                }
            }
        })
    }

    changeStatus = (e) => {
        let value = e.target.value;
        let listUser = this.state.allUsers.filter(u => u.userType === value);
        
        if (value !== 'all') {
            this.setState({users: listUser});
        } else {
            this.setState({users: this.state.allUsers});
        }
    }

    render() {
        return (
            <Fragment>
            <div className="order">
                <div className="row">
                    <div className="col-6">
                        <h3>Users</h3>
                        <h4>Total user: {this.state.totalUser}</h4>
                        <h4>Total Merchant: {this.state.totalMerchant}</h4>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                {/* <div className="form-group">
                                    <input type="text" className="form-control input-default "
                                        placeholder="Quick Search by ID"/>
                                </div> */}
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <select className="form-control form-control-lg" onChange={this.changeStatus }>
                                        <option value="all">All</option>
                                        <option value="USER">USER</option>
                                        <option value="MARCHANT">MARCHANT</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th><strong>NAME</strong></th>
                                                <th><strong>Phone</strong></th>
                                                <th><strong>Date</strong></th>
                                                {/* <th><strong>Ordered</strong></th> */}
                                                <th>Type</th>
                                                <th><strong>Status</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state?.users?.length ? (
                                                    this.state.users.map(user => {
                                                        return (
                                                            <tr key={user._id}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <img src={demoUserImage} className="rounded-lg mr-2" width="24" alt=""/> 
                                                                        <span className="w-space-no">{user.name}</span>
                                                                    </div>
                                                                    <p>{user.email}</p>
                                                                </td>
                                                                <td>{user.mobile}</td>
                                                                <td>{dateFormat(user.joiningDate)}</td>
                                                                {/* <td>8000TK</td> */}
                                                                <td>{user.userType}</td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <i className="fa fa-circle text-success mr-1"></i> 
                                                                        {user.userActiveStatus === 'NOT_VERIFIED' ? 'Not Verified' : "Active"}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button type="button" className="btn btn-warning light sharp" data-toggle="dropdown">
                                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                                            </svg>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <Link to={`/admin/user-profile/${user._id}`} className="dropdown-item">View</Link>
                                                                            <Link className="dropdown-item" onClick={() => this.verifiedUser(user)}>Active</Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : <h3>NO User Found</h3>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            </Fragment>
        )
    }
}
