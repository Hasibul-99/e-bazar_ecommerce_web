import React, {useState, useEffect} from 'react';
import { Fragment } from 'react';
import $ from "jquery";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import QuantityInput from "../Common/QuantityInput";

import demoProduct from "../../../assets/images/demo-product.png";

export default function ProductModalView(props) {
    const {productId, isOpen, product, HandelModalClose} = props;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                $(`#js-modal-dialog-${productId}`).addClass('modal-lg');
                $(`#js-image-content-${productId}`).addClass('col-sm-12 col-md-6');
                $(`#card-content-${productId}`).show();
            }, 1000)
        };
      }, [isOpen]);

    return (
        <div className="modal fade product-preview-modal" id={`product-view-modal-${productId}`} tabindex="-1" 
            role="dialog" aria-hidden="true">
            <div id={`js-modal-dialog-${productId}`} className="modal-dialog"> {/* modal-lg*/}
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        <div className="row">
                            <div id={`js-image-content-${productId}`} className="">
                                {
                                    product?.photos?.length ? <Fragment>
                                        <Carousel>
                                            { 
                                                product.photos.map(item => {
                                                    return <div key={item}>
                                                                <img src={`http://easyexpress24.com:5000/static/${item}`} />
                                                            </div>
                                                })
                                            }
                                        </Carousel>
                                    </Fragment> : <Fragment>
                                        <image src={demoProduct} alt=""/>
                                    </Fragment>
                                }
                                
                            </div>
                            <div id={`card-content-${productId}`} className="col-sm-12 col-md-6 pt-5" style={{display: 'none'}}>

                                <h2>{product.name}</h2>
                                <h5 className="gold-text my-4">
                                  ৳{ product.sellPrice - product.discountPrice } 
                                </h5>

                                <div className="form-group d-none">
                                    <label for="exampleFormControlSelect1">COLOR</label>
                                    <select className="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </select>
                                </div>

                                <div className="form-group d-none">
                                    <label for="exampleFormControlSelect1">SIZE</label>
                                    <select className="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </select>
                                </div>

                                <QuantityInput></QuantityInput>

                                <div>
                                    <button type="button" className="btn light btn-warning w-100 my-5">ADD To CART</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
