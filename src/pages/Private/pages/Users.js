import React, { Component } from 'react';
import user from "../../../assets/images/profile/17.jpg";

export default class Users extends Component {
    render() {
        return (
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
                                                <th><strong>ROLL NO.</strong></th>
                                                <th><strong>NAME</strong></th>
                                                <th><strong>Email</strong></th>
                                                <th><strong>Date</strong></th>
                                                <th><strong>Status</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                
                                                <td><strong>542</strong></td>
                                                <td><div class="d-flex align-items-center">
                                                    <img src={user} class="rounded-lg mr-2" width="24" alt=""/> 
                                                    <span class="w-space-no">Dr. Jackson</span></div></td>
                                                <td>example@example.com	</td>
                                                <td>01 August 2020</td>
                                                <td><div class="d-flex align-items-center"><i class="fa fa-circle text-success mr-1"></i> Successful</div></td>
                                                <td>
													<div class="d-flex">
														<a href="#" class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></a>
														<a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
													</div>
												</td>
                                            </tr>
											<tr>
                                                
                                                <td><strong>542</strong></td>
                                                <td><div class="d-flex align-items-center">
                                                    <img src={user} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">Dr. Jackson</span></div></td>
                                                <td>example@example.com	</td>
                                                <td>01 August 2020</td>
                                                <td><div class="d-flex align-items-center"><i class="fa fa-circle text-danger mr-1"></i> Canceled</div></td>
                                                <td>
													<div class="d-flex">
														<a href="#" class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></a>
														<a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
													</div>
												</td>
                                            </tr>
											<tr>
                                                
                                                <td><strong>542</strong></td>
                                                <td><div class="d-flex align-items-center">
                                                    <img src={user} class="rounded-lg mr-2" width="24" alt=""/> <span class="w-space-no">Dr. Jackson</span></div></td>
                                                <td>example@example.com	</td>
                                                <td>01 August 2020</td>
                                                <td><div class="d-flex align-items-center"><i class="fa fa-circle text-warning mr-1"></i> Pending</div></td>
                                                <td>
													<div class="d-flex">
														<a href="#" class="btn btn-primary shadow btn-xs sharp mr-1"><i class="fa fa-pencil"></i></a>
														<a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
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
        )
    }
}
