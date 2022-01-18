import React from 'react';
import './Assets.scss';
import { Router, Route, Switch } from 'react-router-dom';
import CreateICO from './CreateICO/CreateICO';
import AssetsMain from './AssetsMain/AssetsMain';
import CreateReq from './CreateReq/CreateReq';
import history from '../../../routerHistory';

const Assets = () => (
  <div className="Assets cus_tab" data-testid="Assets">

    <Router history={history}>
      <Switch>
        <Route path="/dashboard/assets" exact><AssetsMain/></Route>
        <Route path="/dashboard/assets/createico"><CreateICO /></Route>
        <Route path="/dashboard/assets/createreq"><CreateReq /></Route>
      </Switch>
    </Router>

    
  </div>
);

export default Assets;
