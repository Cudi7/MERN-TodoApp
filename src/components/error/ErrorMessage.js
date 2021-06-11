import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ErrorMessage(props) {
  const classes = useStyles();
  const { message, type } = props;

  return (
    <div className={classes.root}>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
}
