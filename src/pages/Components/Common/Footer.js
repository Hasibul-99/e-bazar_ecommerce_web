import React from 'react';
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <div className="copyright">
                <p>Copyright © Designed &amp; Developed by <a href="#!" target="_blank">Easy Express 24</a> 2020 </p>
                <div className="text-center mt-2">
                    <span className="mr-2"><Link to="/about">About Us</Link></span>
                    <span className="mr-2"><Link to="/terms-conditions">Terms and Condition</Link></span>
                    <span className="mr-2"><Link to="/privacy-policy">Privacy Policy</Link></span>
                    <span className=""><Link to="/return-policy">Return Policy</Link></span>
                </div>
            </div>
        </div>
    )
}
