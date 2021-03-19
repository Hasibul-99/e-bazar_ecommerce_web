import React, {Fragment, useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import { getData } from "../../scripts/api-service";
import { GET_TIPS } from "../../scripts/api";

import {
    Magnifier,
    GlassMagnifier,
    SideBySideMagnifier,
    PictureInPictureMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION
  } from "react-image-magnifiers";
  import 'react-medium-image-zoom/dist/styles.css'

export default function TipsDetails() {
    const { tipId } = useParams();
    const [tipInfo, setTipInfo] = useState();
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getTipInfo();
    }, []);

    const getTipInfo = async () => {
        let res = await getData(GET_TIPS+ '?_id=' + tipId);

        console.log("res", res);
        if (res?.data?.isSuccess) {
            let data = res?.data?.data[0];

            setTipInfo(data);
            setSelected(data.photos[0]);
        }
    }

    const changeProduct = (item) => {
        setSelected(item);
    }

    console.log("tipInfo", tipInfo);

    return (
        <div className="home-landing tips-info">
            <div className="non-Brand-items card">
                <div className="card-body">
                    {tipInfo ? (
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="selected-image">
                                    <GlassMagnifier
                                        imageSrc={`http://easyexpress24.com:5000/static/${selected}`}
                                        imageAlt="Example"
                                        largeImageSrc={`http://easyexpress24.com:5000/static/${selected}`}
                                        magnifierSize="50%"
                                        allowOverflow="true"
                                        zoom="200%"
                                    />
                                </div>
                                    
                                <div className="d-flex mt-4">
                                    { 

                                        tipInfo?.photos.map(item => {
                                            return <div className="product-images" key={item} onClick={() => changeProduct(item)}>
                                                    <img src={`http://easyexpress24.com:5000/static/${item}`}/>
                                                </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 pt-5">
                                <h2>{tipInfo.name}</h2>
                                <h5 className="my-4">{tipInfo.tipsDetails}</h5>
                            </div>
                        </div>
                    ) : ''}
                </div>
            </div>
        </div>

    )
}
