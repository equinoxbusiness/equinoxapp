import React from "react";
import ReactDOM from "react-dom";
//import { Dapp } from "./components/Dapp";
//import GeneralNav from "./components/pages/GeneralNav";
import "./index.css";
import Home from "./components/pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Dex from "./components/pages/Dex";

// This is the entry point of application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/dex">
          <Dex />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
