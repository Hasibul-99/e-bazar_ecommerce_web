import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="deznav left-sidebar">
            <div className="deznav-scroll mm-active ps ps--active-y">
                <ul className="metismenu mm-show" id="menu">
                    <li className="menu-list mm-active">
                        <Link className="ai-icon menu-list-header"
                            to="/admin/orders" aria-expanded="false">
                            <i className="fa fa-first-order"></i>
                            <span className="nav-text">Orders</span>
                        </Link>
                    </li>
                    <li className="menu-list">
                        <Link className="ai-icon menu-list-header" 
                            to='/admin/products' aria-expanded="false">
                            <i className="fa fa-archive"></i>
                            <span className="nav-text">Products</span>
                        </Link>
                    </li>
                    <li className="menu-list">
                        <Link className="ai-icon menu-list-header" 
                            to="/admin/users" aria-expanded="false">
                            <i className="fa fa-users"></i>
                            <span className="nav-text">Users</span>
                        </Link>
                    </li>
                    <li className="menu-list">
                        <Link className="ai-icon menu-list-header" 
                            to="#!" aria-expanded="false">
                            <i className="flaticon-381-television"></i>
                            <span className="nav-text">Customers</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
