import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import $ from "jquery";

import { postData, getData } from "../../../scripts/api-service";
import { CREATE_CATEGORY_BRAND, GET_CATEGORY_LIST } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";

export default function Brand() {
    const [categories, setCategories] = useState([]);
    const [brands, setBarnds] = useState([]);
    const [brandName, setBrandName] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const getCategories = async () => {
        let res = await getData(GET_CATEGORY_LIST);

        if (res?.data?.isSuccess) {
            setCategories(res.data.data);
        } else {
            toast("Something went wrong");
        }
    };

    const getCategoryBrand = async () => {
        let res = await getData(CREATE_CATEGORY_BRAND);

        if (res?.data?.isSuccess) {
            setBarnds(res.data.data);
        } else {
            toast("Something went wrong");
        }
    }

    const changeHandeler = (e) => {
        let value = e.target.value,
            name = e.target.name;

        if (name === "category") {
            setSelectedCategory(value);
        } else {
            setBrandName(value);
        }
    }

    const addBrand = async (e) => {
        if (brandName && selectedCategory) {
            let body = {
                name: brandName,
                category: selectedCategory
            };


            let res = await postData(CREATE_CATEGORY_BRAND, body);

            if (res?.data?.isSuccess) {
                toast("Brand Add successfully");
                $("#create-featured-modal").modal('hide');
                setSelectedCategory("");
                setBrandName("");
            } else {
                toast("Something went wrong");
            }
        } else {
            toast("Something went wrong");
        }
    }

    useEffect(() => {
        getCategories();
        getCategoryBrand();

    }, []);

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
                                        {
                                            brands.map((brand) => {
                                                return (
                                                <tr key={brand._id}>
                                                    <td>{brand.name}</td>
                                                    <td>{brand.category}</td>
                                                    <td>{dateFormat(brand.creatingDate)}</td>
                                                    <td>{brand.status ? 'Active' : "Inactive"}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <Link to={`/admin/sub-category/${brand.category}/${brand._id}`} className="btn btn-dark shadow btn-xs sharp mr-1"><i className="fa fa-eye"></i></Link>
                                                            <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                            <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                        </div>
                                                    </td>
                                                </tr>)
                                            })
                                        }
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
                            <select className="form-control form-control-lg" name="category" onChange={changeHandeler}>
                                <option>Select category</option>
                                {
                                    categories.length ? (
                                        categories.map((cat, i) => {
                                        return <option key={i} value={cat._id}>{cat.name}</option>
                                        }) 
                                    ) : ""
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand Name</label>
                            <input type="text" onChange={changeHandeler} name="brandName" className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addBrand()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
