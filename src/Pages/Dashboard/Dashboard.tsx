import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AllProjects from './AllProjects/AllProjects';
import Assets from './Assets/Assets';
import './Dashboard.scss';
import DashboardHome from './DashboardHome/DashboardHome';
import Governance from './Governance/Governance';
import Help from './Help/Help';
import Members from './Members/Members';
import Projects from './../Projects/Projects';
import history from "./../../routerHistory";
import { getOrg } from '../../services/dashboard';
import { connect } from 'react-redux';

const Dashboard = (props: any) => {
  const {auth} = props;
  useEffect(()=>{
    if (auth && auth.org_id) getOrg(auth.org_id);
  }, [auth])
  return (
    <div className="Dashboard" data-testid="Dashboard">
      <Router history={history}>
        <Switch>
          <Route path="/dashboard/allprojects"><AllProjects /></Route>
          <Route path="/dashboard/members"><Members /></Route>
          <Route path="/dashboard/assets"><Assets /></Route>
          <Route path="/dashboard/governance"><Governance /></Route>
          <Route path="/dashboard/help"><Help /></Route>
          <Route path="/dashboard/project/new"><Projects /></Route>
          <Route path="" exact><DashboardHome /></Route>
        </Switch>
      </Router>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
