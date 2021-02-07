import React, {useEffect, useState, Fragment} from 'react';
import { Link } from "react-router-dom";
import { getData } from "../../../scripts/api-service";
import { GET_CATEGORY_LIST } from "../../../scripts/api";
import Localbase from 'localbase';
let db = new Localbase('db');

export default function NonBrandItems(props) {
    const [categories, setCategory] = useState([]);

    useEffect(() => {
        getNonBrandCategory()
    }, []);

    const getNonBrandCategory = async () => {
        let res = await getData(GET_CATEGORY_LIST+ '?isUnbrandCategory=true&limit=10000');

        if (res?.data?.isSuccess) {
            setCategory(res?.data?.data);
        }
    };

    return (
        <Fragment>
            {
                categories.length ? <div className="non-Brand-items card">
                    <div className="card-body">
                        <div className="row">
                            {   
                                categories.map(category => {
                                    return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={category._id}>
                                        <div className="nonbrand-product">
                                            <Link to={`/products?category=${category._id}`}>
                                                {category.name}
                                            </Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div> : ''
            }
        </Fragment>
        
        
    )
}
