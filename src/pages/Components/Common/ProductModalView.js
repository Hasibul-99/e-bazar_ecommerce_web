import React, {useState, useEffect} from 'react';
import $ from "jquery";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import QuantityInput from "../Common/QuantityInput";

export default function ProductModalView(props) {
    const {productId, isOpen, HandelModalClose} = props;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                $(`#js-modal-dialog-${productId}`).addClass('modal-lg');
                $(`#js-image-content-${productId}`).addClass('col-6');
                $(`#card-content-${productId}`).show();
            }, 1000)
        };
      }, [isOpen]);

    return (
        <div class="modal fade product-preview-modal" id={`product-view-modal-${productId}`} tabindex="-1" 
            role="dialog" aria-hidden="true">
            <div id={`js-modal-dialog-${productId}`} class="modal-dialog"> {/* modal-lg*/}
                <div class="modal-content">
                    <div class="modal-body">
                        <div className="row">
                            <div id={`js-image-content-${productId}`} className="">
                                <Carousel>
                                    <div>
                                        <img src="https://shopkeeper.wp-theme.design/wp-content/uploads/4146401443863639_01-920x1140.jpg" />
                                    </div>
                                    <div>
                                        <img src="https://shopkeeper.wp-theme.design/wp-content/uploads/4146401443863639_02-920x1139.jpg" />
                                    </div>
                                    <div>
                                        <img src="https://shopkeeper.wp-theme.design/wp-content/uploads/4146401443863639_03-920x1139.jpg" />
                                    </div>
                                </Carousel>
                            </div>
                            <div id={`card-content-${productId}`} className="col-6 pt-5" style={{display: 'none'}}>
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
