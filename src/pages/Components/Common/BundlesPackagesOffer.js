import React from 'react';
import {Link} from "react-router-dom"

export default function BundlesPackagesOffer() {
    return (
        <div className="bundles-packages-offer" id="js-left-bundles">
               <Link to="/products?isBundleProduct=true">Bundels / Packages offer</Link> 
        </div>
    )
}
