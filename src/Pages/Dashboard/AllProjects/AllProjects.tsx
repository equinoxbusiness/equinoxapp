import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import './AllProjects.scss';
import { getOrg, getProjects } from '../../../services/dashboard';
import { Link } from 'react-router-dom';

const AllProjects = (props: any) => {
  const {org, project, auth} = props;
  console.log(project)
  useEffect(()=>{
    if (org && org.project && org.project.length && org.project[0].id) {
      getProjects(org.project[0].id);
    }
  }, [org, auth])
  return (
    <div className="AllProjects" data-testid="AllProjects">
      {project && 
        <div className="container proje_main_content">
        
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-9 text-center">
              <h2 className="fw-bold">{project.project_name}</h2>
              <p className="text-primary font14 fw-bold">{project.project_site}</p>
              <p>{project.project_description}</p>
              <div>
                <div className="manage_social_icon text-center">
                  <a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="https://desktop.telegram.org/" target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                  <a href="https://mail.google.com/mail" target="_blank"><i className="fa fa-envelope-o " aria-hidden="true"></i></a>
                  <a href="https://github.com/" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <div className="assets_card mb-5">
                    <h6 className="font14 fw-bold">Asset: Equinox (EQX)</h6>
                    <p className="font14 mb-1 text-truncate">{project.deployer_wallet_address_id}</p>
                    <div className="row">
                      <div className="col-md-3"></div>
                      <div className="col-md-6 d-flex justify-content-between">
                        <div className="text-nowrap font14 pe-4">Total Supply</div>
                        <div className="text-nowrap font14">{project.fixed_supply}</div>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-md-3"></div>
                      <div className="col-md-6 d-flex justify-content-between">
                        <div className="text-nowrap font14  pe-4">Available</div>
                        <div className="text-nowrap font14">95500000</div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-around assets_action">
                      <div className="text-nowrap font12 fw-bold"><Link to={'/dashboard/assets/createico'} className={org?.ico && org.ico.length ? 'disabled-link' : ''}>CREATE/MANAGE ICO</Link></div>
                      <div className="text-nowrap font12 fw-bold">CREATE IDO</div>
                      <div className="text-nowrap font12 fw-bold">APPROVE/INITIATE REQUESTS</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-body text-center manage_modal">
                  <div className="text-end">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <h2 className="fw-bold">Equinox Business</h2>
                      <p className="text-primary font14 fw-bold">Equinox.business</p>
                      <p>Blockchain powered System Protocols and Applications for enterprises to manage business functions. EQX (BEP-20) is native token of Platform.</p>
                      <div>
                        <div className="manage_social_icon text-center">
                          <a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                          <a href="https://desktop.telegram.org/" target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"></i></a>
                          <a href="https://mail.google.com/mail" target="_blank"><i className="fa fa-envelope-o " aria-hidden="true"></i></a>
                          <a href="https://github.com/" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                          <div className="assets_card mb-5">
                            <h6 className="font14 fw-bold">Asset: Equinox (EQX)</h6>
                            <p className="font14 mb-1 text-truncate">0xe1dba43428cc6ab2672061ee3385af09f1c85781</p>
                            <div className="row">
                              <div className="col-md-3"></div>
                              <div className="col-md-6 d-flex justify-content-between">
                                <div className="text-nowrap font14 pe-4">Total Supply</div>
                                <div className="text-nowrap font14">100000000</div>
                              </div>
                            </div>
                            <div className="row mb-1">
                              <div className="col-md-3"></div>
                              <div className="col-md-6 d-flex justify-content-between">
                                <div className="text-nowrap font14  pe-4">Available</div>
                                <div className="text-nowrap font14">95500000</div>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-around assets_action">
                              <div className="text-nowrap font12 fw-bold"><Link to={'/dashboard/assets/createico'}>CREATE/MANAGE ICO</Link></div>
                              <div className="text-nowrap font12 fw-bold">CREATE IDO</div>
                              <div className="text-nowrap font12 fw-bold">APPROVE/INITIATE REQUESTS</div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    org: state.org,
    project: state.project,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AllProjects);
