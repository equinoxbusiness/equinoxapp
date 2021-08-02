import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Dappaccordion from '../../Dappaccordion';
import Login from '../../registration/Login';
//import Formmain from '../../registration/Formmain';
//import Stepper from '../../Stepper';
//import Projectlauncher from './components/Projectlauncher';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function launch() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box paddingTop={20} paddingBottom={1} sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <Item>
                <Login />
              </Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>Leaderboard link</Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item>
                <Dappaccordion />
              </Item>
            </Grid>
            <Grid item xs={12} md={6}>
              <Item>
                <Dappaccordion />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
