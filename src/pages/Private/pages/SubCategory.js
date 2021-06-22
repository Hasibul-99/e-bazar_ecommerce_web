import React, {Fragment, useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import $ from "jquery";
import { useParams } from 'react-router-dom';
import swal from 'sweetalert2';

import { postData, getData, putData } from "../../../scripts/api-service";
import { GET_CATEGORY_BRAND, GET_CATEGORY_BRAND_SUB_CATEGORY, CREATE_SUB_CATEGORY, UPDATE_SUBCATEGORY } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";
import Pagination from "../common/Pagination";

export default function SubCategory() {
    const [brandInfo, setBrandInfo] = useState();
    const [subName, getSubName] = useState("");
    const [brandSubCategory, getBrandSubCategory] = useState();
    const { categoryId, brandId } = useParams();
    const [subCategoryUpadet, setsubCategoryUpadet] = useState();
    const [subCategoryUpadetName, setsubCategoryUpadetName] = useState();

    useEffect(() => {
        if (brandId) {
            getBrandInfo();
            getSubBrandCategory()
        }
    }, []);

    const getBrandInfo = async () => {
        let res = await getData(GET_CATEGORY_BRAND+ '?_id=' + brandId);

        if (res?.data?.isSuccess) {
            setBrandInfo(res?.data?.data[0]);
        } else {
            toast("Something went wrong");
        }
    }

    const getSubBrandCategory = async (page) => {
        // let res = await getData(GET_CATEGORY_BRAND_SUB_CATEGORY+ '?categoryBrand=' + brandId);
        let query = page ? GET_CATEGORY_BRAND_SUB_CATEGORY+ '?categoryBrand=' + brandId + '&page='+ page : GET_CATEGORY_BRAND_SUB_CATEGORY+ '?categoryBrand=' + brandId;
        let res = await getData(query);

        if (res?.data?.isSuccess) {
            getBrandSubCategory(res?.data?.data);
        } else {
            toast("Something went wrong");
        }
    }

    const saveSubCategory = async (e) => {
        if (subName && categoryId && brandId) {
            let body = {
                name: subName,
                category: categoryId,
                categoryBrand: brandId
            };

            let res = await postData(CREATE_SUB_CATEGORY, body);

            if (res?.data?.isSuccess) {
                toast.success("Brand Add successfully");
                $("#create-product-modal").modal('hide');
                getSubName("");
                getSubBrandCategory();
            } else {
                toast.error("Something went wrong");
            }
        } else {
            toast.error("Something went wrong");
        }
    } 

    const changeHandeler = (e) => {
        let value = e.target.value;
        getSubName(value);
    }

    const updateSubcategory = (data) => {
        setsubCategoryUpadet(data);
        setsubCategoryUpadetName(data.name);
        $("#update-product-modal").modal('show');
    }

    const editSubCategory = async () => {
        if (subCategoryUpadetName) {
            let res = await putData(UPDATE_SUBCATEGORY, 
                {
                    "_id": subCategoryUpadet._id,
                    "name": subCategoryUpadetName,
                    "category": subCategoryUpadet.category,
                    "categoryBrand": subCategoryUpadet.categoryBrand,
                    "status": true,
            });

            if (res?.data?.isSuccess) {
                toast("Sub-category Update Successfully");
                $("#update-product-modal").modal('hide');
                setsubCategoryUpadet();
                setsubCategoryUpadetName();

                getSubBrandCategory();
            } else {
                toast("Something went wrong");
            }
        } else {
            toast("Name is required");
        }
    };

    const handelPagination = (page) => {
        getSubBrandCategory(page);
    }

    const deleteSubcategory = (subCategoryUpadet) => {
        swal.fire({
            title: 'Are you sure?',
            text:'You want to delete this sub category!',
            icon: 'warning',
            showCancelButton: "true",
            confirmButtonText:'Yes, Approve it!',
            cancelButtonText: 'Cancel',
          }).then( async result => {
            if (result.value) {
                let res = await putData(UPDATE_SUBCATEGORY, 
                    {
                        "_id": subCategoryUpadet._id,
                        "name": subCategoryUpadet.name,
                        "category": subCategoryUpadet.category,
                        "categoryBrand": subCategoryUpadet.categoryBrand,
                        "status": false,
                });

                if (res?.data?.isSuccess) {
                    getSubBrandCategory();
                } else {
                    toast("Something went wrong");
                }
            }
        })
    }

    return (
        <Fragment>
            <div className="sub-category">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Brand <span className="text-info">{brandInfo?.name}</span> Sub-categories</h4>
                            <button type="button" className="btn light btn-success" data-toggle="modal" data-target="#create-product-modal">
                                <i className="fa fa-plus mr-2"></i> Add Sub-category
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
                                            brandSubCategory && brandSubCategory.length ? (
                                                brandSubCategory.map((data, i) => {
                                                    return <tr key={i}>
                                                        <td>{data.name}</td>
                                                        <td>{dateFormat(data.creatingDate)}</td>
                                                        <td>{data.status ? 'Active' : "Inactive"}</td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <a onClick={() => updateSubcategory(data)} className="btn btn-primary shadow btn-xs sharp mr-1"><i className="fa fa-pencil"></i></a>
                                                                <a onClick={() => deleteSubcategory(data)} className="btn btn-danger shadow btn-xs sharp"><i className="fa fa-trash"></i></a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            ) : <h3>No Data found</h3>
                                        }
                                    </tbody>
                                </table>
                            </div>

                            
                            <Pagination
                                    handelPagination={handelPagination}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="create-product-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Sub-category from {brandInfo?.name}</h5>
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Sub-category Name</label>
                            <input type="text" name="subName" onChange={changeHandeler} value={subName} className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveSubCategory}>Save</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="update-product-modal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Sub-category from {brandInfo?.name}</h5>
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Sub-category Name</label>
                            <input type="text" name="subName" onChange={e => setsubCategoryUpadetName(e.target.value)} value={subCategoryUpadetName} className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={editSubCategory}>Save</button>
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
