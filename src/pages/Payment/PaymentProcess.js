import React, { useEffect } from 'react'
import easyCheckout from 'easycheckout';
import { useParams } from 'react-router-dom';
import { PAYMENT_BY_ORDERID} from "../../scripts/api";
import { getData } from "../../scripts/api-service";
import TopNavBar from "../Components/Common/TopNavBar";

export default function PaymentProcess() {
    const { orderId } = useParams();

    useEffect(() => {
        if (orderId) {
            getPaymentByOrderId(orderId);
        }
    }, [])
    
    const getPaymentByOrderId = async (orderId) => {
        let res = await getData(PAYMENT_BY_ORDERID+ '/' + orderId);

        let masterData = res.data;

        if (masterData) {
            easyCheckout(masterData.directPaymentURL || masterData.GatewayPageURL, masterData.storeLogo, null, true)
        }
    }
    return (
        <>
            <TopNavBar></TopNavBar>
        </>
    )
}
