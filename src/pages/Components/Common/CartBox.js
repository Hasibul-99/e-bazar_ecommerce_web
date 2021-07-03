import React, {Fragment, useEffect, useState, useContext} from 'react';
import $ from 'jquery'
import QuantityInput from "./QuantityInput";
import {CREATE_ORDER} from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { toast } from 'react-toastify';
import demoProduct from "../../../assets/images/demo-product.png";

import {orderListContext} from "../../../contexts/OrderListContext";
import swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

export default function CartBox() {
    const history = useHistory();
    const {products, updateQuamtity, deleteProductCollection} = useContext(orderListContext);

    const productPrice = (product) => {
        if (product.discountPrice) {
            return product.sellPrice - product.discountPrice
        } else {
            return product.sellPrice;
        }
    }

    const productTotalPrice = (product) => {
        let price = productPrice(product) ;
        return price * product.total;
    }

    const totalPrice = () => {
        let total = 0;

        products.forEach(item => {
           let productPrice = productTotalPrice(item);

           total = total + productPrice;
        })

        return total;
    }

    const handelQuantuty = ({qun, productId}) => {
        updateQuamtity(productId, qun);
    };

    const orderProduct = async () => {
        let orderData = [],
            userInfo = JSON.parse(localStorage.getItem("ExpressUserInfo")),
            productStockAvailable = true;

        
        if (!(userInfo && userInfo._id)) {
            window.location = "/auth/registration";
        };

        products.forEach(item => {
            if (item.total > 0) {
                if (item.stock <= item.total) productStockAvailable = false;
                orderData.push({
                    product: item._id,
                    qty: item.total
                });
            }
        });

        let data = {
            "userId": userInfo._id,
            "products": orderData
        }

        if (!productStockAvailable) {
            toast.error("Sorry, Product is not available!")
            return false;
        }

        if (data.userId && data.products && data.products.length ) {
            let res = await postData(CREATE_ORDER, data);

            if (res?.data?.isSuccess) {
                
                deleteProductCollection();
                $("#cart-modal-lg").modal('hide');

                let masterData = res.data.data;
                history.push('/payment/process/'+ masterData._id);

                // toast.success("Order Submit Successfully");

                // swal.fire('You can show your order status from your profile.');
            } else if (res.msg) {
                toast.error(res.msg);
            } else {
                toast.error("Something Went Wrong")
            }
        } else {
            toast.error("First Add Product")
        }
    }

    const showProductImage = (pro) => {
        if (pro && pro.photos && pro.photos.length) {
            return "http://easyexpress24.com:5000/static/" + pro.photos[0];
        } else return demoProduct
    }

    return (
        <Fragment>
            <button className="cart-box" data-toggle="modal" data-target="#cart-modal-lg">
                <span className="cart-box-item">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12.686" height="16" viewBox="0 0 12.686 16"><g data-name="Group 2704" transform="translate(-27.023 -2)"><g data-name="Group 17" transform="translate(27.023 5.156)"><g data-name="Group 16"><path data-name="Path 3" d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z" transform="translate(-53.023 -101.005)" fill="currentColor"></path></g></g><g data-name="Group 19" transform="translate(30.274 2)"><g data-name="Group 18"><path data-name="Path 4" d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z" transform="translate(-157.039)" fill="currentColor"></path></g></g></g></svg></span>
                    {products?.length} Item
                </span>
                <span className="cart-box-price">
                    ৳{totalPrice()}
                </span>
            </button>

            <div className="modal fade bd-example-modal-lg card-item-view-modal" id="cart-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Card Items List</h5>
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body px-4">
                            {
                                products.map(product => {
                                    return (
                                        <div className="list-group">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="product-tumb">
                                                        <img src={showProductImage(product)} 
                                                            className="card-img-top" alt="..."  />
                                                    </div>
                                                    <div className="product-detais mt-3">
                                                        <span className="product-catagory">
                                                            {/* Women Bag */}
                                                        </span>
                                                        <h5><a href>{product.name}</a></h5>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mt-5">
                                                    Price: <span className="brand-color"> 
                                                        ৳{productPrice(product)}
                                                    </span>
                                                </div>
                                                <div className="col-md-3 mt-5">
                                                    <QuantityInput
                                                        total = {product.total}
                                                        productId={product._id}
                                                        handelQuantuty={handelQuantuty} 
                                                    ></QuantityInput>
                                                </div>
                                                <div className="col-md-2 mt-5">
                                                    Total Price: <span className="brand-color">
                                                        ৳{productTotalPrice(product)}
                                                    </span>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                    )
                                })
                            }                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={orderProduct}>Save Order</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}


// raid 
// anawar 
// sagar 
