import React, { createContext, useState, useEffect } from 'react';

import Localbase from 'localbase';
let db = new Localbase('db');

export const orderListContext = createContext();

const OrderListContextProvider = props => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getCardProducts();
    }, []);

    const getCardProducts = () => {
        db.collection('products').get().then(products => {
            if (products && products.length) {
                setProducts(products);
            }
        });
    }

    const addNewProduct = (item, total) => {
        item.total = total || 1;
        db.collection('products').add(item).then(res => {
            getCardProducts();
        });
    };

    const updateQuamtity = (productId, qun) => {
        db.collection('products').doc({ _id: productId }).update({
            total : qun
        }).then(res => {
            getCardProducts();
        })
    }

    const deleteProductCollection = () => {
        db.collection('products').delete().then(res => {
            getCardProducts();
        })
    }

    const findCardProduct = (productId) => {
        return db.collection('products').doc({ _id: productId }).get();
    }

    return (
        <orderListContext.Provider 
            value={{
                products,
                updateQuamtity,
                deleteProductCollection,
                findCardProduct,
                addNewProduct
            }}>
            {props.children}
        </orderListContext.Provider>
    )
}

export default OrderListContextProvider