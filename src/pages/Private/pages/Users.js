import React, { Component, Fragment } from 'react';
import user from "../../../assets/images/profile/17.jpg";
import AlertModal from "../../Components/Common/AlertModal"; 
import $ from "jquery";

export default class Users extends Component {
    render() {
        return (
            <Fragment>
<div className="order">
                <div className="row">
                    <div className="col-6">
                        <h3>Users</h3>
                    </div>
                    <div className="col-6">
                        <div className="row">
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
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th><strong>NAME</strong></th>
                                                <th><strong>Phone</strong></th>
                                                <th><strong>Date</strong></th>
                                                <th><strong>Ordered</strong></th>
                                                <th><strong>Status</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={user} className="rounded-lg mr-2" width="24" alt=""/> 
                                                        <span className="w-space-no">Dr. Jackson</span>
                                                    </div>
                                                    <p>example@example.com</p>
                                                </td>
                                                <td>7897978987</td>
                                                <td>01 August 2020</td>
                                                <td>8000TK</td>
                                                <td><div className="d-flex align-items-center">
                                                    <i className="fa fa-circle text-success mr-1"></i> 
                                                    Active</div>
                                                </td>
                                                <td>
													<div className="dropdown">
														<button type="button" className="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div className="dropdown-menu">
                                                        <a className="dropdown-item">View</a>
															<a className="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Active</a>
															<a className="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Pending</a>
															<a className="dropdown-item">Suspend</a>
															<a className="dropdown-item">Inactive</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={user} className="rounded-lg mr-2" width="24" alt=""/> 
                                                        <span className="w-space-no">Dr. Jackson</span>
                                                    </div>
                                                    <p>example@example.com</p>
                                                </td>
                                                <td>7897978987</td>
                                                <td>01 August 2020</td>
                                                <td>8000TK</td>
                                                <td><div className="d-flex align-items-center">
                                                    <i className="fa fa-circle text-success mr-1"></i> 
                                                    Active</div>
                                                </td>
                                                <td>
													<div className="dropdown">
														<button type="button" className="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div className="dropdown-menu">
															<a className="dropdown-item">View</a>
															<a className="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Active</a>
															<a className="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Pending</a>
															<a className="dropdown-item">Suspend</a>
															<a className="dropdown-item">Inactive</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={user} className="rounded-lg mr-2" width="24" alt=""/> 
                                                        <span className="w-space-no">Dr. Jackson</span>
                                                    </div>
                                                    <p>example@example.com</p>
                                                </td>
                                                <td>7897978987</td>
                                                <td>01 August 2020</td>
                                                <td>8000TK</td>
                                                <td><div className="d-flex align-items-center">
                                                    <i className="fa fa-circle text-success mr-1"></i> 
                                                    Active</div>
                                                </td>
                                                <td>
													<div className="dropdown">
														<button type="button" className="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div className="dropdown-menu">
                                                        <a className="dropdown-item">View</a>
															<a className="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Active</a>
															<a className="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Pending</a>
															<a className="dropdown-item">Suspend</a>
															<a className="dropdown-item">Inactive</a>
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
