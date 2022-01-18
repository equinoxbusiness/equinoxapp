import React, { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../../../routerHistory';
import { getOrg } from '../../../services/dashboard';
import AddMembers from './AddMembers/AddMembers';
import MemberCreated from './MemberCreated/MemberCreated';
import './Members.scss';
import MembersMain from './MembersMain/MembersMain';
import RemoveMembers from './RemoveMembers/RemoveMembers';
import { connect } from 'react-redux';

const Members = (props:any) => {
  const {auth} = props;
  useEffect(()=>{
    if (auth && auth.org_id) getOrg(auth.org_id);
  }, [auth])
  return (
    <div className="Members" data-testid="Members">
      <Router history={history}>
        <Switch>
          <Route path="/dashboard/members" exact><MembersMain/></Route>
          <Route path="/dashboard/members/addmembers"><AddMembers /></Route>
          <Route path="/dashboard/members/removemembers"><RemoveMembers /></Route>
          <Route path="/dashboard/members/membercreated"><MemberCreated /></Route>
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

export default connect(mapStateToProps)(Members);
