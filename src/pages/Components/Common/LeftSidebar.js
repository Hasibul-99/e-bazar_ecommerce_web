import React, {Fragment, useState} from 'react';

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
