import React, {Fragment, useState, useEffect} from 'react';
import $ from "jquery";

import { postData, getData } from "../../../scripts/api-service";
import { GET_RPODUCT } from "../../../scripts/api";
import Pagination from "../../Private/common/Pagination";
import {loadPageVar} from "../../../scripts/helper";

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
                <div className="badge">Hot</div>
                <div className="product-tumb">
                    <img src="https://i.imgur.com/xdbHo4E.png" alt=""/>
                </div>
                <div className="product-details">
                    <span className="product-catagory">Women,bag</span>
                    <h5><a href="">Women leather bag</a></h5>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p> */}
                    <div className="product-bottom-details">
                        <div className="product-price"><small>$96.00</small>$230.99</div>
                        <div className="product-links">
                        {/* data-toggle="modal"  data-target={`#product-view-modal-${productId}`} */}
                            <span className="cursor-pointer" onClick={()=> openModal(productId)}><i className="fa fa-eye"></i>
                            </span>
                            <a href=""><i className="fa fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <ProductModalView 
                productId={productId} 
                isOpen={isOpen}
                HandelModalClose={handelModalClose}>
            </ProductModalView>
        </Fragment>
        
    )
}
