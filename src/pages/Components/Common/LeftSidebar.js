import React, {Fragment} from 'react';

export default function LeftSidebar() {
    
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
        <div className="deznav left-sidebar">
            <div className="deznav-scroll mm-active ps ps--active-y">
				<ul className="metismenu mm-show" id="menu">
                    {
                        productCatagory.map((item, i) => {
                            return (
                                // className="mm-active"
                                <li className="menu-list">
                                    <a className={`ai-icon menu-list-header ${item?.child?.length ? " has-arrow" : ""}`} href="javascript:void()" aria-expanded="false">
                                        <i className="flaticon-381-television"></i>
                                        <span className="nav-text">{item.parent}</span>
                                    </a>
                                    {/* className="mm-collapse" */}
                                    <ul className="p-0" aria-expanded="false">
                                        {
                                            item?.child?.length ? item.child.map((sChild, j) => {
                                                return (
                                                    <li>
                                                        <a className={`${sChild?.child?.length ? "has-arrow" :""}`} href="javascript:void()" aria-expanded="false">
                                                            -{sChild.parent}</a>
                                                            {
                                                                sChild?.child?.length ? 
                                                                <ul className="ml-3" aria-expanded="false">
                                                                    {
                                                                        sChild?.child?.length ? sChild.child.map((tChild, k) => {
                                                                            return (
                                                                                <Fragment>
                                                                                    <li><a>--{tChild}</a></li>
                                                                                </Fragment>
                                                                            )
                                                                        }) : "" 
                                                                    }
                                                                </ul>  : ""
                                                            }                                                      
                                                    </li>
                                                )
                                            }) : ""
                                        }
                                    </ul>
                                </li>
                            )
                        } )
                    }
                </ul>
			</div>
        </div>
    )
}
