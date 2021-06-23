import React, {Fragment, useState, useEffect} from 'react';
import Cookies from "js-cookie";

import user from "../../../assets/images/profile/17.jpg";
import logo1 from "../../../assets/images/Easyexpress24-final.png";
import {Link, useHistory} from "react-router-dom";

import { LOGIN_USER_INFO, PRODUCT_SEARCH, SEARCH_CATEGORY, SEARCH_BRAND, SEARCH_CATEGORY_BRAND_SUBCATEGORY } from "../../../scripts/api";
import { checkRes } from "../../../scripts/checkRes";
import { getData } from "../../../scripts/api-service";
// import { withSwalInstance } from 'sweetalert2-react';
import appicon from "../../../assets/images/Apps-Android-icon.png";
import swal from 'sweetalert2';

export default function TopNavBar() {
        
    const history = useHistory();
    const [token, isSetToken] = useState();
    const [userData, setUserData] = useState();
    const [searchResult, setSearchReasult] = useState([]);

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
        localStorage.removeItem("ExpressUserInfo");
        window.location.reload();
    }

    useEffect(() => {
        let token = Cookies.get("expressToken");
        isSetToken(token);

        if (token) {
            getUserInfo()
        }

        let width = window.innerWidth;

        if (width < 500) {
            hideShowLeftMenu();
        }
    }, []);

    const getUserInfo = async () => {
        let res = await getData(LOGIN_USER_INFO);

        if (res?.status && checkRes(res.status)) {
            localStorage.setItem("ExpressUserInfo", JSON.stringify(res.data));
            setUserData(res.data);
        }
    }

    const searchKeyPresss = async (e) => {
        let value = e.target.value,
            products = [],
            category = [],
            brand = [],
            subcategory = [];

            // console.log("value",value);

        if (value.length > 2) {
            let res1 = await getData(PRODUCT_SEARCH + value);
            if (res1.data.isSuccess) {
                products = res1.data.data;
            }

            let res2 = await getData(SEARCH_CATEGORY + value);
            if (res2.data.isSuccess) {
                category = res2.data.data;
            }

            let res3  = await getData(SEARCH_BRAND + value);
            if (res3.data.isSuccess) {
                brand = res3.data.data;
            }

            let res4  = await getData(SEARCH_CATEGORY_BRAND_SUBCATEGORY + value);
            if (res4.data.isSuccess) {
                subcategory = res4.data.data;
            }

            let search = [...products, ...category, ...brand, ...subcategory]
            setSearchReasult(search);

            if(e.keyCode == 13) {
                if (search[0]) {
                    showReasult(search[0]);
                } else {
                    swal.fire({
                        text:`There is no data with ${value}`,
                        icon: 'warning',
                        confirmButtonText:'Ok',
                      })
                }
            }

        } else if (value.length === 0) {
            setSearchReasult([]);
        }
    }

    const showReasult = (res) => {

        console.log("res", res);
        if ('productDetails' in res) {
            // history.push(`/product/${res._id}`);
            window.location = `/product/${res._id}`;
        } else if ('isUnbrandCategory' in res) {
            history.push(`/products?category=${res._id}`);
        } else if (res.category) {
            history.push(`/products?categoryBrand=${res._id}`);
        } else if (res.category && res.categoryBrand) {
            history.push(`/products?categoryBrandSubCategory=${res._id}`);
        } else {
            history.push(`/products?category=no_data`);
        }

        setTimeout(() => {
            setSearchReasult([]);
        }, 1000)
    }

    const keyPress = (e) => {
        if(e.keyCode == 13) {
            // console.log('value', e.target.value);
            // put the login here
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
                                <div className="dashboard_bar row">
                                    <div className="col-md-7 search-container">
                                        <div className="input-group search-area d-lg-inline-flex">
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i className="flaticon-381-search-2"></i></span>
                                            </div>
                                            <input type="text" className="form-control" onKeyUp={searchKeyPresss} 
                                                onKeyDown={keyPress} placeholder="Search here..."/>
                                        </div>
                                        <div className="search-option">
                                            <ul className="select-dropdown-menu">
                                                {searchResult.length ? (
                                                    searchResult.map(sea => {
                                                        return <li key={sea._id} className="select-dropdown-menu-item" onClick={() => showReasult(sea)}>
                                                            {sea.name}</li>
                                                    })
                                                ) : ''}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-5 compani-info pt-2">
                                        <p className="mb-0">Email: info.easyexpress24@gmail.com</p>
                                        <p>Mobile: 01911559933</p>
                                    </div>
                                </div>
                            </div>
                            <ul className="navbar-nav header-right">
                                <li className="nav-item">
                                    <Link to="/auth/registration">
                                        <img src={appicon} height="50" width="50"/>
                                    </Link>
                                </li>
                                
                                {
                                    token ? (
                                        <li className="nav-item dropdown header-profile">
                                            <Link className="nav-link" role="button" data-toggle="dropdown">
                                                <div className="header-info">
                                                    <span className="text-black">Hello, <strong>{userData?.name}</strong></span>
                                                </div>
                                                <img src={ userData?.avatar ? `http://easyexpress24.com:5000/static/${userData.avatar}` : user} width="20" alt=""/>
                                            </Link>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                {
                                                    userData && userData.userType === "ADMIN" ? <Link to="/admin/products" className="dropdown-item ai-icon">
                                                            <i class="fa fa-angellist" aria-hidden="true"></i>
                                                            <span className="ml-2">Admin</span>
                                                        </Link> : ""
                                                }
                                                {
                                                    userData && userData.userType === "MARCHANT" ? <Link to="/admin/products" className="dropdown-item ai-icon">
                                                            <i class="fa fa-angellist" aria-hidden="true"></i>
                                                            <span className="ml-2">MARCHANT</span>
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
