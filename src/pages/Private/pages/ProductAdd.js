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
                                        <label>SKU</label>
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
                                    
                                    <div className="form-group col-12 text-right">
                                        <button type="button" className="btn btn-square btn-outline-primary"  
                                            onClick={() => {this.setState({isShowFirstPart: false})}}>Save and Next</button>
                                    </div>
                                </Fragment> : <Fragment>
                                    <div className="form-group col-12">
                                        <label>Image</label>
                                        <input type="file" className="form-control" />
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
