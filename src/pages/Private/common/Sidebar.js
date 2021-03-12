import { localeData } from 'moment';
import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";

export default function Sidebar() {
    const [userData, setUserData] = useState();
    const className = (location, path) => {
        let className = "menu-list";
        if (location === path) className = "menu-list mm-active";
        return className;
    };

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("ExpressUserInfo"));
        setUserData(user);
    }, []);

    return (
        <div className="deznav left-sidebar">
            <div className="deznav-scroll mm-active ps ps--active-y">
                <ul className="metismenu mm-show" id="menu">
                    <li className={className(window.location.pathname, "/admin/orders")}>
                        <Link className="ai-icon menu-list-header"
                            to="/admin/orders" aria-expanded="false">
                            <i className="fa fa-first-order"></i>
                            <span className="nav-text">Orders</span>
                        </Link>
                    </li>
                    <li className={className(window.location.pathname, "/admin/products")}>
                        <Link className="ai-icon menu-list-header" 
                            to='/admin/products' aria-expanded="false">
                            <i className="fa fa-archive"></i>
                            <span className="nav-text">Products</span>
                        </Link>
                    </li>
                    {
                        userData && userData.userType === "ADMIN" ? <Fragment>
                            <li className={className(window.location.pathname, "/admin/users")}>
                                <Link className="ai-icon menu-list-header" 
                                    to="/admin/users" aria-expanded="false">
                                    <i className="fa fa-users"></i>
                                    <span className="nav-text">Users</span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/admin/category")}>
                                <Link className="ai-icon menu-list-header" 
                                    to="/admin/category" aria-expanded="false">
                                    <i className="flaticon-381-television"></i>
                                    <span className="nav-text">Category</span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/admin/tips")}>
                                <Link className="ai-icon menu-list-header" 
                                    to="/admin/tips" aria-expanded="false">
                                    <i className="flaticon-381-television"></i>
                                    <span className="nav-text">Tips</span>
                                </Link>
                            </li>
                        </Fragment> : ''
                    }
                    
                </ul>
            </div>
        </div>
    )
}
