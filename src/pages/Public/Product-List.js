import React, {Fragment, useEffect, useState} from 'react';
import $ from "jquery";
import { getData } from "../../scripts/api-service";
import { GET_RPODUCT } from "../../scripts/api";
import demoProduct from "../../assets/images/demo-product.png";
import ProductModalView from "../Components/Common/ProductModalView";
import Localbase from 'localbase';
let db = new Localbase('db');

export default function ProductList(props) {
    const {location} = props;
    const {search} = location;
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts(search)
    }, [search]);

    const getProducts = async (query) => {
        let url = query ? GET_RPODUCT + query : GET_RPODUCT;
        let res = await getData(url);

        console.log(res.data.data);

        if (res?.data?.isSuccess) {
            setProducts(res?.data?.data);
        }
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
                </div>
            </div>
        </div>
    )
}

function ProductCard( {product}) {
    const [isOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(Math.random());
 
    const openModal = (productId) => {
        $(`#product-view-modal-${productId}`).modal("show");
        setIsOpen(true);
    }

    const handelModalClose = () => {
        
    }

    const addProductIncard = (item) => {
        db.collection('products').doc({ _id: item._id }).get().then(doc => {
            if (doc) {
                db.collection('products').doc({ _id: item._id  }).update({
                    total: doc.total + 1 
                });
            } else {
                item.total = 1;
                db.collection('products').add(item);
            }

            setUpdate(Math.random());
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
                            <span className="cursor-pointer" onClick={()=> openModal(product._id)}>
                                <i className="fa fa-eye"></i>
                            </span>
                            <span className="cursor-pointer" onClick={() => addProductIncard(product)}>
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
