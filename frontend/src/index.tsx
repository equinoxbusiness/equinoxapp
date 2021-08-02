import React from 'react';
import ReactDOM from 'react-dom';
//import { Dapp } from './components/Dapp';
import AppBar from './components/appbar/AppBar';
import Launch from './components/views/launch/Launch';
import CssBaseline from '@material-ui/core/CssBaseline';
//import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Projectlauncher from './components/Projectlauncher';
//import './index.css';

// We import bootstrap here, but you can remove if you want
import 'bootstrap/dist/css/bootstrap.css';

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AppBar />
    <Launch />
    <Projectlauncher />
    <Container maxWidth="sm">
      <div className="App"></div>
    </Container>
  </React.StrictMode>,

  document.getElementById('root'),
);
