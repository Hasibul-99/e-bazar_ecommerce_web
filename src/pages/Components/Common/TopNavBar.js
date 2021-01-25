import React, {Fragment, useState, useEffect} from 'react';
import Cookies from "js-cookie";

import user from "../../../assets/images/profile/17.jpg";
import logo1 from "../../../assets/images/Easyexpress24-final.png";
import {Link} from "react-router-dom";

import { LOGIN_USER_INFO } from "../../../scripts/api";
import { checkRes } from "../../../scripts/checkRes";
import { getData } from "../../../scripts/api-service";

export default function TopNavBar() {
    const [token, isSetToken] = useState();
    const [userData, setUserData] = useState();

    const hideShowLeftMenu = () => {
        let sidebar = document.getElementById("js-public-left-sidebar");

        if (sidebar.classList.contains('d-none')) {
            sidebar.classList.remove("d-none");
        } else {
            sidebar.classList.add("d-none");
        }

        let bundles = document.getElementById("js-left-bundles");

        if (bundles.classList.contains('d-none')) {
            bundles.classList.remove("d-none");
        } else {
            bundles.classList.add("d-none");
        }
    };

    const logout = () => {
        Cookies.remove('expressToken');
        localStorage.removeItem("userInfo");
        window.location.reload();
    }

    useEffect(() => {
        let token = Cookies.get("expressToken");
        isSetToken(token);

        if (token) {
            getUserInfo()
        }
    }, []);

    const getUserInfo = async () => {
        let res = await getData(LOGIN_USER_INFO);

        if (res?.status && checkRes(res.status)) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setUserData(res.data);
        }
    }

    return (
        <Fragment>
            <div className="nav-header custom-nav-header">
                <a href="/" className="brand-logo">
                    <img className="logo-abbr" src={logo1} alt=""/>
                </a>
                <div className="nav-control">
                    <div className="hamburger" onClick={hideShowLeftMenu}>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
            </div>

            <div className="header custom-header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="dashboard_bar">
                                    <div className="input-group search-area d-lg-inline-flex d-none">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="flaticon-381-search-2"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search here..."/>
                                    </div>
                                </div>
                            </div>
                            <ul className="navbar-nav header-right">
                                {
                                    token ? (
                                        <li className="nav-item dropdown header-profile">
                                            <Link className="nav-link" role="button" data-toggle="dropdown">
                                                <div className="header-info">
                                                    <span className="text-black">Hello, <strong>{userData?.name}</strong></span>
                                                </div>
                                                <img src={user} width="20" alt=""/>
                                            </Link>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                {
                                                    userData && userData.userType === "ADMIN" ? <Link to="/user-profile" className="dropdown-item ai-icon">
                                                            <i class="fa fa-angellist" aria-hidden="true"></i>
                                                            <span className="ml-2">Admin</span>
                                                        </Link> : ""
                                                }
                                                <Link to="/user-profile" className="dropdown-item ai-icon">
                                                    <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                    <span className="ml-2">Profile </span>
                                                </Link>
                                                <Link to="#!" className="dropdown-item ai-icon" onClick={() => {logout()}}>
                                                    <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                    <span className="ml-2">Logout </span>
                                                </Link>
                                            </div>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link to="/auth/registration" className="btn btn-primary btn-brand">Login</Link>
                                        </li>
                                    )
                                }

                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </Fragment>
    )
}
