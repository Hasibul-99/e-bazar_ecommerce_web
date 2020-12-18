import React from 'react';

export default function NonBrandItems() {
    return (
        <div className="non-Brand-items card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <Items></Items>
                    </div>
                </div>
            </div>
        </div>
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
