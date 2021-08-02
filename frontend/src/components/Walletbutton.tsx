import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 1px 3px 1px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
};

function UnstyledComponent(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return (
    <Button
      className={classes.root}
      onClick={() => {
        alert('Wallet is currently disabled');
      }}
    >
      Connect Wallet
    </Button>
  );
}

export default withStyles(styles)(UnstyledComponent);
