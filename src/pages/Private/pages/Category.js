import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import $ from "jquery";

// import { checkRes } from "../../../scripts/checkRes";
import { postData, getData } from "../../../scripts/api-service";
import { CREATE_CATEGORY, GET_CATEGORY_LIST } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";

export default function Category() {
    const [categoryName, setCategoryName] = useState();
    const [categoryList, setCategoryList] = useState([]);

    const changeHandeler = (e) => {
        let value = e.target.value;
        setCategoryName(value);
    }

    const addCategory = async () => {
        if (categoryName) {
            let res = await postData(CREATE_CATEGORY, {name: categoryName});

            if (res?.data?.isSuccess) {
                toast("Category Add successfully");
                $("#create-category-modal").modal('hide');
                setCategoryName("");
            } else {
                toast("Something went wrong");
            }
        } else {
            toast("Category name is required");
        }
    }

    const getCategoryList = async () => {
        let res = await getData(GET_CATEGORY_LIST);

        if (res?.data?.isSuccess) {
            setCategoryList(res.data.data);
        } else {
            toast("Something went wrong");
        }
    }

    useEffect(() => {
        getCategoryList()
    }, []);

    return (
        <Fragment>
        <div className="category">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Categories</h4>
                            <button type="button" className="btn light btn-success" data-toggle="modal" data-target="#create-category-modal">
                                <i className="fa fa-plus mr-2"></i> Add Category
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th><strong>NAME</strong></th>
                                            <th><strong>Date</strong></th>
                                            <th><strong>Status</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categoryList.length ? (
                                                categoryList.map((category, i) => {
                                                    return (<tr key={i}>
                                                        <td>{category.name}</td>
                                                        <td>{dateFormat(category.creatingDate)}</td>
                                                        <td>{category.status ? "Active" : "Inactive"}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={`/admin/brand/${category._id}`} className="btn btn-dark shadow btn-xs sharp mr-1"><i className="fa fa-eye"></i></Link>
                                                                <a href="#" className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a href="#" className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </div>
                                                        </td>
                                                    </tr>)
                                                })
                                            ) : ""
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="create-category-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Category Add</h5>
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Category Name</label>
                                <input type="text" name="category_name" onChange={changeHandeler} className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addCategory()}>Save</button>
                    </div>
                </div>
            </div>
        </div>

    </Fragment>
    )
}
