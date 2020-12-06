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
                                return <div className="col-md-3 col-sm-1 col-6"><ProductCard productId={e}></ProductCard></div>
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
        console.log("productId", productId);

        $(`#product-view-modal-${productId}`).modal("show");
        setIsOpen(true);
    }

    return (
        <Fragment>
            <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                    <img src="https://i.imgur.com/xdbHo4E.png" alt=""/>
                </div>
                <div class="product-details">
                    <span class="product-catagory">Women,bag</span>
                    <h5><a href="">Women leather bag</a></h5>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p> */}
                    <div class="product-bottom-details">
                        <div class="product-price"><small>$96.00</small>$230.99</div>
                        <div class="product-links">
                        {/* data-toggle="modal"  data-target={`#product-view-modal-${productId}`} */}
                            <span className="cursor-pointer" onClick={()=> openModal(productId)}><i class="fa fa-eye"></i>
                            </span>
                            <a href=""><i class="fa fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <ProductModalView productId={productId} 
                isOpen={isOpen}>
            </ProductModalView>
        </Fragment>
        
    )
}
