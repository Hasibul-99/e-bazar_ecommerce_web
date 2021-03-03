import React, {Fragment, useEffect, useState, useContext} from 'react';
import $ from "jquery";
import {Link,useHistory} from "react-router-dom";
import { getData } from "../../scripts/api-service";
import { GET_RPODUCT } from "../../scripts/api";
import demoProduct from "../../assets/images/demo-product.png";
import ProductModalView from "../Components/Common/ProductModalView";
import Pagination from "../Private/common/Pagination";
import {orderListContext} from "../../contexts/OrderListContext";

export default function ProductList(props) {
    const {location} = props;
    const {search} = location;
    const [products, setProducts] = useState([]);
    const history = useHistory();
    
    
    useEffect(() => {
        getProducts(search)
    }, [search]);

    const getProducts = async (query) => {
        let url = query ? GET_RPODUCT + query : GET_RPODUCT;
        let res = await getData(url);

        if (res?.data?.isSuccess) {
            setProducts(res?.data?.data);
        }
    }

    const handelPagination = (page) => {
        let {location} = history,
            {search} = location;

        let query = search ? search + `&page=${page}` : `?page=${page}`;
        getProducts(query);
    }

    return (
        <div className="home-landing">
            <div className="non-Brand-items card">
                <div className="card-body">
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
                    <Pagination
                        handelPagination={handelPagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    )
}

function ProductCard( {product}) {
    const {findCardProduct, updateQuamtity, addNewProduct} = useContext(orderListContext);

    const [isOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(Math.random());
 
    const openModal = (productId) => {
        $(`#product-view-modal-${productId}`).modal("show");
        setIsOpen(true);
    }

    const handelModalClose = () => {
        
    }

    const addProductIncard = (item) => {
        findCardProduct(item._id).then(res => {
            if (res) {
                updateQuamtity(item._id, res.total + 1);
            } else {
                addNewProduct(item);
            }
        });
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
                            <span className="cursore-pointer mr-2" onClick={()=> openModal(product._id)}>
                                <i className="fa fa-eye"></i>
                            </span>
                            <span className="cursore-pointer" onClick={() => addProductIncard(product)}>
                                <i className="fa fa-shopping-cart"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProductModalView
                productId={product._id} 
                isOpen={isOpen}
                product={product}
                update={update}
                HandelModalClose={handelModalClose}>
            </ProductModalView>
        </Fragment>
        
    )
}
