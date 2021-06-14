import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import PaymentFaild from '../pages/Payment/PaymentFaild';
import PaymentProcess from "../pages/Payment/PaymentProcess";

const PaymentRouters = [
    {
        path: "/process/:orderId",
        name: "payment-process",
        component: PaymentProcess,
        layout: "/payment"
    },
    {
        path: "/success",
        name: "payment-success",
        component: PaymentSuccess,
        layout: "/payment"
    },
    {
        path: "/failed",
        name: "payment-faild",
        component: PaymentFaild,
        layout: "/payment"
    },
]

export default PaymentRouters;