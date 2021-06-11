import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 4,
  },
}));

export default function SnackBar(props) {
  const classes = useStyles();

  const { message } = props;

  return (
    <div className={classes.root}>
      <Alert className={classes.success} severity="success">
        {message}
      </Alert>
    </div>
  );
}
