import React from 'react';
import { Link } from 'react-router-dom';
import './MembersMain.scss';
import { connect } from "react-redux";

const MembersMain = (props: any) => {
  const {org} = props;
  return (
    <div className="MembersMain" data-testid="MembersMain">
      <div className="container ">
        <div className="proje_main_content">
          <div className="row">
            {org && org.members && org.members.length && org.members.map((member: any)=>{
              return (
                <div className="col-md-4 col-sm-6">
                  <div className="members_card mb-4">
                    <h6>{member.member_name}</h6>
                    <div className="Members_socia_icon text-center">
                      <a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                      <a href="https://desktop.telegram.org/" target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                      <a href="https://mail.google.com/mail" target="_blank"><i className="fa fa-envelope-o " aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-4">
          <div className="proj_action d-flex justify-content-end">
            <div className="mb-2 pe-4">
              <Link to='/dashboard/members/addmembers'><i className="fa fa-plus" aria-hidden="true"></i> ADD MEMBERS</Link>
            </div>
            <div>
            <Link to='/dashboard/members/removemembers'><i className="fa fa-check-circle-o" aria-hidden="true"></i>REMOVE MEMBERS</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    org: state.org
  };
};


export default connect(mapStateToProps)(MembersMain);
