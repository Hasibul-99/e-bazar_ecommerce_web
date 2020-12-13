import React, {Fragment} from 'react'

export default function Sidebar() {
    const productCatagory = [
        {
            parent: ""
        },
        {
            parent: "Products"
        }, 
        {
            parent: "Users"
        },
        {
            parent: "Customers"
        }
    ];

    return (
        <div className="deznav left-sidebar">
            <div className="deznav-scroll mm-active ps ps--active-y">
                <ul className="metismenu mm-show" id="menu">
                                {/* // className="mm-active" */}
                    <li className="menu-list mm-active">
                        <a className="ai-icon menu-list-header"
                        href="javascript:void()" aria-expanded="false">
                            <i className="flaticon-381-television"></i>
                            <span className="nav-text">Orders</span>
                        </a>
                    </li>
                    <li className="menu-list">
                        <a className="ai-icon menu-list-header" 
                        href="javascript:void()" aria-expanded="false">
                            <i className="flaticon-381-television"></i>
                            <span className="nav-text">Products</span>
                        </a>
                    </li>
                    <li className="menu-list">
                        <a className="ai-icon menu-list-header" 
                        href="javascript:void()" aria-expanded="false">
                            <i className="flaticon-381-television"></i>
                            <span className="nav-text">Users</span>
                        </a>
                    </li>
                    <li className="menu-list">
                        <a className="ai-icon menu-list-header" 
                        href="javascript:void()" aria-expanded="false">
                            <i className="flaticon-381-television"></i>
                            <span className="nav-text">Customers</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
