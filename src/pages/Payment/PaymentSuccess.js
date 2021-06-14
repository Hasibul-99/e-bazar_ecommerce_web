import React from 'react';
import TopNavBar from "../Components/Common/TopNavBar";

export default function PaymentSuccess() {
    return (
        <>
            <TopNavBar></TopNavBar>
            <div className="payment-success">
                <div className="card-success">
                    <div style={{borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto'}}>
                        <i className="checkmark">✓</i>
                    </div>
                        <h1>Success</h1> 
                        <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
                </div>
            </div>
        </>
    )
}
