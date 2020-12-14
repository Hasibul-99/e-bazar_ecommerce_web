import React, { Component } from 'react'

export default class Orders extends Component {
    render() {
        return (
            <div className="order">
                <div className="row">
                    <div className="col-4">
                        <h3>Orders</h3>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-4">
                                <div class="form-group">
                                    <input type="text" class="form-control input-default "
                                        placeholder="Quick Search by ID"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div class="form-group">
                                    <select class="form-control form-control-lg">
                                        <option>Status</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4 text-right">
                                <div class="form-group">
                                    <button type="button" class="btn light btn-success">
                                    <i className="fa fa-plus mr-2"></i>
                                     Add Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            {/* <div class="card-header">
                                <h4 class="card-title">Recent Payments Queue</h4>
                            </div> */}
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-responsive-md">
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
                                                <td><span class="badge light badge-success">Successful</span></td>
                                                <td>$21.56</td>
                                                <td>
													<div class="dropdown">
														<button type="button" class="btn btn-success light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
														</button>
														<div class="dropdown-menu">
															<a class="dropdown-item" href="#">Edit</a>
															<a class="dropdown-item" href="#">Delete</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td><strong>02</strong></td>
                                                <td>Mr. Bobby</td>
                                                <td>3 Items</td>
                                                <td>01 August 2020</td>
                                                <td><span class="badge light badge-danger">Canceled</span></td>
                                                <td>$21.56</td>
                                                <td>
													<div class="dropdown">
														<button type="button" class="btn btn-danger light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
														</button>
														<div class="dropdown-menu">
															<a class="dropdown-item" href="#">Edit</a>
															<a class="dropdown-item" href="#">Delete</a>
														</div>
													</div>
												</td>
                                            </tr>
											<tr>
                                                <td><strong>03</strong></td>
                                                <td>Mr. Bobby</td>
                                                <td>3 Items</td>
                                                <td>01 August 2020</td>
                                                <td><span class="badge light badge-warning">Pending</span></td>
                                                <td>$21.56</td>
                                                <td>
													<div class="dropdown">
														<button type="button" class="btn btn-warning light sharp" data-toggle="dropdown">
															<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g>
                                                            </svg>
														</button>
														<div class="dropdown-menu">
															<a class="dropdown-item" href="#">Edit</a>
															<a class="dropdown-item" href="#">Delete</a>
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
        )
    }
}
