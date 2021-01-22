import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import { getData } from "../../../scripts/api-service";
import { GET_CATEGORY_LIST, GET_CATEGORY_BRAND, GET_CATEGORY_BRAND_SUB_CATEGORY } from "../../../scripts/api";

export default function LeftSidebar() {
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState();
    const [subCategory, setSubCategory] = useState();
    const [productsCategory, setProductsCategory] = useState([]);
    useEffect(() => {
        getCategory();
        getCategoryBarnds();
        getCategoryBrandsSubCategory()
    }, []);

    const getCategory = async () => {
        let res = await getData(GET_CATEGORY_LIST);

        if (res?.data?.isSuccess) {
            setCategory(res.data.data)
        }
    }

    const getCategoryBarnds = async () => {
        let res = await getData(GET_CATEGORY_BRAND);
        
        if (res?.data?.isSuccess) {
            setBrand(res.data.data)
        }
    }

    const getCategoryBrandsSubCategory = async () => {
        let res = await getData(GET_CATEGORY_BRAND_SUB_CATEGORY);

        if (res?.data?.isSuccess) {
            setSubCategory(res.data.data)
        }
    }

    useEffect(() => {
        if (category && category.length) {
            let caTlist = [];
            category.forEach(cat => {
                let list = {
                    parent: cat.name
                },
                brands = brand.filter(b => b.category === cat._id );

                if (brands && brands.length) {
                    let clild = [];
                            
                    brands.forEach(bra => {
                        let subCat = subCategory.filter(sc => sc.categoryBrand === bra._id);

                        clild.push({
                            parent: bra.name,
                            child: subCat.map(e => e.name)
                        })
                    });
                    list.child = clild;
                }
                caTlist.push(list);
            });

            setProductsCategory(caTlist)
        }
    }, [subCategory])

    const productCatagory = [
        {
            parent: "Fruits & Vagitables",
            child: [
                {
                    parent: "Fruits" 
                },
                {
                    parent: "Vegetables"
                }
            ]
        },
        {
            parent: "Meat & Fish",
            child: [
                {
                    parent: "Meat",
                    child: ["Beaf", "Chicken", "Mutton"]
                },
                {
                    parent: "Fish",
                    child: ["Artamim", "Bagair", "Cheka", "Ilish"]
                }
            ]
        }, 
        {
            parent: "Snacks",
            child: [
                {
                    parent: "Biscuits"
                },
                {
                    parent: "Chocolates"
                },
                {
                    parent: "Crisps"
                }, 
                {
                    parent: "Noddles"
                },
                {
                    parent: "Nuts",
                }, 
                {
                    parent: "Pasta"
                },
                {
                    parent: "Sauce"
                },
                {
                    parent: "Soup"
                }
            ]
        },
        {
            parent: "Cooking",
            child: [
                {
                    parent: "Oil"
                },
                {
                    parent: "Rice"
                },
                {
                    parent: "Salt & Sugar"
                }, 
                {
                    parent: "Spices"
                }
            ]
        }
    ];

    return (
        <div className="deznav left-sidebar" id="js-public-left-sidebar">
            <div className="deznav-scroll mm-active ps ps--active-y">
				<ul className="metismenu mm-show" id="menu">
                    {
                        productsCategory.map((item, i) => {
                            return <Category item={item} key={i}></Category> 
                        } )
                    }
                </ul>
			</div>
        </div>
    )
}

function Category (props) {
    const {item} = props;
    const [isActive, setIsActive] = useState(false);
    
    const slectCategory = () => {
        setIsActive(!isActive);
    };

    return (
        // className="mm-active"
        <li className={`menu-list ${isActive ? 'has-selected' : ''}`}>
            <a onClick={slectCategory} className={`ai-icon menu-list-header ${item?.child?.length ? " has-arrow" : ""}`} 
                href="javascript:void()" aria-expanded="false">
                <i className="flaticon-381-television"></i>
                <span className="nav-text">{item.parent}</span>
            </a>
            {/* className="mm-collapse" */}
            <ul className={`p-0 ${!isActive ? 'mm-collapse' : ''}`} aria-expanded="false">
                {
                    item?.child?.length ? item.child.map((sChild, j) => {
                        return <ChildCategory sChild={sChild} key={j}></ChildCategory>
                    }) : ""
                }
            </ul>
        </li>
    )
};

function ChildCategory(props) {
    const {sChild} = props;
    const [isActive, setIsActive] = useState(false);

    const selectChildCategory = () => {
        setIsActive(!isActive)
    };

    return (
        <li className={`${isActive ? 'has-child-selected' : ''}`}>
            <a onClick={selectChildCategory} className={`${sChild?.child?.length ? "has-child-arrow" :""}`} 
                href="javascript:void()" aria-expanded="false">
                {sChild.parent}</a>
                {
                    sChild?.child?.length ? 
                    <ul className={`ml-3 ${!isActive ? 'mm-collapse': ''}`} aria-expanded="false">
                        {
                            sChild?.child?.length ? sChild.child.map((tChild, k) => {
                                return (
                                    <Fragment>
                                        <li><a>{tChild}</a></li>
                                    </Fragment>
                                )
                            }) : "" 
                        }
                    </ul>  : ""
                }                                                      
        </li>
    )
}
