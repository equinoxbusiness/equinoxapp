import * as React from 'react';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
//import EQXWhitelistbutton from '../EQXWhitelistbutton';
import Walletbutton from '../Walletbutton';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#ffffff' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AppsTwoToneIcon style={{ color: 'black' }} />
          </IconButton>
          <Typography
            variant="h6"
            style={{ color: 'black' }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Equinox App
          </Typography>
          <Walletbutton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
