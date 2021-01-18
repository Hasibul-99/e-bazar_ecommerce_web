import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone'

export default class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowFirstPart: true
        };
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
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Regular Price</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Sale Price</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Stock</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    
                                    <div className="form-group col-6">
                                        <label>SKU (Stock keeping unit)</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Category</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Tags</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    
                                    <div className="form-group col-6">
                                        <label>Slider</label>
                                        <select class="custom-select">
                                            <option value="false">NO</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-6">
                                        <label>Flash Sall</label>
                                        <select class="custom-select">
                                            <option value="false">NO</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-6">
                                        <label>Bundle Offer</label>
                                        <select class="custom-select">
                                            <option value="false">NO</option>
                                            <option value="true">Yes</option>
                                        </select>
                                    </div>

                                    <div className="form-group col-12 text-right">
                                        <button type="button" className="btn btn-square btn-outline-primary"  
                                            onClick={() => {this.setState({isShowFirstPart: false})}}>Save and Next</button>
                                    </div>
                                </Fragment> : <Fragment>
                                    {/* img 1 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-1" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-1"  src="" alt="" />
                                    </div>

                                    {/* img 2 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-1" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-1"  src="" alt="" />
                                    </div>

                                    {/* img 3 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-1" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-1"  src="" alt="" />
                                    </div>

                                    {/* img 4 */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-1" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-1"  src="" alt="" />
                                    </div>

                                    {/* img 5  */}
                                    <div className="form-group col-6">
                                        <label>Image</label>
                                        <input type="file" id="js-product-img-1" className="form-control" />
                                    </div>
                                    <div className="col-6">
                                        <img className="img-thumbnail" id="js-product-img-view-1"  src="" alt="" />
                                    </div>

                                    <div className="form-group col-12 text-right">
                                        <button type="button" className="btn btn-square btn-outline-success">Submit</button>
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
