import React, { useEffect } from 'react';
import './ProjectStep6.scss';
import { Link } from 'react-router-dom';
import { getOrg } from '../../../services/dashboard';
import { connect } from 'react-redux';

const ProjectStep6 = (props: any) => {
  const {auth} = props;
  useEffect(()=>{
    if (auth && auth.org_id) getOrg(auth.org_id);
  }, [auth])
  return (
    <div className="ProjectStep6" data-testid="ProjectStep6">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>PROJECT LAUNCHER</p>
                <h2 className="mb-3">PROJECT DEPLOYED !</h2>
                <div className="text-center">
                  <Link to={'/dashboard/allprojects'}><button className="photo_cap_btn">MANAGE NOW !</button></Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ProjectStep6);
