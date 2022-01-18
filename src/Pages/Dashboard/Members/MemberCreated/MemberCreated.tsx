import React from 'react';
import './MemberCreated.scss';
import { Link } from 'react-router-dom';

const MemberCreated = () => (
  <div className="MemberCreated" data-testid="MemberCreated">
   <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h2 className="mb-3 fw-bold">MEMBER ADDED SUCCESSFULLY</h2>
                <div className="text-center">
                <Link to="/dashboard/members"><button className="photo_cap_btn" >CLOSE WINDOW</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);

export default MemberCreated;
