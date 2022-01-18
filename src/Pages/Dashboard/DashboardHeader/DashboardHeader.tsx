import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DashboardHeader.scss';
import companyLogo from '../../../assets/images/logo.png';

const DashboardHeader: React.FC<any> = () => {
  const location = useLocation();
  return (
    <div className="DashboardHeader" data-testid="DashboardHeader">
      <div className="container-fluid d-flex justify-content-between">
        <nav className="navbar navbar-expand-lg navbar-light dashboard_cus_nav_bar">
          <button className="navbar-toggler nv_btn" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon"></span> */}
            <i className="fa fa-align-left"></i>
          </button>
          <a className="navbar-brand" href="#"><img src={companyLogo} alt="logo" className="logo" /></a>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav">
              <li className="d-inline d-lg-none text-end">
                <button data-bs-toggle="collapse" data-bs-target="#nav" className="close ">&times;</button>
              </li>
              <li className="nav-item">
                <Link className={location.pathname === '/dashboard' ? "nav-link text-truncate active" : "nav-link text-truncate"} to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname.includes('project') ? "nav-link text-truncate active" : "nav-link text-truncate"} to="/dashboard/allprojects">All Projects</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname.includes('member') ? "nav-link text-truncate active" : "nav-link text-truncate"} to="/dashboard/members">Members</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname.includes('asset') ? "nav-link text-truncate active" : "nav-link text-truncate"} to="/dashboard/assets">Assets</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname.includes('governance') ? "nav-link text-truncate active" : "nav-link text-truncate"} to="/dashboard/governance">Governance</Link>
              </li>
              <li className="nav-item">
                <Link className={location.pathname.includes('help') ? "nav-link text-truncate active" : "nav-link text-truncate"} to="/dashboard/help">Help</Link>
              </li>
            </ul>
            <div>
            </div>
          </div>
        </nav>
        <div className="d-flex">
          <div className="text-end align-self-center">
            <b className="font14">Ashish Vyas</b><br />
            <span className="Profile_role font14">Chief Executive Officer</span>
          </div>
          <div className="align-self-center">
            <div className="dropdown Profile_dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-user" aria-hidden="true"></i>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DashboardHeader;
