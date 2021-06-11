import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function SwitchLabels(props) {
  const { handleValue, value } = props;

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch color="primary" checked={value.public || false} />}
        label={'Make it public!'}
        onChange={(e) => handleValue(e)}
        name="public"
      />
    </FormGroup>
  );
}
export default SwitchLabels;
