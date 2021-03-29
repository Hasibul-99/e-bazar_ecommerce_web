import React, { Component, Fragment } from 'react';
import $ from "jquery";

import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

import { putData, getData } from "../../../scripts/api-service";
import { GET_ORDER_LIST, UPDATE_ORDER } from "../../../scripts/api";
import Pagination from "../common/Pagination";

import {loadPageVar, dateFormat} from "../../../scripts/helper";
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
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));

        if (user && user.userType === "MARCHANT") {
            url = page ? GET_ORDER_LIST + '?page='+ page + '&products.productOwner=' + user._id : GET_ORDER_LIST + '?products.productOwner=' + user._id;
        }

        let res = await getData(url);

        if (res?.data?.isSuccess) {
            this.setState({orderList: res?.data?.data});
        }
    }

    updateStatus = async (orderId, type) => {
        let res = await putData(UPDATE_ORDER, {
            "_id": orderId,
            "orderStatus": type
        });

        if (res?.data?.isSuccess) {
            this.getOrderList(this.state.pageValue);
            toast.success('Order Update Successfully');
        } else {
            toast.error("Something went wrong!");
        }
    }

    handelPagination = (page) => {
        this.props.history.push(`${window.location.pathname}?page=${page}`);
        this.getOrderList(page);
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
                                                {/* <th><strong>Order</strong></th> */}
                                                <th><strong>Customer</strong></th>
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
                                                this.state.orderList.map(list => {
                                                    return <Fragment>
                                                        <tr key={list._id}>
                                                            {/* <td><strong>01</strong></td> */}
                                                            <td>{list?.user?.name}</td>
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
                                                                        <a className="dropdown-item" onClick={() => {this.updateStatus(list._id, 'DELIVERD')}}>DELIVERD</a>
                                                                        <a className="dropdown-item" onClick={() => {this.updateStatus(list._id, 'CANCEL')}}>CANCEL</a>
                                                                        <a className="dropdown-item" onClick={() => {this.updateStatus(list._id, 'PENDING')}}>PENDING</a>
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
                                <Pagination
                                    handelPagination={this.handelPagination}
                                ></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        <br/>
        <br/>
        <br/>
            </Fragment>
        )
    }
}
