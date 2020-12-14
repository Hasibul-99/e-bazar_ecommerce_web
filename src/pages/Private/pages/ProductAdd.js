import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

export default class ProductAdd extends Component {
    render() {
        return (
            <div className="add-product">
                <h3>Add Products</h3>

                <div class="card mt-3">
                    <div class="card-body">
                        <div className="row">
                            <div class="form-group col-12">
                                <label>Product Name</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <label>Regular Price</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <label>Sale Price</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <label>Stock</label>
                                <input type="text" class="form-control" />
                            </div>
                            
                            <div className="form-group col-6">
                                <label>SKU</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <label>Category</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div className="form-group col-6">
                                <label>Tags</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div className="form-group col-12">
                                <label>Image</label>
                                <input type="file" class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
