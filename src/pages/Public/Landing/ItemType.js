import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ItemType() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <div className="card item-types"> 
            <div className="card-body p-0">
                <Slider {...settings}>
                    <div className="cursor-pointer item-type-container">
                        <h4>Top Discount</h4>
                    </div>
                    <div className="cursor-pointer item-type-container">
                        <h4>New Products</h4>
                    </div>
                    <div className="cursor-pointer item-type-container">
                        <h4>Flash Sale</h4>
                    </div>
                    <div className="cursor-pointer item-type-container">
                        <h4>Marchant</h4>
                    </div>
                    <div className="cursor-pointer item-type-container">
                        <h4>Most Sells</h4>
                    </div>
                    <div className="cursor-pointer item-type-container">
                        <h4>Tips</h4>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
