import React, {Fragment, useState} from 'react';
import $ from "jquery";

import ProductModalView from "../../Components/Common/ProductModalView";

export default function RandomProduct() {
    return (
        <div className="random-products mt-4">
            <div className="card">
                <div className="card-header d-none"></div>
                <div className="card-header">
                    <div className="row">
                        {
                            [1,2,3,4,5,6,7,8,9, 10, 11, 12, 13].map(e => {
                                return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3"><ProductCard productId={e}></ProductCard></div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

function ProductCard(props){
    const [isOpen, setIsOpen] = useState(false);
    const {productId} = props;

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
