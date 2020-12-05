import React, {Fragment} from 'react';
import QuantityInput from "./QuantityInput";

export default function CartBox() {
    return (
        <Fragment>
            <button className="cart-box" data-toggle="modal" data-target=".bd-example-modal-lg">
                <span className="cart-box-item">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12.686" height="16" viewBox="0 0 12.686 16"><g data-name="Group 2704" transform="translate(-27.023 -2)"><g data-name="Group 17" transform="translate(27.023 5.156)"><g data-name="Group 16"><path data-name="Path 3" d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z" transform="translate(-53.023 -101.005)" fill="currentColor"></path></g></g><g data-name="Group 19" transform="translate(30.274 2)"><g data-name="Group 18"><path data-name="Path 4" d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z" transform="translate(-157.039)" fill="currentColor"></path></g></g></g></svg></span>
                    0 Item
                </span>
                <span className="cart-box-price">
                    $00.00
                </span>
            </button>

            <div class="modal fade bd-example-modal-lg card-item-view-modal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Card Items List</h5>
                            <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body px-4">
                            <div class="list-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="product-tumb">
                                            <img src="https://i.imgur.com/xdbHo4E.png" width="85" height="85" class="card-img-top" alt="..."  />
                                        </div>
                                        <div className="product-detais mt-3">
                                            <span className="product-catagory">Women Bag</span>
                                            <h5><a href>Women Leather bag</a></h5>
                                        </div>
                                    </div>
                                    <div className="col-md-2 mt-5">
                                        Price: <span className="gold-text">$300.00</span>
                                    </div>
                                    <div className="col-md-3 mt-5">
                                        <QuantityInput></QuantityInput>
                                    </div>
                                    <div className="col-md-2 mt-5">
                                        Total Price: <span className="gold-text">$300.00</span>
                                    </div>
                                </div>
                            </div>

                            <div class="list-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="product-tumb">
                                            <img src="https://i.imgur.com/xdbHo4E.png" width="85" height="85" class="card-img-top" alt="..."  />
                                        </div>
                                        <div className="product-detais mt-3">
                                            <span className="product-catagory">Women Bag</span>
                                            <h5><a href>Women Leather bag</a></h5>
                                        </div>
                                    </div>
                                    <div className="col-md-2 mt-5">
                                        Price: <span className="gold-text">$300.00</span>
                                    </div>
                                    <div className="col-md-3 mt-5">
                                        <QuantityInput></QuantityInput>
                                    </div>
                                    <div className="col-md-2 mt-5">
                                        Total Price: <span className="gold-text">$300.00</span>
                                    </div>
                                </div>
                            </div>

                            <div class="list-group">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="product-tumb">
                                            <img src="https://i.imgur.com/xdbHo4E.png" width="85" height="85" class="card-img-top" alt="..."  />
                                        </div>
                                        <div className="product-detais mt-3">
                                            <span className="product-catagory">Women Bag</span>
                                            <h5><a href>Women Leather bag</a></h5>
                                        </div>
                                    </div>
                                    <div className="col-md-2 mt-5">
                                        Price: <span className="gold-text">$300.00</span>
                                    </div>
                                    <div className="col-md-3 mt-5">
                                        <QuantityInput></QuantityInput>
                                    </div>
                                    <div className="col-md-2 mt-5">
                                        Total Price: <span className="gold-text">$300.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}


// raid 
// anawar 
// sagar 
