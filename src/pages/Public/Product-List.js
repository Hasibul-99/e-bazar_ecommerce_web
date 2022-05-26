import React, {Fragment, useEffect, useState, useContext} from 'react';
import $ from "jquery";
import {useHistory} from "react-router-dom";
import { getData } from "../../scripts/api-service";
import { GET_RPODUCT } from "../../scripts/api";
import demoProduct from "../../assets/images/demo-product.png";
import ProductModalView from "../Components/Common/ProductModalView";
import Pagination from "../Private/common/Pagination";
import {orderListContext} from "../../contexts/OrderListContext";
import ItemType from "./Landing/ItemType";
import StartContent from "../Components/Common/StartContent"

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
        let res = await getData(url + "&limit=60");

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
            <ItemType></ItemType>

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
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));
        if (user && user._id) {
            findCardProduct(item._id).then(res => {
                if (res) {
                    // updateQuamtity(item._id, res.total + 1);
                } else {
                    addNewProduct(item);
                }
            });
        } else {
            window.location = "/auth/registration"
        }
        
    }

    return (
        <Fragment>
            <div className="product-card 324">
                {
                    !(product.stock - product.totalSell) ? 
                    <div className="badge">Out of Stock</div> : ''
                }
                <div className="product-tumb">
                    {
                        product?.photos?.length ? <Fragment>
                            <img className="cursore-pointer" onClick={()=> openModal(product._id)}
                                src={`http://103.163.246.31:5000/static/${product?.photos[0]}`} alt=""/>
                        </Fragment> : <Fragment>
                            <img className="cursore-pointer" src={demoProduct} alt=""/>
                        </Fragment>
                    }
                </div>
                <div className="product-details">
                    {/* <span className="product-catagory">Women,bag</span> */}
                    <h5><a className="cursore-pointer" onClick={()=> openModal(product._id)}>{product.name}</a></h5>
                    <div>
                        <StartContent product={product}></StartContent>
                    </div>
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

            <br/>
            <br/>
            <br/>
        </Fragment>
        
    )
}
