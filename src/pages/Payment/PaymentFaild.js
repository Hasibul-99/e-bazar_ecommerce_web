import React from 'react'
import TopNavBar from "../Components/Common/TopNavBar";

export default function PaymentFaild() {
    return (
    <>
        <TopNavBar></TopNavBar>
        <div className="payment-failed">
            <div className="card-failed">
                <div style={{borderRadius: '200px', height: '200px', width: '200px', background: 'rgb(236 57 89 / 32%)', margin: '0 auto'}}>
                    <i className="checkmark">!</i>
                </div>
                    <h1>Failed</h1> 
                    <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
            </div>
        </div>
    </>
    )
}
