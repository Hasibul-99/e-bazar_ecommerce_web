import React, {Fragment, useState, useEffect} from 'react';
import $ from "jquery";

import { postData, getData } from "../../../scripts/api-service";
import { GET_RPODUCT } from "../../../scripts/api";
import Pagination from "../../Private/common/Pagination";
import {loadPageVar} from "../../../scripts/helper";
import demoProduct from "../../../assets/images/demo-product.png";

import ProductModalView from "../../Components/Common/ProductModalView";

export default function RandomProduct() {
    const [products, setProducts] = useState([]);
    const [page, setpage] = useState(1)

    useEffect(() => {
        getProductList();
    }, []);

    const getProductList = async (page) => {
        let url = page ? GET_RPODUCT + '?page='+ page : GET_RPODUCT;
        let res = await getData(url);

        if (res?.data?.isSuccess) {
            setProducts(res?.data?.data);
        }
    };

    const handelPagination = (page) => {
        // this.props.history.push(`${window.location.pathname}?page=${page}`);
        getProductList(page);
    }


    return (
        <div className="random-products mt-4">
            <div className="card">
                <div className="card-header d-none"></div>
                <div className="card-header">
                    <div className="row">
                        {   
                            products.length ? 
                            products.map(product => {
                                return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={product._id}>
                                        <ProductCard product={product}></ProductCard>
                                    </div>
                            }) : <h3>No Product Found</h3>
                        }
                    </div>

                    {/* <Pagination
                        handelPagination={handelPagination}
                    ></Pagination> */}
                </div>
            </div>
        </div>
    )
};

function ProductCard(props) {
    const [isOpen, setIsOpen] = useState(false);
    const {product} = props;
    const {productId} = props.product._id;
 
    const openModal = (productId) => {
        $(`#product-view-modal-${productId}`).modal("show");
        setIsOpen(true);
    }

    const handelModalClose = () => {
        
    }

    return (
        <Fragment>
            <div className="product-card">
                {
                    !(product.stock - product.totalSell) ? 
                    <div className="badge">Out of Stock</div> : ''
                }
                <div className="product-tumb">
                    {
                        product?.photos?.length ? <Fragment>
                            <img src={`http://easyexpress24.com:5000/static/${product?.photos[0]}`} alt=""/>
                        </Fragment> : <Fragment>
                            <img src={demoProduct} alt=""/>
                        </Fragment>
                    }
                </div>
                <div className="product-details">
                    <span className="product-catagory">Women,bag</span>
                    <h5><a href="">{product.name}</a></h5>
                    <div className="product-bottom-details">
                        <div className="product-price">
                            {
                                product.discountPrice ? <Fragment>
                                    <small>৳{product.sellPrice}</small>
                                    ৳{ product.sellPrice - product.discountPrice }
                                </Fragment> : <Fragment>৳{product.sellPrice}</Fragment> 
                            }
                        </div>
                        <div className="product-links">
                            <span className="cursor-pointer" onClick={()=> openModal(product._id)}><i className="fa fa-eye"></i>
                            </span>
                            <a href=""><i className="fa fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProductModalView
                productId={product._id} 
                isOpen={isOpen}
                product={product} 
                HandelModalClose={handelModalClose}>
            </ProductModalView>
        </Fragment>
        
    )
}