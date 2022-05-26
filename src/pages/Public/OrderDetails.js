import React, {Component, Fragment} from 'react';
import { getData } from "../../scripts/api-service";
import { GET_ORDER_LIST } from "../../scripts/api";
import {Redirect} from "react-router-dom";
import demoProduct from "../../assets/images/demo-product.png";

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: props?.match?.params?.orderId,
            orderInfo: '',
        };
    }

    componentDidMount() {
        this.orderDetails();
    }

    orderDetails = async () => {
        if (this.state.orderId) {
            let res = await getData(GET_ORDER_LIST + '?_id=' + this.state.orderId);

            console.log("hehr" ,res);
            if (res?.data?.isSuccess) {
                this.setState({orderInfo: res?.data?.data[0]});
            } else {
                return <Redirect to="/admin/orders" />
            }
        }
    }


    render() {
        const order = this.state.orderInfo;

        return (
            <Fragment>
                {
                    order ? (
                    <div className="order-details row">
                        <div className="col-lg-12">
                            <div className="card h-auto">
                                <main className="card-body">
                                    <div class="row">
                                        <div class="col-sm-6"><strong>Date: </strong>{order.creatingDate}</div>
                                        {/* <div class="col-sm-6 text-sm-right"> <strong>Invoice No:</strong> 16835</div> */}
                                    </div>

                                    <hr/>

                                    <div class="row">
                                        <div class="col-sm-6 text-sm-right order-sm-1"> 
                                            {/* <strong>Pay To:</strong> */}
                                            {/* <address>
                                                Koice Inc<br />
                                                2705 N. Enterprise St<br />
                                                Orange, CA 92865<br />
                                                contact@koiceinc.com
                                            </address> */}
                                        </div>
                                        <div class="col-sm-6 order-sm-0"> 
                                        {/* <strong>Invoiced To:</strong> */}
                                            <address>
                                                {order?.user?.name}<br />
                                                {order?.user?.email}<br />
                                                {order?.user?.mobile}<br />
                                                {order?.user?.address}
                                            </address>
                                        </div>
                                    </div>
                                </main>
                            </div>
                            <div class="card h-auto">
                                <div class="table-responsive-sm">
                                    <div class="card-header px-2 py-0">
                                        <table class="table mb-0">
                                            <thead>
                                                <tr>
                                                    <td class="border-0 width-200"><strong>Products</strong></td>
                                                    <td class="border-0 width-200"><strong>Description</strong></td>
                                                    <td class="text-center border-0 width-100"><strong>Rate</strong></td>
                                                    <td class="text-center border-0 width-100"><strong>QTY</strong></td>
                                                    <td class="text-right border-0 width-100"><strong>Amount</strong></td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div class="card-body px-2">
                                        <table class="table">
                                            <tbody>
                                                {
                                                    order.products.map(pro => {
                                                        return (
                                                            <tr>
                                                                <td class="border-top-none width-200">
                                                                    <div>
                                                                        <img  width="80" height="65" 
                                                                        src={pro?.product?.photos[0] ? "http://103.163.246.31:5000/static/" + pro?.product?.photos[0] : demoProduct} />
                                                                    </div>
                                                                    <strong>{pro?.product?.name}</strong>
                                                                </td>
                                                                <td class="text-1 border-top-none width-200">{pro?.product?.productDetails}</td>
                                                                <td class="text-center border-top-none width-100 ">{pro?.product?.sellPrice}</td>
                                                                <td class="text-center border-top-none width-100 ">{pro.unit}</td>
                                                                <td class="text-right border-top-none width-100 ">{pro.price}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                

                                                {/* <tr>
                                                    <td colspan="4" class="bg-light-2 text-right"><strong>Sub Total:</strong></td>
                                                    <td class="bg-light-2 text-right">$2150.00</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" class="bg-light-2 text-right"><strong>Tax:</strong></td>
                                                    <td class="bg-light-2 text-right">$215.00</td>
                                                </tr> */}
                                                <tr>
                                                    <td colspan="4" class="bg-light-2 text-right"><strong>Total:</strong></td>
                                                    <td class="bg-light-2 text-right">{order?.totalPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''
            }

            <br/>
            <br/>
            <br/>
            </Fragment>
        )
    }
}
