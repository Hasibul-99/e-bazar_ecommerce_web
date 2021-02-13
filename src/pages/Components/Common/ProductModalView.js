import React, {useState, useEffect} from 'react';
import { Fragment } from 'react';
import $ from "jquery";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import QuantityInput from "../Common/QuantityInput";
import demoProduct from "../../../assets/images/demo-product.png";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import Localbase from 'localbase'
let db = new Localbase('db');
db.config.debug = false;

export default function ProductModalView(props) {
    const {productId, isOpen, product, HandelModalClose} = props;
    const [selected, setSelected] = useState(null);

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

    const handelQuantuty = (qun, productId) => {
        db.collection('products').doc({ _id: productId }).update({
            total : qun
        })
    }
    const changeProduct = (item) => {
        setSelected(item);
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
                                    <Zoom>
                                        {/* <img src={`http://easyexpress24.com:5000/static/${selected}`} width="500"  /> */}
                                        <picture>
                                            <source
                                            media="(max-width: 800px)"
                                            srcSet={`http://easyexpress24.com:5000/static/${selected}`}
                                            />
                                            <img
                                            alt="that wanaka tree"
                                            src={`http://easyexpress24.com:5000/static/${selected}`}
                                            width="500"
                                            />
                                        </picture>
                                    </Zoom>
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

                                 <QuantityInput
                                     total = {product.total || 1}
                                     productId={productId}
                                    handelQuantuty={handelQuantuty} 
                                 ></QuantityInput>

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
