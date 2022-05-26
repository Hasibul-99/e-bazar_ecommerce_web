import React, {Fragment, useEffect, useState, useContext} from 'react'
import {useParams} from "react-router-dom";
import { getData } from "../../scripts/api-service";
import { GET_RPODUCT } from "../../scripts/api";

import QuantityInput from "../Components/Common/QuantityInput";
import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
  } from "react-image-magnifiers";
  import {orderListContext} from "../../contexts/OrderListContext";


export default function ProductInfo() {
    const {findCardProduct, updateQuamtity, addNewProduct} = useContext(orderListContext);
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [selected, setSelected] = useState();
    const [quan, setQuan] = useState(1);

    useEffect(() => {
        getProductInfo();
    }, []);

    const getProductInfo = async () => {
        let res = await getData(GET_RPODUCT+ '?_id=' + productId);

        if (res?.data?.isSuccess) {
            let data = res?.data?.data[0];

            setProduct(data);
            setSelected(data.photos[0]);
        }
    }

    const changeProduct = (item) => {
        setSelected(item);
    }

    const handelQuantuty = ({qun, productId}) => {
        setQuan(qun);
    }

    const addToCard = () => {
        findCardProduct(productId).then(res => {
            if (res) {
                updateQuamtity(productId, quan);
            } else {
                addNewProduct(product, quan);
            }
        });
    }


    return (
        <div className="home-landing tips-info mb-5">
            <div className="non-Brand-items card">
                <div className="card-body">
                    {product ? (
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="selected-image">
                                    <GlassMagnifier
                                        imageSrc={`http://103.163.246.31:5000:5000/static/${selected}`}
                                        imageAlt="Example"
                                        largeImageSrc={`http://103.163.246.31:5000:5000/static/${selected}`}
                                        magnifierSize="50%"
                                        allowOverflow="true"
                                        zoom="200%"
                                    />
                                </div>
                                    
                                <div className="d-flex mt-4">
                                    { 

                                        product?.photos.map(item => {
                                            return <div className="product-images" key={item} onClick={() => changeProduct(item)}>
                                                    <img src={`http://103.163.246.31:5000:5000/static/${item}`}/>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 pt-5">
                                <h2>{product.name}</h2>
                                <h5 className="brand-color my-4">
                                   ৳{ product.sellPrice - product.discountPrice } 
                                </h5>
                                <h5 className="my-4">{product.productDetails}</h5>

                                <QuantityInput
                                     total = {product.total || 1}
                                     productId={productId}
                                    handelQuantuty={handelQuantuty} 
                                 ></QuantityInput>

                                 <div>
                                     <button type="button" className="btn light btn-warning w-100 my-5"
                                        onClick={() => addToCard()}>ADD To CART</button>
                                 </div>
                            </div>
                        </div>
                    ) : ''}
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
