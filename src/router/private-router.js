import Orders from "../pages/Private/pages/Orders";
import Products from "../pages/Private/pages/Products";
import Users from "../pages/Private/pages/Users";
import ProductAdd from "../pages/Private/pages/ProductAdd";
import Category from "../pages/Private/pages/Category";
import Brand from "../pages/Private/pages/Brand";
import SubCategory from "../pages/Private/pages/SubCategory";
import ProductEdit from "../pages/Private/pages/ProductEdit";
import OrderDetails from "../pages/Private/pages/OrderDetails";

const PrivateRoutes = [
    {
        path: "/orders",
        name: "Orders",
        component: Orders,
        layout: "/admin",
        exact: true
    },
    {
        path: "/order-details/:orderId",
        name: "order details",
        component: OrderDetails,
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
        path: "/edit-products/:productId",
        name: "edit prodyct",
        component: ProductEdit,
        layout: "/admin",
        exact: true
    },
    {
        path: "/add-products",
        name: "Products",
        component: ProductAdd,
        layout: "/admin",
        exact: true
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        layout: "/admin",
        exact: true
    },
    {
        path: "/category",
        name: "Category",
        component: Category,
        layout: "/admin",
        exact: true
    },
    {
        path: "/brand/:categoryId",
        name: "Brand",
        component: Brand,
        layout: "/admin",
        exact: true
    },
    {
        path: "/sub-category/:categoryId/:brandId",
        name: "Sub Category",
        component: SubCategory,
        layout: "/admin",
        exact: true
    }
];

export default PrivateRoutes;