import Landing from "../pages/Public/Landing/index";
import UserProfile from "../pages/Public/UserProfile";
import ProductList from "../pages/Public/Product-List";
import OrderDetails from "../pages/Public/OrderDetails";

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
        path: "/order-details/:orderId",
        name: "order details",
        component: OrderDetails,
        layout: "/",
        exact: true
    },
]

export default PublicRoutes;