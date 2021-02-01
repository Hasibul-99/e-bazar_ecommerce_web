import React, {useEffect, useState, Fragment} from 'react';
import $ from "jquery";
import { getData } from "../../../scripts/api-service";
import { GET_RPODUCT } from "../../../scripts/api";
import demoProduct from "../../../assets/images/demo-product.png";
import ProductModalView from "../../Components/Common/ProductModalView";
import Localbase from 'localbase';
let db = new Localbase('db');

export default function NonBrandItems() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getNonBundleProduct()
    }, []);

    const getNonBundleProduct = async () => {
        let res = await getData(GET_RPODUCT+ '?isBundleProduct=false');

        console.log("res", res);
        if (res?.data?.isSuccess) {
            setProducts(res?.data?.data);
        }
    };
    
    return (
        <div className="non-Brand-items card">
            <div className="card-body">
                <div className="row">
                    {/* <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                        <Items></Items>
                    </div> */}
                    {   
                        products.length ? 
                        products.map(product => {
                            return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={product._id}>
                                    <ProductCard product={product}></ProductCard>
                                </div>
                        }) : <h3>No Product Found</h3>
                    }

                    <div className="col-12 container">
                        <div className="button-effect">
                            <button class="effect effect-4 button-4 float-righ">View More</button>
                        </div>
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

function Items() {
    return (
        <div className="xs-organic-product-thumb woocommerce">
            <div id="full-stars-example">
                <div className="rating-group">
                    <label aria-label="1 star" className="rating__label" for="rating-1"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input className="rating__input" name="rating" id="rating-1" value="1" type="radio"/>
                    <label aria-label="2 stars" className="rating__label" for="rating-2"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input className="rating__input" name="rating" id="rating-2" value="2" type="radio"/>
                    <label aria-label="3 stars" className="rating__label" for="rating-3"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input className="rating__input" name="rating" id="rating-3" value="3" type="radio" checked/>
                    <label aria-label="4 stars" className="rating__label" for="rating-4"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input className="rating__input" name="rating" id="rating-4" value="4" type="radio"/>
                    <label aria-label="5 stars" className="rating__label" for="rating-5"><i className="rating__icon rating__icon--star fa fa-star"></i></label>
                    <input className="rating__input" name="rating" id="rating-5" value="5" type="radio"/>
                </div>
            </div>

            <div className="product-item-meta meta-style-2">

            </div>

            <div className="product-thumb">
                <a href="">
                    <img src="https://demo.xpeedstudio.com/marketo/home5/wp-content/uploads/sites/5/2018/05/09-191x173.png" alt="OLT Strawberry" loading="lazy"></img>
                </a>
            </div>

            <h4 className="product-title medium">
                <a href="">OLT Strawberry</a>
            </h4>

            <div className="content-box"> <span className="price">
                <span className="woocommerce-Price-amount amount">
                    <span className="woocommerce-Price-currencySymbol">$</span>22.00</span>
                </span>
            </div>

            <div className="hover-box xs-addcart woocommerce"> 
                <button className="btn btn-success">Add to cart</button>
            </div>
        </div>
    )
}
