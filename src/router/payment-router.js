import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import PaymentFaild from '../pages/Payment/PaymentFaild';

const PaymentRouters = [
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