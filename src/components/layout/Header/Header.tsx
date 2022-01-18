import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import companyLogo from '../../../assets/images/logo.png';
import AccountModal from './AccountModal/Accountmodal';
const Header = () => (
  <div className="Header " data-testid="Header">

    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light cus_nav_bar">
        <div>
          <button className="navbar-toggler nv_btn" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon"></span> */}
            <i className="fa fa-align-left"></i>
          </button>
          <a className="navbar-brand" href="#"><img src={companyLogo} alt="logo" className="logo" /></a>
        </div>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav m-0 ml-lg-auto p-3 p-lg-0">
            <li className="d-inline d-lg-none text-end">
              <button data-bs-toggle="collapse" data-bs-target="#nav" className="close float-right">&times;</button>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-truncate" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-truncate" to="/edex">eDEX</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-truncate" to="/org">ORG 3.0</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-truncate" to="/docs">DOCS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-truncate" to="/about">ABOUT</Link>
            </li>




          </ul>
          <div>

          </div>

        </div>
        <AccountModal />
      </nav>

    </div>

    {/* <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/org">ORG</Link>
      </li>
      <li>
        <Link to="/docs">DOCS</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul> */}
  </div>
);

export default Header;
