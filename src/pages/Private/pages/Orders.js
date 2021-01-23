import React, { Component, Fragment } from 'react';
import AlertModal from "../../Components/Common/AlertModal"; 
import $ from "jquery";

import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

import { postData, getData } from "../../../scripts/api-service";
import { GET_ORDER_LIST } from "../../../scripts/api";
import Pagination from "../common/Pagination";

import {loadPageVar} from "../../../scripts/helper";
export default class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageValue: 1, 
            orderList: []
        };
    }

    componentDidMount() {
        this.setState({pageValue: loadPageVar('page') });
        this.getOrderList(loadPageVar('page'));
    }

    getOrderList = async (page) => {
        let url = page ? GET_ORDER_LIST + '?page='+ page : GET_ORDER_LIST;
        let res = await getData(url);

        if (res?.data?.isSuccess) {
            this.setState({orderList: res?.data?.data});
        }
    }

    render() {
        return (
            <Fragment>
                <div className="order">
                <div className="row">
                    <div className="col-6">
                        <h3>Orders</h3>
                    </div>
                    <div className="col-6">
                        <div className="row d-none">
                            <div className="col-6">
                                <div className="form-group">
                                    <input type="text" className="form-control input-default "
                                        placeholder="Quick Search by ID"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <select className="form-control form-control-lg">
                                        <option>Status</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            {/* <div className="card-header">
                                <h4 className="card-title">Recent Payments Queue</h4>
                            </div> */}
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th><strong>Order</strong></th>
                                                <th><strong>Customer</strong></th>
                                                <th><strong>Purchased</strong></th>
                                                <th><strong>DATE</strong></th>
                                                <th><strong>STATUS</strong></th>
                                                <th><strong>PRICE</strong></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>01</strong></td>
                                                <td>Mr. Bobby</td>
                                                <td>3 Items</td>
                                                <td>01 August 2020</td>
                                                <td><span className="badge light badge-success">Successful</span></td>
                                                <td>$21.56</td>
                                                <td>
													<div className="dropdown">
														<button type="button" className="btn btn-success light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
														</button>
														<div className="dropdown-menu">
															<a className="dropdown-item">View</a>
															<a className="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Successful</a>
															<a className="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Canceled</a>
															<a className="dropdown-item">Pending</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td><strong>02</strong></td>
                                                <td>Mr. Bobby</td>
                                                <td>3 Items</td>
                                                <td>01 August 2020</td>
                                                <td><span className="badge light badge-danger">Canceled</span></td>
                                                <td>$21.56</td>
                                                <td>
													<div className="dropdown">
														<button type="button" className="btn btn-danger light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
														</button>
														<div className="dropdown-menu">
															<a className="dropdown-item">View</a>
															<a className="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Successful</a>
															<a className="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Canceled</a>
															<a className="dropdown-item">Pending</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td><strong>03</strong></td>
                                                <td>Mr. Bobby</td>
                                                <td>3 Items</td>
                                                <td>01 August 2020</td>
                                                <td><span className="badge light badge-warning">Pending</span></td>
                                                <td>$21.56</td>
                                                <td>
													<div className="dropdown">
														<button type="button" className="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div className="dropdown-menu">
															<a className="dropdown-item">View</a>
															<a className="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Successful</a>
															<a className="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Canceled</a>
															<a className="dropdown-item">Pending</a>
														</div>
													</div>
												</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AlertModal
            heading={"Success!"}
            type={"success"}
            message={"Password Change successfully"}
            modalId={"successModal"}
            />

            <AlertModal
            heading={"Alert!"}
            type={"danger"}
            message={"Are you Sure"}
            modalId={"errorModal"}
            />
            </Fragment>
        )
    }
}
