import React, {Fragment, useState, useEffect} from 'react';

import $ from "jquery";
import { toast } from 'react-toastify';
import { postData, getData } from "../../../scripts/api-service";
import { GET_TIPS, CREATE_TIPS } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";

export default function Tips() {
    const [tips, setTips] = useState([]);
    const [name, setName] = useState('');
    const [tipsDetails, setTipsDetails] = useState('');

    useEffect(() => {
        getTips();
    }, []);

    const getTips = async () => {
        let res = await getData(GET_TIPS);

        if (res?.data?.isSuccess) {
            setTips(res.data.data);
        } else {
            toast("Something went wrong");
        }
    }

    const addTips = async () => {
        let data = {
            "name": name,
            "tipsDetails": tipsDetails
        }

        let res = await postData(CREATE_TIPS, data);

        if (res?.data?.isSuccess) {
            toast.success("Tip add successfully");
            getTips();
            $('#create-tip-modal').modal('hide');
        } else {
            toast("Something went wrong");
        }
    }

    return (
        <Fragment>
            <div className="tip">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All Tips</h4>
                                <button type="button" className="btn light btn-success" data-toggle="modal" data-target="#create-tip-modal">
                                    <i className="fa fa-plus mr-2"></i> Add Tips
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th><strong>NAME</strong></th>
                                                <th><strong>Date</strong></th>
                                                <th><strong>Details</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tips.length ? (
                                                    tips.map((tip, i) => {
                                                        return (<tr key={i}>
                                                            <td>{tip.name}</td>
                                                            <td>{dateFormat(tip.creatingDate)}</td>
                                                            <td>{tip.tipsDetails}</td>
                                                            <td>
                                                                {/* <div className="d-flex">
                                                                    {
                                                                        !tip.isUnbrandCategory ? <Link to={`/admin/brand/${tip._id}`} 
                                                                        className="btn btn-dark shadow btn-xs sharp mr-1"><i className="fa fa-eye"></i></Link> : ""
                                                                    }
                                                                    <a onClick={() => updateCategoryContent(tip)} className="btn btn-primary shadow btn-xs sharp mr-1">
                                                                        <i className="fa fa-pencil"></i>
                                                                    </a>
                                                                </div> */}
                                                            </td>
                                                        </tr>)
                                                    })
                                                ) : <h3>No Data found</h3>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  

            <div className="modal fade" id="create-tip-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tips Add</h5>
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="form-control"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Details</label>
                                    <input type="text" name="details" onChange={(e) => setTipsDetails(e.target.value)} className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger light" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addTips()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
