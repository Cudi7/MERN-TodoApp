import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '700px',
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto',
  },
}));

export default useStyles;
