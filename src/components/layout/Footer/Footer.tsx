import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className="Footer" data-testid="Footer">
    <div className="container">
      <div className="row">
        <div className="col-md-6 align-self-center">
          <p className="mb-0 copyright_content">COPYRIGHT @ 2021 EQUINOX BUSINESS</p>
        </div>
        <div className="col-md-6">
          <div className="footer_social_icon">
            <a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="https://desktop.telegram.org/" target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
            <a href="https://mail.google.com/mail" target="_blank"><i className="fa fa-envelope-o " aria-hidden="true"></i></a>
            <a href="https://github.com/" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
