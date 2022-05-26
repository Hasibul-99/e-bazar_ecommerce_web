import React, { useEffect, useState, Fragment, useContext } from 'react';
import {useParams, Link} from "react-router-dom";
import { PRODUCT_SEARCH, SEARCH_CATEGORY, SEARCH_BRAND, SEARCH_CATEGORY_BRAND_SUBCATEGORY } from "../../scripts/api";
import { getData } from "../../scripts/api-service";
import StartContent from "../Components/Common/StartContent"
import demoProduct from "../../assets/images/demo-product.png";
import ProductModalView from "../Components/Common/ProductModalView";
import $ from "jquery";
import {orderListContext} from "../../contexts/OrderListContext";
import categoryIcon from "../../assets/images/category-icon.png"

export default function SearchProduct() {
    const { searchValue } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setcategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [subCate, setSubCate] = useState([]);

    const getAllData = async (value) => {
        let res1 = await getData(PRODUCT_SEARCH + value);
        if (res1.data.isSuccess) {
            let products = res1.data.data;
            if (products?.length) setProducts(products);
            else setProducts([])
        }

        let res2 = await getData(SEARCH_CATEGORY + value);
        if (res2.data.isSuccess) {
            let category = res2.data.data;
            if (category.length) setcategory(category);
            else setcategory([]);
        }

        let res3  = await getData(SEARCH_BRAND + value);
        if (res3.data.isSuccess) {
            let brand = res3.data.data;

            if (brand.length) setBrand(brand);
            else setBrand([]);
        }

        let res4  = await getData(SEARCH_CATEGORY_BRAND_SUBCATEGORY + value);
        if (res4.data.isSuccess) {
            let subcategory = res4.data.data;
            
            if (subcategory.length) setSubCate(subcategory);
            else setSubCate([]);
        }
    }

    useEffect(() => {
        console.log("searchValue", searchValue);

        getAllData(searchValue)
    }, [searchValue])

    return (
        <div className="home-landing pb-5 mb-5">
            
            <div className="non-Brand-items card">
                <div className="card-body">
                    {
                        products.length ? <>
                            <h4>Products</h4>
                            <hr/>

                            <div className="row">
                                {   
                                    products.length ? 
                                    products.map(product => {
                                        return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={product._id}>
                                                <ProductCard product={product}></ProductCard>
                                            </div>
                                    }) : <h3>No Product Found</h3>
                                }
                            </div>
                        </> : ''
                    }

                    {
                        category.length ? <>
                            <h4>Categories</h4>
                            <hr/>
                            <div className="row mb-5">
                                {   
                                    category.map(cat => {
                                        return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={cat._id}>
                                                <div className="product-card  card">
                                                    <div className="card-body">
                                                        <Link to={`/products?category=${cat._id}`}>{/* &name=${searchValue} */}
                                                                {
                                                                    cat.photo ? (
                                                                        <img className="cat-image-content" src={`http://103.163.246.31:5000/static/${cat.photo}`} height="50" width="50" />
                                                                    ) : (
                                                                        <img className="cat-image-content" src={categoryIcon} height="50" width="50" />
                                                                        )
                                                                }
                                                            <span className="nav-text">{cat.name}</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                    })
                                }
                            </div>
                        </> : ''
                    }

                    {
                        brand.length ? <>
                            <h4>Brands</h4>
                            <hr/>
                            <div className="row mb-5">
                                {   
                                    brand.map(bra => {
                                        return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={bra._id}>
                                                <div className="product-card  card">
                                                    <div className="card-body">
                                                        <Link to={`/products?categoryBrand=${bra._id}`}>{/* &name=${searchValue} */}
                                                
                                                            <span className="nav-text">{bra.name}</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                    })
                                }
                            </div>
                        </> : ''
                    }

                    {
                        subCate.length ? <>
                            <h4>Sub-category</h4>
                            <hr/>
                            <div className="row">
                                {   
                                    subCate.map(sc => {
                                        return <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3" key={sc._id}>
                                                <div className="product-card  card">
                                                    <div className="card-body">
                                                        <Link to={`/products?categoryBrandSubCategory=${sc._id}`}>{/* &name=${searchValue} */}
                                                
                                                            <span className="nav-text">{sc.name}</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                    })
                                }
                            </div>
                        </> : ''
                    }
                    
                </div>
            </div>
        </div>
    )
}

function ProductCard( {product}) {
    const {findCardProduct, updateQuamtity, addNewProduct} = useContext(orderListContext);

    const [isOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(Math.random());
 
    const openModal = (productId) => {
        $(`#product-view-modal-${productId}`).modal("show");
        setIsOpen(true);
    }

    const handelModalClose = () => {
        
    }

    const addProductIncard = (item) => {
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));
        if (user && user._id) {
            findCardProduct(item._id).then(res => {
                if (res) {
                    // updateQuamtity(item._id, res.total + 1);
                } else {
                    addNewProduct(item);
                }
            });
        } else {
            window.location = "/auth/registration"
        }
        
    }

    return (
        <Fragment>
            <div className="product-card 324">
                {
                    !(product.stock - product.totalSell) ? 
                    <div className="badge">Out of Stock</div> : ''
                }
                <div className="product-tumb">
                    {
                        product?.photos?.length ? <Fragment>
                            <img className="cursore-pointer" onClick={()=> openModal(product._id)}
                                src={`http://103.163.246.31:5000/static/${product?.photos[0]}`} alt=""/>
                        </Fragment> : <Fragment>
                            <img className="cursore-pointer" src={demoProduct} alt=""/>
                        </Fragment>
                    }
                </div>
                <div className="product-details">
                    {/* <span className="product-catagory">Women,bag</span> */}
                    <h5><a className="cursore-pointer" onClick={()=> openModal(product._id)}>{product.name}</a></h5>
                    <div>
                        <StartContent product={product}></StartContent>
                    </div>
                    <div className="product-bottom-details">
                        <div className="product-price">
                            {
                                product.discountPrice ? <Fragment>
                                    <small>৳{product.sellPrice}</small>
                                    ৳{ product.sellPrice - product.discountPrice }
                                </Fragment> : <Fragment>৳{product.sellPrice}</Fragment> 
                            }
                        </div>
                        <div className="product-links">
                            <span className="cursore-pointer mr-2" onClick={()=> openModal(product._id)}>
                                <i className="fa fa-eye"></i>
                            </span>
                            <span className="cursore-pointer" onClick={() => addProductIncard(product)}>
                                <i className="fa fa-shopping-cart"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProductModalView
                productId={product._id} 
                isOpen={isOpen}
                product={product}
                update={update}
                HandelModalClose={handelModalClose}>
            </ProductModalView>

            <br/>
            <br/>
            <br/>
        </Fragment>
        
    )
}
