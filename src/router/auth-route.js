
import Singin from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Registration from "../pages/Auth/Registration"
const AuthRouters = [
    {
        path: "/login",
        name: "Login",
        component: Singin,
        layout: "/auth"
    },
    {
        path: "/sigup",
        name: "Signup",
        component: SignUp,
        layout: "/auth"
    },
    {
        path: "/registration",
        name: "Registration",
        component: Registration,
        layout: "/auth"
    },
    {
        path: "/forget-password",
        name: "Forget Password",
        component: ForgetPassword,
        layout: "/auth"
    }
]

export default AuthRouters;