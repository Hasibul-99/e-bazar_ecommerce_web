import React, {Fragment, useState, useEffect, useContext} from 'react';
import $ from "jquery";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import QuantityInput from "../Common/QuantityInput";
import 'react-medium-image-zoom/dist/styles.css'
import {orderListContext} from "../../../contexts/OrderListContext";

import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
  } from "react-image-magnifiers";

import Localbase from 'localbase'
let db = new Localbase('db');
db.config.debug = false;

export default function ProductModalView(props) {
    const {findCardProduct, updateQuamtity, addNewProduct} = useContext(orderListContext);
    const {productId, isOpen, product, HandelModalClose} = props;
    const [selected, setSelected] = useState(null);
    const [quan, setQuan] = useState(1);
 
    useEffect(() => {
        setSelected(product.photos[0]);

        if (isOpen) {
            setTimeout(() => {
                $(`#js-modal-dialog-${productId}`).addClass('modal-lg');
                $(`#js-image-content-${productId}`).addClass('col-sm-12 col-md-6');
                $(`#card-content-${productId}`).show();
            }, 1000)
        };
      }, [isOpen]);

    const handelQuantuty = ({qun, productId}) => {
        setQuan(qun);
    }
    const changeProduct = (item) => {
        setSelected(item);
    }

    const addToCard = () => {
        findCardProduct(productId).then(res => {
            if (res) {
                updateQuamtity(productId, quan);
            } else {
                addNewProduct(product, quan);
            }
        });
    }

    return (
        <div className="modal fade product-preview-modal" id={`product-view-modal-${productId}`} tabindex="-1" 
                role="dialog" aria-hidden="true">
            <div id={`js-modal-dialog-${productId}`} className="modal-dialog"> {/* modal-lg*/}
                <div className="modal-content">
                    <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                        <div className="row">
                            <div id={`js-image-content-${productId}`} className="">

                                <div className="selected-image">
                                    <GlassMagnifier
                                        imageSrc={`http://easyexpress24.com:5000/static/${selected}`}
                                        imageAlt="Example"
                                        largeImageSrc={`http://easyexpress24.com:5000/static/${selected}`}
                                        magnifierSize="50%"
                                        allowOverflow="true"
                                        zoom="200%"
                                    />
                                </div>
                                
                                <div className="d-flex">
                                    { 
                                        product.photos.map(item => {
                                            return <div className="product-images" key={item} onClick={() => changeProduct(item)}>
                                                    <img src={`http://easyexpress24.com:5000/static/${item}`}/>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div id={`card-content-${productId}`} className="col-sm-12 col-md-6 pt-5" 
                            style={{display: 'none'}}>
                                 <h2>{product.name}</h2>
                                 <h5 className="product-price brand-color my-4">
                                   {/* { product.sellPrice - product.discountPrice }  */}
                                   {
                                        product.discountPrice ? <Fragment>
                                            <small>৳{product.sellPrice}</small>
                                            ৳{ product.sellPrice - product.discountPrice }
                                        </Fragment> : <Fragment>৳{product.sellPrice}</Fragment> 
                                    }
                                 </h5>

                                 <h5 className="my-4">{product.productDetails}</h5>

                                 <QuantityInput
                                     total = {product.total || 1}
                                     productId={productId}
                                    handelQuantuty={handelQuantuty} 
                                 ></QuantityInput>

                                <div class="product-start">
                                    <div class="bg-light border">
                                        <div id="starrate" class="starrate my-2 text-center" 
                                        data-val="2.5" data-max="5">
                                            <span class="ctrl"></span>
                                            <span class="cont m-1">
                                            <i class="fas fa-fw fa-star mr-2"></i> 
                                            <i class="fas fa-fw fa-star  mr-2"></i> 
                                            <i class="fas fa-fw fa-star-half-alt mr-2"></i> 
                                            <i class="far fa-fw fa-star mr-2"></i> 
                                            <i class="far fa-fw fa-star mr-2"></i> 
                                            </span>
                                        </div>              
                                    </div>                
                                </div>

                                 <div>
                                     <button type="button" className="btn light btn-warning w-100 my-5"
                                        onClick={() => addToCard()}>ADD To CART</button>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
