import { Dashboard } from "./../../../Pages";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardHeader from './../../../Pages/Dashboard/DashboardHeader/DashboardHeader';
import { connect } from "react-redux";

const ProtectedLayout = (props) => {
  const authenticated = localStorage.getItem('authenticated');
  const account = sessionStorage.getItem('selected_account');
  if (!account || !authenticated) {
      return <Redirect to="/" />
  } else {
    return (
      <>
        <Switch>
          <Route path="/dashboard">
              <DashboardHeader/>
              <Dashboard />
          </Route>        
        </Switch>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(ProtectedLayout);