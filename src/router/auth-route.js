
import Singin from "../pages/Auth/Signin";
import SignUp from "../pages/Auth/SignUp";
import ForgetPassword from "../pages/Auth/ForgetPassword"; 

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
        path: "/forget-password",
        name: "Forget Password",
        component: ForgetPassword,
        layout: "/auth"
    }
]

export default AuthRouters;