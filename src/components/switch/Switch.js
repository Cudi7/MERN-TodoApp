import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/auth/authSlice';

function SwitchLabels(props) {
  const { handleValue, value } = props;
  const currentUser = useSelector(selectCurrentUser());

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={!currentUser.user.id ? false : value.public || false}
          />
        }
        label={
          !currentUser.user.id
            ? 'Login to use this function'
            : 'Make it public!'
        }
        onChange={(e) => currentUser.user.id && handleValue(e)}
        name="public"
      />
    </FormGroup>
  );
}
export default SwitchLabels;
