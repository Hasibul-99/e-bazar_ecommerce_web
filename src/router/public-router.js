import Landing from "../pages/Public/Landing/index";
import UserProfile from "../pages/Public/UserProfile";
import ProductList from "../pages/Public/Product-List";
import OrderDetails from "../pages/Public/OrderDetails";
import Tips from "../pages/Public/Tips-List";
import TipsDetails from "../pages/Public/Tips-details";
import ProductInfo from "../pages/Public/Product-Info";
import About from "../pages/Public/About";
import TermsConditions from "../pages/Public/TermsConditions";
import PrivacyPolicy from "../pages/Public/PrivacyPolicy";
import ReturnPolicy from "../pages/Public/ReturnPolicy";
import SearchProduct from  "../pages/Public/SearchProduct";

const PublicRoutes = [
    {
        path: "/",
        name: "Landing",
        component: Landing,
        layout: "/",
        exact: true
    },
    {
        path: "/user-profile",
        name: "Landing",
        component: UserProfile,
        layout: "/",
        exact: true
    },
    {
        path: "/products",
        name: "Landing",
        component: ProductList,
        layout: "/",
        exact: true
    },
    {
        path: "/product/:productId",
        name: "product info",
        component: ProductInfo,
        layout: "/",
        exact: true
    },
    {
        path: "/search/:searchValue",
        name: "Search Product",
        component: SearchProduct,
        layout: "/",
        exact: true
    },
    {
        path: "/order-details/:orderId",
        name: "order details",
        component: OrderDetails,
        layout: "/",
        exact: true
    },
    {
        path: "/tips",
        name: "Tips List",
        component: Tips,
        layout: "/",
        exact: true
    },
    {
        path: "/tip/:tipId",
        name: "Tips Info",
        component: TipsDetails,
        layout: "/",
        exact: true
    },
    {
        path: "/about",
        name: "Tips Info",
        component: About,
        layout: "/",
        exact: true
    },
    {
        path: "/terms-conditions",
        name: "Tips Info",
        component: TermsConditions,
        layout: "/",
        exact: true
    },
    {
        path: "/privacy-policy",
        name: "Tips Info",
        component: PrivacyPolicy,
        layout: "/",
        exact: true
    },
    {
        path: "/return-policy",
        name: "Tips Info",
        component: ReturnPolicy,
        layout: "/",
        exact: true
    },
]

export default PublicRoutes;