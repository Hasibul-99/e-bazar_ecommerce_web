import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import $ from "jquery";
import { useParams } from 'react-router-dom';
import swal from 'sweetalert2';

import { postData, getData, putData } from "../../../scripts/api-service";
import { CREATE_CATEGORY_BRAND, GET_CATEGORY_LIST, GET_CATEGORY_BRAND, UPDATE_BRAND } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";
import Pagination from "../common/Pagination";

export default function Brand() {
    const [categorie, setCategories] = useState([]);
    const [brands, setBarnds] = useState([]);
    const [brandName, setBrandName] = useState();
    const { categoryId } = useParams();
    const [updateBrand, setUpdateBrand] = useState();
    const [updateBrandName, setUpdateBrandName] = useState()

    useEffect(() => {
        if (categoryId) {
            getCategorie();
            getCategoryBrand();
        }
    }, []);

    const getCategorie = async () => {
        let res = await getData(GET_CATEGORY_LIST+ '?_id=' + categoryId);

        if (res?.data?.isSuccess) {
            setCategories(res?.data?.data[0]);
        } else {
            toast("Something went wrong");
        }
    };

    const getCategoryBrand = async (page) => {
        // let res = await getData(GET_CATEGORY_BRAND + '?category=' + categoryId);

        let query = page ? GET_CATEGORY_BRAND + '?category=' + categoryId + '&page='+ page : GET_CATEGORY_BRAND + '?category=' + categoryId;
        let res = await getData(query);


        if (res?.data?.isSuccess) {
            setBarnds(res.data.data);
        } else {
            toast("Something went wrong");
        }
    }

    const changeHandeler = (e) => {
        let value = e.target.value;
        setBrandName(value);
    }

    const addBrand = async (e) => {
        if (brandName && categoryId) {
            let body = {
                name: brandName,
                category: categoryId
            };


            let res = await postData(CREATE_CATEGORY_BRAND, body);

            if (res?.data?.isSuccess) {
                toast.success("Brand Add successfully");
                $("#create-featured-modal").modal('hide');
                setBrandName("");
                getCategoryBrand();
            } else {
                toast.error("Something went wrong");
            }
        } else {
            toast("Something went wrong");
        }
    }

    const updateBrandContent = (data) => {
        setUpdateBrand(data);
        setUpdateBrandName(data.name);
        $("#update-featured-modal").modal('show');
    }

    const changeHandelerUpdate = (e) => {
        setUpdateBrandName(e.target.value);
    }

    const editBrand = async () => {
        if (updateBrandName) {
            let res = await putData(UPDATE_BRAND, 
                {name: updateBrandName,
                _id: updateBrand._id,
                category: updateBrand.category,
                status: true,
            });

            if (res?.data?.isSuccess) {
                toast("Brand Update Successfully");
                $("#update-featured-modal").modal('hide');
                setUpdateBrand();
                setUpdateBrandName();

                getCategoryBrand();
            } else {
                toast("Something went wrong");
            }
        } else {
            toast("Category name is required");
        }
    }

    const handelPagination = (page) => {
        getCategoryBrand(page);
    }

    const deleteBrand = (barnd) => {
        swal.fire({
            title: 'Are you sure?',
            text:'You want to delete this Brand!',
            icon: 'warning',
            showCancelButton: "true",
            confirmButtonText:'Yes, Approve it!',
            cancelButtonText: 'Cancel',
          }).then( async result => {
            if (result.value) {
                let res = await putData(UPDATE_BRAND, {name: barnd.name,
                    _id: barnd._id,
                    category: barnd.category,
                    status: false,
                });
                if (res?.data?.isSuccess) {
                    getCategoryBrand();
                } else {
                    toast("Something went wrong");
                }
            }
        })
    }



    return (
        <Fragment>
        <div className="brand">
            <div className="row">
            <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Category <span className="text-info">{categorie.name}</span> Brands</h4>
                            <button type="button" className="btn light btn-success" data-toggle="modal" data-target="#create-featured-modal">
                                <i className="fa fa-plus mr-2"></i> Add Brand
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                {
                                    brands?.length ? <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th><strong>NAME</strong></th>
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
                                                        <td>{dateFormat(brand.creatingDate)}</td>
                                                        <td>{brand.status ? 'Active' : "Inactive"}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link to={`/admin/sub-category/${brand.category}/${brand._id}`} className="btn btn-dark shadow btn-xs sharp mr-1"><i className="fa fa-eye"></i></Link>
                                                                <a onClick={() => updateBrandContent(brand)} className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a onClick={() => deleteBrand(brand)} className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </div>
                                                        </td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    </table> : <h3>No Data found</h3>
                                }
                                
                            </div>

                            <Pagination
                                    handelPagination={handelPagination}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="create-featured-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Brand from {categorie.name}</h5>
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Brand Name</label>
                            <input type="text" onChange={changeHandeler} value={brandName}
                                name="brandName" className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addBrand()}>Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="update-featured-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Brand from {categorie.name}</h5>
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Brand Name</label>
                            <input type="text" onChange={changeHandelerUpdate} value={updateBrandName}
                                name="brandName" className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => editBrand()}>Update</button>
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
