import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import QuantityInput from "../Common/QuantityInput";

export default function ProductModalView() {
    return (
        <div class="modal fade bd-example-modal-lg product-preview-modal" id="bd-example-modal-lg" tabindex="-1" 
            role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    {/* <div class="modal-header">
                        {/* <h5 class="modal-title">Modal title</h5> 
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                        </button>
                    </div> */}
                    <div class="modal-body">
                        <div className="row">
                            <div className="col-6">
                            <Carousel>
                                <div>
                                    <img src="https://shopkeeper.wp-theme.design/wp-content/uploads/4146401443863639_01-920x1140.jpg" />
                                    {/* <p className="legend">Legend 1</p> */}
                                </div>
                                <div>
                                    <img src="https://shopkeeper.wp-theme.design/wp-content/uploads/4146401443863639_02-920x1139.jpg" />
                                    {/* <p className="legend">Legend 2</p> */}
                                </div>
                                <div>
                                    <img src="https://shopkeeper.wp-theme.design/wp-content/uploads/4146401443863639_03-920x1139.jpg" />
                                    {/* <p className="legend">Legend 3</p> */}
                                </div>
                            </Carousel>
                            </div>
                            <div className="col-6 pt-5">
                                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                                    </button>

                                <h2>Folk Striped Slub Cotton-Jersey T-Shirt</h2>
                                <h5 className="gold-text my-4">$75</h5>

                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">COLOR</label>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">SIZE</label>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </select>
                                </div>

                                <QuantityInput></QuantityInput>

                                <div>
                                    <button type="button" class="btn light btn-warning w-100 my-5">ADD To CART</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
