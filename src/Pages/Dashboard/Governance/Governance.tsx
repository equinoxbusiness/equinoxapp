import './Governance.scss';
import StepWizard from "react-step-wizard";
import ProposalStep1 from './ProposalStep1/ProposalStep1';
import ProposalStep3 from './ProposalStep3/ProposalStep3';
import ProposalStep2 from './ProposalStep2/ProposalStep2';
import { connect } from 'react-redux';

const Governance = (props: any) => {

  const { org } = props;

  return (

    <div className="Governance cus_tab" data-testid="Governance">

      <div className="container">
        <div className="mt-5 ">
          <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="gall-tab" data-bs-toggle="tab" data-bs-target="#gall" type="button" role="tab" aria-controls="gall" aria-selected="true">All</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="unpublish-tab" data-bs-toggle="tab" data-bs-target="#unpublish" type="button" role="tab" aria-controls="unpublish" aria-selected="false">Unpublished</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="open-tab" data-bs-toggle="tab" data-bs-target="#open" type="button" role="tab" aria-controls="open" aria-selected="false">Open for Vote</button>
            </li>

            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="false">Pending</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="complete-tab" data-bs-toggle="tab" data-bs-target="#complete" type="button" role="tab" aria-controls="complete" aria-selected="false">Completed</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="failed-tab" data-bs-toggle="tab" data-bs-target="#failed" type="button" role="tab" aria-controls="failed" aria-selected="false">Failed</button>
            </li>
            <li className="nav-item" role="presentation">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="nav-link color_p" id="gcrenew-tab" type="button" role="tab" aria-controls="gcrenew" aria-selected="false" disabled={props.org?.org?.id && props.org?.project && props.org.project[0] ? false : true}>Create New</button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="gall" role="tabpanel" aria-labelledby="gall-tab">
              <div className="row mt-4">
                {org?.proposal && org.proposal.length && org.proposal.map((pro: any)=>{
                  return (
                    <div className="col-sm-6 col-md-4">
                      <div className="g_card mb-4">
                        <div className="row">
                          <div className="col-8">
                            <div className="font14">
                              {pro.description}
                            </div>
                            <div className="color_p font14">Strategic</div>
                          </div>
                          <div className="col-4 text-center status_sec align-self-center">
                            <div>
                              <i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                            <div className="status_label font12">Completed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="tab-pane fade" id="unpublish" role="tabpanel" aria-labelledby="unpublish-tab">fresh</div>
            <div className="tab-pane fade" id="open" role="tabpanel" aria-labelledby="open-tab">at</div>
            <div className="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="pending-tab">
            <div className="table-responsive all_req_table">
                <table>
                  {org?.proposal && org.proposal.length && org.proposal.map((pro: any)=>{
                    return (
                      <tr>
                        <td><span className="color_p text-truncate">{pro.description}</span></td>
                        <td>
                          {<span onClick={()=>{}} className="approve">Approve</span>}
                          {/*pro.finalized && <span onClick={()=>approve(index)} className="approved">Approved</span>*/}
                        </td>
                        <td className="disabled">Disapprove</td>
                        <td className="tdlast">
                          {false && <button className="btn btn-primary finalize-btn" onClick={()=>{}}>Finalize</button>}
                        </td>
                      </tr>
                    )
                  })}
                </table>

              </div>
            </div>
            <div className="tab-pane fade" id="complete" role="tabpanel" aria-labelledby="complete-tab">at</div>
            <div className="tab-pane fade" id="failed" role="tabpanel" aria-labelledby="failed-tab">at</div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModal" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body text-center manage_modal">
              <div className="text-end">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div>
                <StepWizard>
                  <ProposalStep1 />
                  <ProposalStep2 />
                  <ProposalStep3 />
                </StepWizard>
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
    org: state.org
  };
};

export default connect(mapStateToProps)(Governance);
