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
                                <div class="form-group">
                                    <input type="text" class="form-control input-default "
                                        placeholder="Quick Search by ID"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div class="form-group">
                                    <select class="form-control form-control-lg">
                                        <option>Status</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-responsive-md">
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
                                                    <div class="d-flex align-items-center">
                                                        <img src={user} class="rounded-lg mr-2" width="24" alt=""/> 
                                                        <span class="w-space-no">Dr. Jackson</span>
                                                    </div>
                                                    <p>example@example.com</p>
                                                </td>
                                                <td>7897978987</td>
                                                <td>01 August 2020</td>
                                                <td>8000TK</td>
                                                <td><div class="d-flex align-items-center">
                                                    <i class="fa fa-circle text-success mr-1"></i> 
                                                    Active</div>
                                                </td>
                                                <td>
													<div class="dropdown">
														<button type="button" class="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div class="dropdown-menu">
                                                        <a class="dropdown-item">View</a>
															<a class="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Active</a>
															<a class="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Pending</a>
															<a class="dropdown-item">Suspend</a>
															<a class="dropdown-item">Inactive</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img src={user} class="rounded-lg mr-2" width="24" alt=""/> 
                                                        <span class="w-space-no">Dr. Jackson</span>
                                                    </div>
                                                    <p>example@example.com</p>
                                                </td>
                                                <td>7897978987</td>
                                                <td>01 August 2020</td>
                                                <td>8000TK</td>
                                                <td><div class="d-flex align-items-center">
                                                    <i class="fa fa-circle text-success mr-1"></i> 
                                                    Active</div>
                                                </td>
                                                <td>
													<div class="dropdown">
														<button type="button" class="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div class="dropdown-menu">
															<a class="dropdown-item">View</a>
															<a class="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Active</a>
															<a class="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Pending</a>
															<a class="dropdown-item">Suspend</a>
															<a class="dropdown-item">Inactive</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img src={user} class="rounded-lg mr-2" width="24" alt=""/> 
                                                        <span class="w-space-no">Dr. Jackson</span>
                                                    </div>
                                                    <p>example@example.com</p>
                                                </td>
                                                <td>7897978987</td>
                                                <td>01 August 2020</td>
                                                <td>8000TK</td>
                                                <td><div class="d-flex align-items-center">
                                                    <i class="fa fa-circle text-success mr-1"></i> 
                                                    Active</div>
                                                </td>
                                                <td>
													<div class="dropdown">
														<button type="button" class="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div class="dropdown-menu">
                                                        <a class="dropdown-item">View</a>
															<a class="dropdown-item" onClick={() => {$("#successModal").modal("show");}}>Active</a>
															<a class="dropdown-item" onClick={() => {$("#errorModal").modal("show");}}>Pending</a>
															<a class="dropdown-item">Suspend</a>
															<a class="dropdown-item">Inactive</a>
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
