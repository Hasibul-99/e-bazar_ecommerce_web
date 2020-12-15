import React from "react";

const AlertModal = ({ modalId, heading, message, actionHandler, type }) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className={`modal-header bg-${type}`}>
            <h5 className="modal-title text-white" id="exampleModalLabel">
              {heading}
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="text-left auth-logo-text">
              <p className="mb-4">{message}</p>
            </div>
            <div className="form-group text-right mb-0">
              <button
                type="button"
                className={`btn btn-${type} btn-icon-split`}
                data-dismiss="modal"
                aria-label="Close"
                onClick={actionHandler}
              >
                <span className="icon text-white-50">
                  <i className="fas fa-check"></i>
                </span>
                <span className="text">OK</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AlertModal;
