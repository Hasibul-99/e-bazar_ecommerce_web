import React, {useState, useEffect } from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import newProduct from '../../../assets/icons/Icon/New Products.png';
import flashSale from '../../../assets/icons/Icon/Flash Sale.png';
import topDiscount from '../../../assets/icons/Icon/Top Discount.png';
import tips from '../../../assets/icons/Icon/Tips.png';

export default function ItemType() {
    const [slidesToShow, setSlidesToShow] = useState(5);
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1
    };

    useEffect(() => {
        let ele = document.getElementById("js-container-item-types");
        let width = ele.clientWidth;

        if (width < 450) {
            setSlidesToShow(2);
        } else if (width < 780) {
            setSlidesToShow(4)
        }

    },[]);

    return (
        <div id="js-container-item-types" className="card item-types"> 
            <div className="card-body p-0">
                <Slider {...settings}>
                    <div className="cursore-pointer item-type-container">
                        <Link to="/products?sort=-discountPrice" className="d-flex">
                            <img src={topDiscount} height="30" width="30" alt="Top Discount"/>                            
                            <span className="ml-3 mt-1">Top Discount</span>
                        </Link>
                    </div>
                    <div className="cursore-pointer item-type-container">
                        <Link to="/products?sort=-creatingDate" className="d-flex">
                            <img src={newProduct} height="30" width="30" alt="New Product"/>
                            <span className="ml-3 mt-1">New Products</span>
                        </Link>
                    </div>
                    <div className="cursore-pointer item-type-container">
                        <Link to="/products?isFlushSell=true" className='d-flex'>
                            <img src={flashSale} height="50" width="50" alt="Flash Sale"/>
                            <span className="ml-3 mt-3">Flash Sale</span>
                        </Link>
                    </div>
                    <div className="cursore-pointer item-type-container">
                        <Link to="/auth/marchent-signup">Marchant</Link>
                    </div>
                    <div className="cursore-pointer item-type-container">
                        <Link to="/products?sort=-totalSell">Most Sells</Link>
                    </div>
                    <div className="cursore-pointer item-type-container">
                        <Link to="/tips" className="d-flex">
                            <img src={tips} height="30" width="30" alt="Tips"/>
                            <span className="ml-3 mt-1">Tips</span>
                        </Link>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
