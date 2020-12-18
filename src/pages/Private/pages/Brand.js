import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

export default function Brand() {
    return (
        <Fragment>
<div className="brand">
            <div className="row">
            <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Brand</h4>
                            <button type="button" className="btn light btn-success" data-toggle="modal" data-target="#create-featured-modal">
                                <i className="fa fa-plus mr-2"></i> Add Brand
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th><strong>NAME</strong></th>
                                            <th><strong>Category</strong></th>
                                            <th><strong>Date</strong></th>
                                            <th><strong>Status</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dr. Jackson</td>
                                            <td>XYZ</td>
                                            <td>01 August 2020</td>
                                            <td>Active</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link to="/admin/sub-category/12/15" className="btn btn-dark shadow btn-xs sharp mr-1"><i className="fa fa-eye"></i></Link>
                                                    <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                    <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dr. Jackson</td>
                                            <td>XYZ</td>
                                            <td>01 August 2020</td>
                                            <td>Active</td>
                                            <td>
                                                <div className="d-flex">
                                                    <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                    <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dr. Jackson</td>
                                            <td>XYZ</td>
                                            <td>01 August 2020</td>
                                            <td>Active</td>
                                            <td>
                                                <div className="d-flex">
                                                    <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                    <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
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

        <div className="modal fade" id="create-featured-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Brand Add</h5>
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Category Name</label>
                            <select className="form-control form-control-lg">
                                <option>Select category</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand Name</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
