import "./assets/css/App.css";
import { Switch, Route } from "react-router-dom";
import { Router } from "react-router";
import history from "./routerHistory";
import ProtectedLayout from './components/layout/ProtectedLayout/ProtectedLayout';
import PublicLayout from "./components/layout/PublicLayout/PublicLayout";
import {useEffect} from 'react';
import { getMe } from "./services/dashboard";
import { connect } from 'react-redux';

function App(props) {
  
  useEffect(()=> {
    const account = sessionStorage.getItem('selected_account');
    if (account) {
        getMe(account);
    }
  }, [props.account?.account]);

  return (
    <Router history={history}>
      <Switch>
        <Route path='/dashboard' component={ProtectedLayout} />
        <Route path='/' component={PublicLayout} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(App);
