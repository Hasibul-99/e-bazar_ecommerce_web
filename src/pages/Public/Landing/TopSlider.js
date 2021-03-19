import React, {useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import $ from "jquery";
import 'react-animated-slider/build/horizontal.css';
import "../../../assets/css/slider-animations.css";

import { getData } from "../../../scripts/api-service";
import { GET_RPODUCT } from "../../../scripts/api";

import slider1 from '../../../assets/images/slider/01.jpg';
import slider2 from '../../../assets/images/slider/02.jpg';
import slider3 from '../../../assets/images/slider/03.jpg';
import { Link } from 'react-router-dom';
import ProductModalView from "../../Components/Common/ProductModalView";


const content = [
	{
		title: 'exciting schemes just a click away',
		description:
		'Amazing Santorini 7 days tour',
		button: 'VIEW OUR TOUR',
        image: slider1,
        classAdd: "right-allian-text"
		// user: 'Luan Gjokaj',
		// userProfile: 'https://i.imgur.com/JSW6mEk.png'
	},
	{
		title: 'Book a ticket & Just Leave',
		description:
		'Search your next destination',
		button: 'VIEW OUR TOUR',
        image: slider2,
        classAdd: "left-allian-text"
		// user: 'Erich Behrens',
		// userProfile: 'https://i.imgur.com/0Clfnu7.png'
	},
	{
		title: 'Cost friendly packages on your way',
		description:
		'We offer you better deals',
		button: 'VIEW OUR TOUR',
        image: slider3,
        classAdd: "center-allian-text"
		// user: 'Bruno Vizovskyy',
		// userProfile: 'https://i.imgur.com/4KeKvtH.png'
	}
];


export default function TopSlider() {
    const [products, setProduct] = useState([]);
    const [product, setProducts] = useState([]);

    useEffect(() => {
        getSliderProducts();
    }, []);

    const getSliderProducts = async () => {
        let res = await getData(GET_RPODUCT+ '?isSlideProduct=true&limit=10000');

        if (res?.data?.isSuccess) {
            let data = res.data.data || [],
                content = [];

            if (data && data.length) {
                data.forEach((item, i) => {                    
                    if (item.photos && item.photos.length) {
                        content.push({
                            title: item.name,
                            description: item.productDetails,
                            button: 'VIEW OUR PRODUCT',
                            image: `http://easyexpress24.com:5000/static/${item.photos[0]}`,
                            classAdd: "right-allian-text",
                            _id: item._id
                        })
                    }
                });
            }
            setProducts(data);
            setProduct(content);
        }
    }

    const handelModalClose = () => {};

    const openModal = (productId) => {
        $(`#product-view-modal-${productId}`).modal("show");
        // setIsOpen(true);

    }

    return (
        <>
        { products.length ? (
            <div className="top-slider"> {/* autoplay= "2000" touchDisabled = "true" */}
                <Slider className="slider-wrapper"
                    autoplay= "1500" touchDisabled = "true">
                    {products.map((item, index) => (
                        <div className="item slider-content cursore-pointer" onClick={()=> openModal(item._id)} key={index}>
                            <img src={item.image} alt={'image' + index}/>
                            <div className={"inner " + item.classAdd}>
                                <h2 className="text-capitalize">{item.title}</h2>
                                <h1 className="text-uppercase">{item.description}</h1>
                                {/* <Link to="/products" className="btn-transparent link-decaration">{item.button}</Link> */}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            ) : ''
        }
        
        {
            product && product.length ? (
                product.map(value => {
                    <ProductModalView
                        productId={value._id} 
                        isOpen={true}
                        product={value}
                        update={Math.random()}
                        HandelModalClose={handelModalClose}>
                    </ProductModalView>
                })
            ) : ''
        }
        </>
    )
}
