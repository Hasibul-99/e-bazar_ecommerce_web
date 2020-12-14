import React, { Component } from 'react'

export default class Products extends Component {
    render() {
        return (
            <div className="order">
                <div className="row">
                    <div className="col-4">
                        <h3>Products</h3>
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
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                <div class="col-lg-12">
                        <div class="card">
                            {/* <div class="card-header">
                                <h4 class="card-title">Responsive Table</h4>
                            </div> */}
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>Invoice</th>
                                                <th>User</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #26589</a>
                                                </td>
                                                <td>Herman Beck</td>
                                                <td><span class="text-muted">Oct 16, 2017</span>
                                                </td>
                                                <td>$45.00</td>
                                                <td><span class="badge badge-success">Paid</span>
                                                </td>
                                                <td>EN</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #58746</a>
                                                </td>
                                                <td>Mary Adams</td>
                                                <td><span class="text-muted">Oct 12, 2017</span>
                                                </td>
                                                <td>$245.30</td>
                                                <td><span class="badge badge-info light">Shipped</span>
                                                </td>
                                                <td>CN</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #98458</a>
                                                </td>
                                                <td>Caleb Richards</td>
                                                <td><span class="text-muted">May 18, 2017</span>
                                                </td>
                                                <td>$38.00</td>
                                                <td><span class="badge badge-danger">Shipped</span>
                                                </td>
                                                <td>AU</td>
                                            </tr>
                                            <tr>
                                                <td><a href="javascript:void(0)">Order #32658</a>
                                                </td>
                                                <td>June Lane</td>
                                                <td><span class="text-muted">Apr 28, 2017</span>
                                                </td>
                                                <td>$77.99</td>
                                                <td><span class="badge badge-success">Paid</span>
                                                </td>
                                                <td>FR</td>
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
