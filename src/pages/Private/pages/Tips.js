import React, {Fragment, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';

import $ from "jquery";
import { toast } from 'react-toastify';
import { postData, getData, putData } from "../../../scripts/api-service";
import { GET_TIPS, CREATE_TIPS, UPDATE_TIPS, ADD_TIPS_PHOTO, UPDATE_TIPS_PHOTO } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";

import demoProduct from "../../../assets/images/demo-product.png";

export default function Tips() {
    const [tips, setTips] = useState([]);
    const [name, setName] = useState('');
    const [tipsDetails, setTipsDetails] = useState('');
    const [productImages, setProductImages] = useState([]);
    const baseurl = "http://103.163.246.31:5000:5000/static/";
    const [updateTips, setUpdateTips] = useState();
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        getTips();
    }, []);

    const getTips = async () => {
        let res = await getData(GET_TIPS);

        if (res?.data?.isSuccess) {
            setTips(res.data.data);
        } else {
            toast("Something went wrong");
        }
    }

    const addTips = async () => {
        let data = {
            "name": name,
            "tipsDetails": tipsDetails
        }

        let res = await postData(CREATE_TIPS, data);

        if (res?.data?.isSuccess) {
            toast.success("Tip add successfully");
            setName('');
            setTipsDetails('');
            getTips();
            imageUpload(res.data.data);
            $('#create-tip-modal').modal('hide');
        } else {
            toast("Something went wrong");
        }
    }

    const updateTipsContent = (value) => {
        $('#update-tip-modal').modal('show');
        setUpdateTips(value);
    }

    const updateTrip = async (data) => {
        let res = await putData(UPDATE_TIPS, data);

        if (res?.data?.isSuccess) {
            toast.success("Tip Update successfully");
            getTips();
            $('#update-tip-modal').modal('hide');
            setUpdateTips(null);
        } else {
            toast("Something went wrong");
        }
    }

    const imageUpload = (tip) => {
        setUpdateTips(tip);
        setProductImages(tip.photos);
        $('.image-upload-modal').modal('show');
    }

    const selectImage = async (e) => {
        let element = e.target;
        var file = element.files[0];

        console.log('file', file);
        let data = new FormData();
        data.append("_id", updateTips._id);
        data.append('photos', file);

        let res = await postData(ADD_TIPS_PHOTO, data);

        if (res?.data?.isSuccess) {
            toast.success("Product Image Upload Successfully");
            setProductImages(res?.data?.data?.photos);
        }
    }

    const removeImage = async (photoId, index) => {

        let photo = productImages.filter(e => e !== photoId);
        let data = {
            _id: updateTips._id,
            photos: photo
        }

        let res = await postData(UPDATE_TIPS_PHOTO, data);

        if (res?.data?.isSuccess) {
            toast.success("Product Image Remove Successfully");
            setProductImages(res?.data?.data?.photos);
        } else if (res.msg) {
            toast.error(res.msg);   
        }
    }

    return (
        <Fragment>
            <div className="tip">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All Tips</h4>
                                <button type="button" className="btn light btn-success" data-toggle="modal" data-target="#create-tip-modal">
                                    <i className="fa fa-plus mr-2"></i> Add Tips
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th><strong>NAME</strong></th>
                                                <th><strong>Date</strong></th>
                                                <th><strong>Details</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tips.length ? (
                                                    tips.map((tip, i) => {
                                                        return (<tr key={i}>
                                                            <td>{tip.name}</td>
                                                            <td>{dateFormat(tip.creatingDate)}</td>
                                                            <td>{tip.tipsDetails}</td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <a onClick={() => imageUpload(tip)} className="btn btn-info shadow btn-xs sharp mr-1">
                                                                        <i class="fas fa-image"></i>
                                                                    </a>

                                                                    <a onClick={() => updateTipsContent(tip)} className="btn btn-primary shadow btn-xs sharp mr-1">
                                                                        <i className="fa fa-pencil"></i>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>)
                                                    })
                                                ) : <h3>No Data found</h3>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  

            <div className="modal fade" id="create-tip-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tips Add</h5>
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="form-control"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Details</label>
                                    <input type="text" name="details" onChange={(e) => setTipsDetails(e.target.value)} className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addTips()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="update-tip-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tips Update</h5>
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(updateTrip)}>
                            <div className="modal-body">
                                <input type="hidden" name="_id" ref={register} defaultValue={updateTips?._id} />

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Name</label>
                                        <input type="text" name="name" ref={register} defaultValue={updateTips?.name} className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Details</label>
                                        <input type="text" name="tipsDetails" ref={register} defaultValue={updateTips?.tipsDetails} className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
            <div class="modal fade image-upload-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Image Upload</h5>
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                        </div>

                        <div className="modal-body">
                        <div className="row">
                                {/* img 1 */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !productImages[0] ? <input type="file" id="js-product-img-0" data-content="1" className="form-control" 
                                            onChange={selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                        src={productImages[0] ? baseurl+productImages[0] : demoProduct}
                                        width="120"  alt="" />
                                    {
                                        productImages[0] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => removeImage(productImages[0], 0)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>
                            
                            <div className="row">
                                {/* img 2 */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !productImages[1] ? <input type="file" id="js-product-img-1" data-content="1" className="form-control" 
                                            onChange={selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                    src={productImages[1] ? baseurl+productImages[1] : demoProduct}
                                    width="120" alt="" />
                                    {
                                        productImages[1] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => removeImage(productImages[1], 1)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>

                            <div className="row">
                                {/* img 3  */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !productImages[2] ? <input type="file" id="js-product-img-2" data-content="1" className="form-control" 
                                            onChange={selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                    width="120" alt="" 
                                    src={productImages[2] ? baseurl+productImages[2] : demoProduct}/>
                                    {
                                        productImages[2] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => removeImage(productImages[2], 2)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>

                            <div className="row">
                                {/* img 3  */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !productImages[3] ? <input type="file" id="js-product-img-2" data-content="1" className="form-control" 
                                            onChange={selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                    width="120" alt="" 
                                    src={productImages[3] ? baseurl+productImages[3] : demoProduct}/>
                                    {
                                        productImages[3] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => removeImage(productImages[3], 3)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>

                            <div className="row">
                                {/* img 3  */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !productImages[4] ? <input type="file" id="js-product-img-2" data-content="1" className="form-control" 
                                            onChange={selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                    width="120" alt="" 
                                    src={productImages[4] ? baseurl+productImages[4] : demoProduct}/>
                                    {
                                        productImages[4] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => removeImage(productImages[4], 4)}>Remove Image</button> : ""
                                    }
                                </div>
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
