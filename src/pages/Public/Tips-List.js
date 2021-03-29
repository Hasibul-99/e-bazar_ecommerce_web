import React, {Fragment, useEffect, useState, useContext} from 'react'
import { getData } from "../../scripts/api-service";
import { GET_TIPS } from "../../scripts/api";
import demoProduct from "../../assets/images/demo-product.png";
import {Link} from "react-router-dom";
import ItemType from "./Landing/ItemType";

export default function Tips() {
    const [tips, setTips] = useState();


    useEffect(() => {
        getTips();
    }, []);

    const getTips = async () => {
        let res = await getData(GET_TIPS);

        if (res?.data?.isSuccess) {
            setTips(res?.data?.data);
        }
    }

    return (
        <div className="home-landing">
            <ItemType></ItemType>
            
            <div className="non-Brand-items card">
                <div className="card-body">
                    <div className="row">
                        {   
                            tips?.length ? 
                            tips.map(tip => {
                                return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={tip._id}>
                                        <div className="product-card">
                                            <div className="product-tumb">
                                                {
                                                    tip?.photos?.length ? <Fragment>
                                                        <img src={`http://easyexpress24.com:5000/static/${tip?.photos[0]}`} alt=""/>
                                                    </Fragment> : <Fragment>
                                                        <img src={demoProduct} alt=""/>
                                                    </Fragment>
                                                }
                                            </div>
                                            <div className="product-details">
                                                {/* <span className="product-catagory">Women,bag</span> */}
                                                <h5><Link to={`/tip/${tip._id}`}>{tip.name}</Link></h5>
                                                <div className="product-bottom-details">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }) : <h3>No Tips Found</h3>
                        }
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>

        </div>
    )
}


