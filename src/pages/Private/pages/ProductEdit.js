import React, { Component, Fragment } from 'react';
import { putData, postData, getData } from "../../../scripts/api-service";
import { GET_RPODUCT, 
        GET_CATEGORY_LIST, 
        GET_CATEGORY_BRAND, 
        GET_CATEGORY_BRAND_SUB_CATEGORY,
        UPDATE_PRODUCT,
        UPLOAD_RPODUCT_IMAGE,
        REMOVE_PRODUCT_PHOTO } from "../../../scripts/api";

import { toast } from 'react-toastify';
import demoProduct from "../../../assets/images/demo-product.png";

export default class ProductEdit extends Component {
    formData = {
        "name": "",
        "regularPrice": 0,
        "sellPrice": 0,
        "stock": 0,
        "sku": 0,
        "category": "",
        "categoryBrand": "",
        "categoryBrandSubCategory": "",
        "discountPrice": 0,
        "isFlushSell": false,
        "isSlideProduct": false,
        "isBundleProduct": false,
        "productDetails": ""
    }

    constructor(props) {
        super(props);
        this.state = {
            productId: props?.match?.params?.productId,
            productInfo: null,
            categoryList: [],
            brandList: [],
            subCategoryList: [],
            formData: this.formDatam,
            productImages: []
        };
    }

    componentDidMount() {
        this.getProductInfo();
        this.getCategoryList();
    }

    getCategoryList = async () => {
        let res = await getData(GET_CATEGORY_LIST + "?limit=1000");

        if (res?.data?.isSuccess) {
            this.setState({categoryList: res?.data?.data});
        }
    }

    selectCategory = (e) => {
        this.setState({selectedCategory: e.target.value});
        this.getBrandList(e.target.value);
    };

    getBrandList = async (categoryId) => {
        let res = await getData(GET_CATEGORY_BRAND + '?category=' + categoryId + "&limit=1000");

        if (res?.data?.isSuccess) {
            this.setState({brandList: res.data.data});
        }
    }

    selectBrand = (e) => {
        this.setState({selectedBrand: e.target.value});
        this.getSubCategoryList(e.target.value);
    }

    getSubCategoryList = async (brandId) => {
        let res = await getData(GET_CATEGORY_BRAND_SUB_CATEGORY + '?categoryBrand=' + brandId + "&limit=1000");

        if (res?.data?.isSuccess) {
            this.setState({subCategoryList: res?.data?.data})
        }
    }

    selectSubCategory = (e) => {
        this.setState({selectedSubCategory: e.target.value});
    }

    getProductInfo = async () => {
        let url = GET_RPODUCT + '?_id='+ this.state.productId ;
        let res = await getData(url);

        if (res?.data?.isSuccess) {
            let masterData = res?.data?.data[0]
            this.setState({productInfo: masterData});

            console.log("masterData", masterData);

            this.setState({
                formData: {
                  ...this.state.formData,
                  ["name"]: masterData.name,
                  ["regularPrice"]: masterData.regularPrice,
                  ["sellPrice"]: masterData.sellPrice,
                  ["stock"]: masterData.stock,
                  ["sku"]: masterData.sku,
                  ["category"]: masterData.category,
                  ["categoryBrand"]: masterData.categoryBrand,
                  ["categoryBrandSubCategory"]: masterData.categoryBrandSubCategory,
                  ["discountPrice"]: masterData.discountPrice,
                  ["isFlushSell"]: masterData.isFlushSell,
                  ["isSlideProduct"]: masterData.isSlideProduct,
                  ["isBundleProduct"]: masterData.isBundleProduct,
                  ["productDetails"]: masterData.productDetails,
                },
            });

            this.setState({productImages: masterData.photos});
        }
    } 

    changeHandeler = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value,
            },
        });
    }

    updateProduct = async () => {
        let data = this.state.formData;
        data._id = this.state.productId;

        let res = await putData(UPDATE_PRODUCT, data);

        console.log("res", res);

        if (res.data.isSuccess) {
            toast.success('Product update successfully')
        } else {
            toast.error(res.msg);
        }
    };

    selectImage = async (e) => {
        let instance = this;
        let element = e.target;
        var file = element.files[0];

        let data = new FormData();
        data.append("_id", this.state.productId);
        data.append('photos', file);

        let res = await postData(UPLOAD_RPODUCT_IMAGE, data);

        if (res?.data?.isSuccess) {
            toast.success("Product Image Upload Successfully");
            this.getProductInfo();
        }
    }

    removeImage = async (photoId, index) => {
        let photo = this.state.productImages.filter(e => e !== photoId);
        let data = {
            _id: this.state.productId,
            photos: photo
        }

        let res = await postData(REMOVE_PRODUCT_PHOTO, data);

        if (res?.data?.isSuccess) {
            toast.success("Product Image Remove Successfully");
            this.getProductInfo();
        } else if (res.msg) {
            toast.error(res.msg);   
        }
    } 


    render() {
        const baseurl = "http://easyexpress24.com:5000/static/";
        
        return (
            <div className="add-product">
                <h3>Add Products</h3>

                <div className="card mt-3">
                    <div className="card-body">
                        <div className="row">
                            <Fragment>
                                <div className="form-group col-12">
                                    <label>Product Name</label>
                                    <input type="text" className="form-control" value={this.state?.formData?.name}
                                        name="name" onChange={this.changeHandeler}/>
                                </div>
                                <div className="form-group col-6">
                                    <label>Regular Price</label>
                                    <input type="text" className="form-control" value={this.state?.formData?.regularPrice}
                                        name="regularPrice" onChange={this.changeHandeler} />
                                </div>
                                <div className="form-group col-6">
                                    <label>Sell Price</label>
                                    <input type="text" className="form-control" value={this.state?.formData?.sellPrice}
                                        name="sellPrice" onChange={this.changeHandeler}/>
                                </div>
                                <div className="form-group col-6">
                                    <label>Stock</label>
                                    <input type="text" className="form-control" value={this.state?.formData?.stock}
                                        name="stock" onChange={this.changeHandeler} />
                                </div>
                                
                                <div className="form-group col-6">
                                    <label>SKU (Stock keeping unit)</label>
                                    <input type="text" className="form-control" value={this.state?.formData?.sku}
                                        name="sku" onChange={this.changeHandeler}/>
                                </div>
                                
                                <div className="form-group col-6">
                                    <label>Discount Price</label>
                                    <input type="text" className="form-control" value={this.state?.formData?.discountPrice}
                                        name="discountPrice" onChange={this.changeHandeler}/>
                                </div>
                                <div className="form-group col-6">
                                    <label>Category</label>
                                    <select class="custom-select" name="category" value={this.state?.formData?.category} onChange={this.selectCategory}>
                                        <option value="">Select Category</option>
                                        {
                                            this.state.categoryList?.length ? (
                                                this.state.categoryList.map(item => {
                                                    return <Fragment key={item._id}>
                                                            <option value={item._id}>{item.name}</option>
                                                        </Fragment>
                                                })
                                            ) : "No Data Found"
                                        }
                                        
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>Brand</label>
                                    <select class="custom-select" name="categoryBrand" 
                                        value={this.state.formData?.categoryBrand} onChange={this.selectBrand}>
                                        <option value="">Select Brand</option>
                                        {
                                            this.state.brandList?.length ? (
                                                this.state.brandList.map(item => {
                                                    return <Fragment key={item._id}>
                                                            <option value={item._id}>{item.name}</option>
                                                        </Fragment>
                                                })
                                            ) : "No Data Found"
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>Sub-Category</label>
                                    <select class="custom-select" value={this.state.formData?.categoryBrandSubCategory} 
                                        name="categoryBrandSubCategory" onChange={this.selectSubCategory}>
                                        <option value="">Select Sub-Category</option>
                                        {
                                            this.state.subCategoryList?.length ? (
                                                this.state.subCategoryList.map(item => {
                                                    return <Fragment key={item._id}>
                                                            <option value={item._id}>{item.name}</option>
                                                        </Fragment>
                                                })
                                            ) : "No Data Found"
                                        }
                                    </select>
                                </div>
                                
                                <div className="form-group col-6">
                                    <label>Slider</label>
                                    <select class="custom-select" value={this.state.formData?.isSlideProduct}
                                        name="isSlideProduct" onChange={this.changeHandeler}>
                                        <option value="false">NO</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>

                                <div className="form-group col-6">
                                    <label>Flash Sall</label>
                                    <select class="custom-select" value={this.state.formData?.isFlushSell}
                                        name="isFlushSell" onChange={this.changeHandeler}>
                                        <option value="false">NO</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>

                                <div className="form-group col-6">
                                    <label>Bundle Offer</label>
                                    <select class="custom-select" value={this.state.formData?.isBundleProduct}
                                        name="isBundleProduct" onChange={this.changeHandeler}>
                                        <option value="false">NO</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>

                                <div className="form-group col-6">
                                    <label>Product Details</label>
                                    <input type="text" className="form-control" value={this.state.formData?.productDetails}
                                        name="productDetails" onChange={this.changeHandeler}/>
                                </div>

                                <div className="form-group col-12 text-right">
                                    <button type="button" className="btn btn-square btn-outline-primary"  
                                        onClick={this.updateProduct}>Update Product Info</button>
                                </div>
                            </Fragment>
                        </div>

                        <hr/>

                        <div className="product-images">
                            <div className="row">
                                {/* img 1 */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !this.state?.productImages[0] ? <input type="file" id="js-product-img-0" data-content="1" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                        src={this.state?.productImages[0] ? baseurl+this.state?.productImages[0] : demoProduct}
                                        height="200" width="200"  alt="" />
                                    {
                                        this.state?.productImages[0] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => this.removeImage(this.state.productImages[0], 0)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>
                            
                            <div className="row">
                                {/* img 2 */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !this.state?.productImages[1] ? <input type="file" id="js-product-img-1" data-content="1" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                    src={this.state?.productImages[1] ? baseurl+this.state?.productImages[1] : demoProduct}
                                    height="200" width="200" alt="" />
                                    {
                                        this.state?.productImages[1] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => this.removeImage(this.state.productImages[1], 1)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>

                            <div className="row">
                                {/* img 3  */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !this.state?.productImages[2] ? <input type="file" id="js-product-img-2" data-content="1" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                    height="200" width="200" alt="" 
                                    src={this.state?.productImages[2] ? baseurl+this.state?.productImages[2] : demoProduct}/>
                                    {
                                        this.state?.productImages[2] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => this.removeImage(this.state.productImages[2], 2)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>

                            <div className="row">
                                {/* img 4 */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !this.state?.productImages[3] ? <input type="file" id="js-product-img-3" data-content="1" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                        height="200" width="200" alt=""
                                        src={this.state?.productImages[3] ? baseurl+this.state?.productImages[3] : demoProduct} />
                                    {
                                        this.state?.productImages[3] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => this.removeImage(this.state.productImages[3], 3)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>

                            <hr/>

                            <div className="row">
                                {/* img 5  */}
                                <div className="form-group col-6">
                                    <label>Image</label>
                                    {
                                        !this.state?.productImages[4] ? <input type="file" id="js-product-img-4" data-content="4" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png, image/gif, image/jpeg" /> : ''
                                    }
                                </div>

                                <div className="col-6">
                                    <img className="img-thumbnail" id="js-product-img-view-1" 
                                        height="200" width="200" alt="" 
                                        src={this.state?.productImages[4] ? baseurl+this.state?.productImages[4] : demoProduct}/>
                                    {
                                        this.state?.productImages[4] ? <button type="button" className="btn btn-danger ml-3" 
                                            onClick={() => this.removeImage(this.state.productImages[4], 4)}>Remove Image</button> : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
