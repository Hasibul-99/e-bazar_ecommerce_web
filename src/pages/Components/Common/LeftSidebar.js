import React, {Fragment, useEffect, useState} from 'react';
import {Link,useHistory} from "react-router-dom";
import { getData } from "../../../scripts/api-service";
import { GET_CATEGORY_MENU_LIST } from "../../../scripts/api";

export default function LeftSidebar() {
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState();
    const [subCategory, setSubCategory] = useState();
    const [productsCategory, setProductsCategory] = useState([]);
    
    useEffect(() => {
        getcategoryMenu()
    }, []);

    const getcategoryMenu = async () => {
        let res = await getData(GET_CATEGORY_MENU_LIST);

        console.log("res", res);
        if (res?.data?.isSuccess) {
            let {categories, categoriesBrand, categoriesBrandSubCategories} = res?.data?.data;

            setCategory(categories);
            setBrand(categoriesBrand);
            setSubCategory(categoriesBrandSubCategories);
        }
    };

    useEffect(() => {
        if (category && category.length) {
            let caTlist = [];
            category.forEach(cat => {
                let list = {
                    _id: cat._id,
                    parent: cat.name
                },
                brands = brand?.length ? brand.filter(b => b.category === cat._id ) : [];

                if (brands && brands.length) {
                    let clild = [];
                            
                    brands.forEach(bra => {
                        let subCat = subCategory?.length ? subCategory.filter(sc => sc.categoryBrand === bra._id) : [];

                        clild.push({
                            _id: bra._id,
                            parent: bra.name,
                            child: subCat.map(e => { return {name: e.name, _id: e._id} })
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
    const history = useHistory();
    
    const slectCategory = () => {
        setIsActive(!isActive);
        changePage();
    };

    const changePage = () => {
        history.push(`/products?category=${item._id}`);
    }

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
    const history = useHistory();

    const selectChildCategory = () => {
        setIsActive(!isActive);
        changePage();
    };

    const updateQueryStringParameter = (uri, key, value) => {
        var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
        if (uri.match(re)) {
          return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
          var hash =  '';
          if( uri.indexOf('#') !== -1 ){
              hash = uri.replace(/.*#/, '#');
              uri = uri.replace(/#.*/, '');
          }
          var separator = uri.indexOf('?') !== -1 ? "&" : "?";    
          return uri + separator + key + "=" + value + hash;
        }
    }

    const changePage = () => {
        let {location} = history,
            {search} = location;
        
        let query = search ? updateQueryStringParameter(search, 'categoryBrand', sChild._id) : "?categoryBrand=" + sChild._id;
        history.push(`/products?categoryBrand=` + sChild._id);
    }

    const contentUpdate = (item) => {
        let {location} = history,
            {search} = location;
        
        let query = search ? updateQueryStringParameter(search, 'categoryBrandSubCategory', item._id) : "categoryBrandSubCategory=" + item._id;
        history.push(`/products?categoryBrandSubCategory=` + item._id);
    }

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
                                    <Fragment key={k}>
                                        <li className="cursore-pointer">
                                            <a onClick={() => contentUpdate(tChild)}>{tChild.name}</a>
                                        </li>
                                    </Fragment>
                                )
                            }) : "" 
                        }
                    </ul>  : ""
                }                                                      
        </li>
    )
}
