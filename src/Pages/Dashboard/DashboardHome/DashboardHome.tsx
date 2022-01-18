import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardHome.scss';
import { connect } from 'react-redux';

const DashboardHome: React.FC<any> = (props: any) => {
  const { org } = props;
  const now = 60;
  return (
    <div className="DashboardHome container-fluid" data-testid="DashboardHome">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-8 dashboard_content">
          <div className="row mt-5 mb-5">
            <div className="col-md-5 ">
              <h2>Projects</h2>
              <p className="font14">Projects literally are Business projects governed through voting by governance token holders created for the project.</p>
              <div className="proj_action">
                <div className="mb-2">
                  <Link to='/dashboard/project/new' className={org?.project && org.project.length ? 'disabled-link' : ''}><i className="fa fa-plus" aria-hidden="true"></i> LAUNCH PROJECT</Link>
                </div>
                <div>
                  <Link to='/dashboard/allprojects'><i className="fa fa-check-circle-o" aria-hidden="true"></i>EXISTING PROJECTS</Link>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="table-responsive">
            <table>
              <tr>
                <th >RECENT TASKS</th>
                <th>CREATED</th>
                <th>PROJECT</th>
                <th className="w-25">VOTING</th>
                <th>DUE DATE</th>
                <th className="w-25">PROGRESS</th>
              </tr>
              <tr>
                <td className="tdfirst"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslhFeQYdudYD0GSS5LeVaQ3zEGoPbvRbdfv84j24uOnXXLXcyWiSWiRq2Ij0vCDWQkCI&usqp=CAU" />Quarterly Business Plan</td>
                <td>Thu, 26 Oct</td>
                <td>Bitcoin</td>
                <td>
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
                <td>Thu, 26 Oct</td>
                <td className="tdlast">
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
              </tr>
              <tr>
                <td className="tdfirst"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslhFeQYdudYD0GSS5LeVaQ3zEGoPbvRbdfv84j24uOnXXLXcyWiSWiRq2Ij0vCDWQkCI&usqp=CAU" />Quarterly Business Plan</td>
                <td>Thu, 26 Oct</td>
                <td>Bitcoin</td>
                <td>
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
                <td>Thu, 26 Oct</td>
                <td className="tdlast">
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
              </tr>
              <tr>
                <td className="tdfirst"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslhFeQYdudYD0GSS5LeVaQ3zEGoPbvRbdfv84j24uOnXXLXcyWiSWiRq2Ij0vCDWQkCI&usqp=CAU" />Quarterly Business Plan</td>
                <td>Thu, 26 Oct</td>
                <td>Bitcoin</td>
                <td>
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
                <td>Thu, 26 Oct</td>
                <td className="tdlast">
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
              </tr>
              <tr>
                <td className="tdfirst"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslhFeQYdudYD0GSS5LeVaQ3zEGoPbvRbdfv84j24uOnXXLXcyWiSWiRq2Ij0vCDWQkCI&usqp=CAU" />Quarterly Business Plan</td>
                <td>Thu, 26 Oct</td>
                <td>Bitcoin</td>
                <td>
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
                <td>Thu, 26 Oct</td>
                <td className="tdlast">
                  <ProgressBar now={now} label={`${now}%`} />
                </td>
              </tr>
            </table>

          </div>*/}
        </div>
        <div className="col-md-3">
          {/* hello */}
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


export default connect(mapStateToProps)(DashboardHome);
