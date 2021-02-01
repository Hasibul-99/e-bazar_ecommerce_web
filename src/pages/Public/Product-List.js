import React, {Fragment, useEffect, useState} from 'react';
import $ from "jquery";
import { getData } from "../../scripts/api-service";
import { GET_RPODUCT } from "../../scripts/api";
import demoProduct from "../../assets/images/demo-product.png";
import ProductModalView from "../Components/Common/ProductModalView";
import Localbase from 'localbase';
let db = new Localbase('db');

export default function ProductList(props) {
    const {location} = props;
    const {search} = location;
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts(search)
    }, [search]);

    const getProducts = async (query) => {
        let url = query ? GET_RPODUCT + query : GET_RPODUCT;
        let res = await getData(url);

        if (res?.data?.isSuccess) {
            setProducts(res?.data?.data);
        }
    }

    return (
        <div>
            Hello
        </div>
    )
}
