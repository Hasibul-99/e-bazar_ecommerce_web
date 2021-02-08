import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

import { postData, getData } from "../../../scripts/api-service";
import { GET_RPODUCT } from "../../../scripts/api";
import Pagination from "../common/Pagination";

import {loadPageVar} from "../../../scripts/helper";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageValue: 1, 
            products: []
        };
    }

    componentDidMount() {
        this.setState({pageValue: loadPageVar('page') });
        this.getProductList(loadPageVar('page'));
    }

    getProductList = async (page) => {
        let url = page ? GET_RPODUCT + '?page='+ page : GET_RPODUCT;
        let res = await getData(url);

        if (res?.data?.isSuccess) {
            this.setState({products: res?.data?.data});
        }
    };

    handelPagination = (page) => {
        this.props.history.push(`${window.location.pathname}?page=${page}`);
        this.getProductList(page);
    }

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
                                <div className="form-group d-none">
                                    <input type="text" className="form-control input-default "
                                        placeholder="Quick Search by ID"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group d-none">
                                    <select className="form-control form-control-lg">
                                        <option>Status</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4 text-right">
                                <div className="form-group">
                                    <Link to="/admin/add-products" className="btn light btn-success">
                                        <i className="fa fa-plus mr-2"></i>
                                        Add Product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            {/* <div className="card-header">
                                <h4 className="card-title">Responsive Table</h4>
                            </div> */}
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Regular Price</th>
                                                <th>Sell Price</th>
                                                <th>Stock</th>
                                                <th>Total Sell</th>
                                                <th>Discount Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                               this.state.products?.length ? (
                                                    this.state.products.map((data) => {
                                                    return <tr>
                                                                <td>{data.name}</td>
                                                                <td>{data.regularPrice}</td>
                                                                <td>{data.sellPrice}</td>
                                                                <td>{data.stock}</td>
                                                                <td>{data.totalSell}</td>
                                                                <td>{data.discountPrice}</td>
                                                                <td>{data.status ? 
                                                                    <span className="badge badge-success">Availabe</span> : 
                                                                    <span className="badge badge-danger">Not Availabe</span>}
                                                                </td>
                                                                <td>
                                                                    <Link to={`/admin/edit-products/${data._id}`} className="btn btn-info">
                                                                        Edit
                                                                    </Link>
                                                                </td>
                                                            </tr>   
                                                    })
                                               ) : <h3>No Data found</h3>
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination
                                    handelPagination={this.handelPagination}
                                ></Pagination>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}
