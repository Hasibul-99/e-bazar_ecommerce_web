import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

import swal from 'sweetalert2';
import { postData, getData, deleteData } from "../../../scripts/api-service";
import { GET_RPODUCT, PRODUCT_DELETE, PRODUCT_LIST_SEARCH } from "../../../scripts/api";
import Pagination from "../common/Pagination";

import {loadPageVar} from "../../../scripts/helper";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageValue: 1, 
            products: [],
            userData: null,
            search: {
                name: ''
            }
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));
        this.setState({ userData: user });

        this.setState({pageValue: loadPageVar('page') });
        this.getProductList(loadPageVar('page'));
    }

    getProductList = async (page = 1) => {
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));

        let url = user.userType === "MARCHANT" ? PRODUCT_LIST_SEARCH + '?page='+ page + "&limit=60" + '&productOwner=' + user._id  : PRODUCT_LIST_SEARCH + '?page='+ page + "&limit=60" ;
        
        if (this.state.search.name) url = url + "&name=" + this.state.search.name;

        let res = await getData(url);

        if (res?.data?.isSuccess) {
            this.setState({products: res?.data?.data});
        }
    };

    handelPagination = (page) => {
        this.props.history.push(`${window.location.pathname}?page=${page}`);
        this.getProductList(page);
    }

    deleteProduct = (data) => {
        swal.fire({
            title: 'Are you sure?',
            text:'You want to delete this product!',
            icon: 'warning',
            showCancelButton: "true",
            confirmButtonText:'Yes, Delete it!',
            cancelButtonText: 'Cancel',
          }).then( async result => {
            if (result.value) {
                let res = await deleteData(PRODUCT_DELETE + data._id);

                if (res?.data?.isSuccess) {
                    this.getProductList(this.state.pageValue);
                    toast.success("Product Deleted Successfully");
                } else {
                    toast("Something went wrong");
                }
            }
        })
    }

    searchKeyPresss = async (e) => {
        let value = e.target.value;
        if (value.length) {
            this.setState(prevState => ({
                search: {                   // object that we want to update
                    ...prevState.search,    // keep all other key-value pairs
                    name: value       // update the value of specific key
                }
            }));

            this.getProductList();
        } else {
            this.getProductList();
        }
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
                                    <select className="form-control form-control-lg">
                                        <option>Status</option>
                                        <option>Option 2</option>
                                        <option>Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group ">
                                    <input type="text" className="form-control input-default" onKeyUp={this.searchKeyPresss}
                                        placeholder="Search by Name"/>
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
                                                    return <tr key={data._id}>
                                                                <td>{data.name}</td>
                                                                <td>{data.regularPrice}</td>
                                                                <td>{data.sellPrice}</td>
                                                                <td>
                                                                    {data.stock > 1 ? 
                                                                        <span className="badge badge-success">{data.stock}</span> : 
                                                                        <span className="badge badge-danger">{data.stock}</span>
                                                                    }
                                                                </td>
                                                                <td>{data.totalSell}</td>
                                                                <td>{data.discountPrice}</td>
                                                                <td>{data.stock > 1 ? 
                                                                    <span className="badge badge-success">Availabe</span> : 
                                                                    <span className="badge badge-danger">Not Availabe</span>}
                                                                </td>
                                                                <td>
                                                                    <Link to={`/admin/edit-products/${data._id}`} className="btn btn-primary shadow btn-xs sharp mr-1">
                                                                        <i className="fa fa-pencil"></i>
                                                                    </Link>
                                                                    <a onClick={() => this.deleteProduct(data)} className="btn btn-danger shadow btn-xs sharp">
                                                                        <i className="fa fa-trash"></i>
                                                                    </a>
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
                
        <br/>
        <br/>
        <br/>
            </div>
        )
    }
}
