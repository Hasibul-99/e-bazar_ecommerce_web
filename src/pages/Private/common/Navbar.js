import React, {Fragment, useState, useEffect} from 'react';
import Cookies from "js-cookie";

import user from "../../../assets/images/profile/17.jpg";
import logo1 from "../../../assets/images/Easyexpress24-final.png";

import { LOGIN_USER_INFO } from "../../../scripts/api";
import { checkRes } from "../../../scripts/checkRes";
import { getData } from "../../../scripts/api-service";

export default function Navbar() {
    const [token, isSetToken] = useState();
    const [userData, setUserData] = useState();

    useEffect(() => {
        let token = Cookies.get("expressToken");
        isSetToken(token);
        getUserInfo()
    }, []);

    const getUserInfo = async () => {
        let res = await getData(LOGIN_USER_INFO);

        if (res?.status && checkRes(res.status)) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setUserData(res.data);
        }
    }

    const logout = () => {
        Cookies.remove('expressToken');
        localStorage.removeItem("userInfo");
        window.location = '/';

    }

    return (
        <Fragment>
            <div className="nav-header custom-nav-header">
                <a href="index.html" className="brand-logo">
                    <img className="logo-abbr" src={logo1} alt=""/>
                </a>

                <div className="nav-control">
                    <div className="hamburger">
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
                                    {/* <div className="input-group search-area d-lg-inline-flex d-none">
                                        <div className="input-group-append">
                                            <span className="input-group-text"><i className="flaticon-381-search-2"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search here..."/>
                                    </div> */}
                                </div>
                            </div>
                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown header-profile">
                                    <a className="nav-link" href="javascript:void(0)" role="button" data-toggle="dropdown">
                                        <div className="header-info">
                                            <span className="text-black">Hello,<strong> {userData?.name}</strong></span>
                                            <p className="fs-12 mb-0">{userData?.userType}</p>
                                        </div>
                                        <img src={user} width="20" alt=""/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#!" className="dropdown-item ai-icon">
                                            <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <span className="ml-2">Profile </span>
                                        </a>
                                        <a href="#!" className="dropdown-item ai-icon">
                                            <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            <span className="ml-2">Inbox </span>
                                        </a>
                                        <a href="#!" className="dropdown-item ai-icon" onClick={() => {logout()}}>
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            <span className="ml-2">Logout </span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </Fragment>
    )
}
