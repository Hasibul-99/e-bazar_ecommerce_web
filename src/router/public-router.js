import Landing from "../pages/Public/Landing/index";
import UserProfile from "../pages/Public/UserProfile";

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
    }
]

export default PublicRoutes;