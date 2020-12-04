import React from 'react'

export default function RandomProduct() {
    return (
        <div className="random-products mt-4">
            <div className="card">
                <div className="card-header d-none"></div>
                <div className="card-header">
                    <div className="row">
                        {
                            [1,2,3,4,5,6,7,8,9, 10, 11, 12, 13].map(e => {
                                return <div className="col-md-3 col-sm-1 col-6"><ProductCard></ProductCard></div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

function ProductCard(){
    return (
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
                        <a href=""><i class="fa fa-heart"></i></a>
                        <a href=""><i class="fa fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
