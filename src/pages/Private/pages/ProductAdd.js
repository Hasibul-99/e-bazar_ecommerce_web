import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';

import { postData, getData } from "../../../scripts/api-service";
import { GET_CATEGORY_LIST, GET_CATEGORY_BRAND, GET_CATEGORY_BRAND_SUB_CATEGORY, ADD_PRODUCT, UPLOAD_RPODUCT_IMAGE } from "../../../scripts/api";

import demoProduct from "../../../assets/images/demo-product.png";
export default class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowFirstPart: true,
            categoryList: [],
            selectedCategory: null,
            brandList: [],
            selectedBrand: null,
            subCategoryList: [],
            selectedSubCategory: null,
            name: "",
            regularPrice: 0,
            sellPrice: 0,
            stock: 0,
            sku: "",
            discountPrice:0,
            isFlushSell: false,
            isSlideProduct: false,
            isBundleProduct: false,
            productDetails: "",

            productId: "",
            imageUploded: [],
        };
    }

    componentDidMount() {
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

    changeHandeler = (e) => {
        let name = e.target.name,
            val = e.target.value;

        this.setState({[name]: val});
    }

    saveProduct = async () => {
        let data = {
            "name": this.state.name,
            "regularPrice": this.state.regularPrice,
            "sellPrice": this.state.sellPrice,
            "stock": this.state.stock,
            "sku": this.state.sku,
            "discountPrice": this.state.discountPrice,
            "isFlushSell": this.state.isFlushSell,
            "isSlideProduct": this.state.isSlideProduct,
            "isBundleProduct": this.state.isBundleProduct,
            "productDetails": this.state.productDetails,
            "category": this.state.selectedCategory,
            "categoryBrand": this.state.selectedBrand,
            "categoryBrandSubCategory": this.state.selectedSubCategory
        };

        if (!data.categoryBrandSubCategory) data.categoryBrand = ""; // for non brand product

        let res = await postData(ADD_PRODUCT, data);

        if (res?.data?.isSuccess) {
            this.setState({isShowFirstPart: false, productId: res.data?.data?._id});
        } else if (res.msg) {
            toast.error(res.msg);
        } else {
            toast.error("Something went wrong!");
        }
    }

    selectImage = (e) => {
        let instance = this;
        let element = e.target;
        var dataID = element.getAttribute('data-content');

        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            let result = reader.result;

            let ele = document.getElementById(`js-product-img-view-${dataID}`);
            ele.src = result;

            instance.setState({imageUploded: [...instance.state.imageUploded, dataID]});
        }
        reader.readAsDataURL(file);
    }

    saveImages = async () => {
        let data = new FormData();
        data.append("_id", this.state.productId);

        if ( this.state?.imageUploded?.length ) {
            this.state.imageUploded.forEach(i => {
                let ele = document.getElementById(`js-product-img-${i}`);
                let file = ele.files[0];
                data.append('photos', file);
            });
        }

        let res = await postData(UPLOAD_RPODUCT_IMAGE, data);

        if (res?.data?.isSuccess) {
            toast.success("Product Image Upload Successfully");
            
            setTimeout(() => {
                window.location = '/admin/products';
            }, 1500);
        }
    }

    render() {
        return (
            <div className="add-product">
                <h3>Add Products</h3>

                <div className="card mt-3">
                    <div className="card-body">
                        <div className="row">
                            {
                                this.state.isShowFirstPart ? <Fragment>
                                    <div className="form-group col-12">
                                        <label>Product Name</label>
                                        <input type="text" className="form-control" name="name" onChange={this.changeHandeler}/>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Regular Price</label>
                                        <input type="text" className="form-control" name="regularPrice" onChange={this.changeHandeler} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Sell Price</label>
                                        <input type="text" className="form-control" name="sellPrice" onChange={this.changeHandeler}/>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Stock</label>
                                        <input type="text" className="form-control" name="stock" onChange={this.changeHandeler} />
                                    </div>
                                    
                                    <div className="form-group col-6">
                                        <label>SKU (Stock keeping unit)</label>
                                        <input type="text" className="form-control" name="sku" onChange={this.changeHandeler}/>
                                    </div>
                                    
                                    <div className="form-group col-6">
                                        <label>Discount Price</label>
                                        <input type="text" className="form-control" name="discountPrice" onChange={this.changeHandeler}/>
                                    </div>

                                    <div className="form-group col-6">
                                        <label>Category</label>
                                        <select class="custom-select" onChange={this.selectCategory}>
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
                                        <select class="custom-select" onChange={this.selectBrand}>
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
                                        <select class="custom-select" onChange={this.selectSubCategory}>
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
                                        <select class="custom-select" name="isSlideProduct" onChange={this.changeHandeler}>
                                            <option value="false">NO</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-6">
                                        <label>Flash Sall</label>
                                        <select class="custom-select" name="isFlushSell" onChange={this.changeHandeler}>
                                            <option value="false">NO</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-6">
                                        <label>Bundle Offer</label>
                                        <select class="custom-select" name="isBundleProduct" onChange={this.changeHandeler}>
                                            <option value="false">NO</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-6">
                                        <label>Product Details</label>
                                        <input type="text" className="form-control" name="productDetails" onChange={this.changeHandeler}/>
                                    </div>

                                    <div className="form-group col-12 text-right">
                                        <button type="button" className="btn btn-square btn-outline-primary"  
                                            onClick={this.saveProduct}>Save and Next</button>
                                    </div>
                                </Fragment> : <Fragment>
                                    {/* img 1 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-1" data-content="1"  className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png,image/gif,image/jpeg" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-1" height="200" width="200" src={demoProduct} alt="" />
                                    </div>

                                    {/* img 2 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-2" data-content="2" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png,image/gif,image/jpeg" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-2"  height="200" width="200" src={demoProduct} alt="" />
                                    </div>

                                    {/* img 3 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-3" data-content="3" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png,image/gif,image/jpeg" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-3"  height="200" width="200" src={demoProduct} alt="" />
                                    </div>

                                    {/* img 4 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-4" data-content="4" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png,image/gif,image/jpeg" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-4"  height="200" width="200" src={demoProduct} alt="" />
                                    </div>

                                    {/* img 5  */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-5" data-content="5" className="form-control" 
                                            onChange={this.selectImage} accept="image/x-png,image/gif,image/jpeg" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-5"  height="200" width="200" src={demoProduct} alt="" />
                                    </div>

                                    <div className="form-group col-12 text-right">
                                        <button type="button" onClick={this.saveImages} className="btn btn-square btn-outline-success">Submit</button>
                                    </div>
                                </Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
