import React from 'react';
import './CreateReqStep2.scss';

const CreateReqStep2 = () => (
  <div className="CreateReqStep2" data-testid="CreateReqStep2">
    <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h2 className="mb-3 fw-bold">REQUEST INITIATED</h2>
                <div className="text-center">
                <button className="photo_cap_btn" >CLOSE WINDOW</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);

export default CreateReqStep2;
