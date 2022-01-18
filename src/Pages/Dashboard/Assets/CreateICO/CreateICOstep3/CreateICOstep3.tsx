import React from 'react';
import './CreateICOstep3.scss';
import { Link } from 'react-router-dom';

const CreateICOstep3 = () => (
  <div className="CreateICOstep3" data-testid="CreateICOstep3">
   <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h2 className="mb-3 fw-bold">ICO CREATED</h2>
                <div className="text-center">
                <Link to="/dashboard/assets"><button className="photo_cap_btn" >Review Now</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);

export default CreateICOstep3;
