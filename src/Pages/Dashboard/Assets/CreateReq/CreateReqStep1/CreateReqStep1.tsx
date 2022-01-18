import React from 'react';
import './CreateReqStep1.scss';

const CreateReqStep1 = (props:any) => (
  <div className="CreateReqStep1" data-testid="CreateReqStep1">
   <div className="container">
      <div className="inner_card ">
        <div className="w-100">
          <div className="row mb-4">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <h2 className="fw-bolder">Create Request</h2>
              <p className="font14 fw-bold color_s">
              Creating request will initiate an instance for sending crypto assets to receiver wallet. It must be approved by all members within 7 days of initiation for successful transaction.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div>
                <div className="my_input">
                  <div className="text-start">
                    <label>Receiver Wallet</label>
                  </div>
                  <input type="text" value="Equinox Business" />
                </div>
                <div className="my_input">
                  <div className="text-start">
                    <label>Asset</label>
                  </div>
                  <input type="text" />
                </div>
                <div className="my_input">
                  <div className="text-start">
                    <label>Quantity</label>
                  </div>
                  <input type="number" />
                </div>
                <div className="text-end mb-4">
                  <button className="next_btn" onClick={props.nextStep}>INITIATE <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CreateReqStep1;
