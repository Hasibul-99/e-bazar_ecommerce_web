import Orders from "../pages/Private/pages/Orders";
import Products from "../pages/Private/pages/Products";
import Users from "../pages/Private/pages/Users";

const PrivateRoutes = [
    {
        path: "/orders",
        name: "Orders",
        component: Orders,
        layout: "/admin",
        exact: true
    },
    {
        path: "/products",
        name: "Products",
        component: Products,
        layout: "/admin",
        exact: true
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        layout: "/admin",
        exact: true
    }
];

export default PrivateRoutes;