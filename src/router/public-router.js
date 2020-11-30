import Landing from "../pages/Public/Landing/index";

const PublicRoutes = [
    {
        path: "/",
        name: "Landing",
        component: Landing,
        layout: "/",
        exact: true
    }
]

export default PublicRoutes;