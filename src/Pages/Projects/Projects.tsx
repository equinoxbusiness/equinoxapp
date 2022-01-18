import React, {useState, useEffect} from 'react';
import './Projects.scss';
import StepWizard from "react-step-wizard";
import ProjectStep1 from './ProjectStep1/ProjectStep1';
import ProjectStep2 from './ProjectStep2/ProjectStep2';
import ProjectStep3 from './ProjectStep3/ProjectStep3';
import ProjectStep4 from './ProjectStep4/ProjectStep4';
import ProjectStep5 from './ProjectStep5/ProjectStep5';
import ProjectStep6 from './ProjectStep6/ProjectStep6';
import { connect } from "react-redux";
import { getMe, getProjects} from '../../services/dashboard';

const Projects = (props: any) => {

  const {org} = props;

  const [wallet, setWallet] = useState('');

  useEffect(() => {
    if(props.account && props.account.account){
      setWallet(props.account.account);
    }
  },[props.account]);

  useEffect(() => {
    const account = sessionStorage.getItem('selected_account');
    if (account) {
      getMe(account);
    }
  }, [])

  useEffect(()=>{
    console.log(org)
    if (org && org.project && org.project.length && org.project[0].id) getProjects(org.project[0].id);
  }, [org])

 return(
  <div className="Projects" data-testid="Projects">
      <StepWizard>
        <ProjectStep1 />
        <ProjectStep2 />
        <ProjectStep3 />
        <ProjectStep4 />
        <ProjectStep5 walletInfo={{wallet: wallet}}/>
        <ProjectStep6 />
      </StepWizard>
    </div>
 )
}
const mapStateToProps = (state:any) => {
  return {
    account: state.account,
    org: state.org
  };
};
export default connect(mapStateToProps)(Projects);