import React from 'react';
import ValidationAlert from '../ValidationAlert';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CheckboxInput = ({ name, label,labelEnd, type, dataType, value, defValue, alert, setInputs }) => {
    console.log('check', value)
    return (
<>
{dataType === "switch"  ? 
<Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>{label}</Grid>
          <Grid item>
            <Switch
              name={name}
              checked={value || false}
              onChange={setInputs}
            />
          </Grid>
          <Grid item>{labelEnd}</Grid>
        </Grid>
      </Typography>
 : 
        <FormGroup row>
            <FormControlLabel
                control={
                <Checkbox id={name} name={name} type={type} checked={value || false} onChange={setInputs} value={value} />
                }
                label={label}
            />
      </FormGroup>
}
        <label htmlFor={name}>
            <input id={name} name={name} type={type} value={value} checked={value || false} onChange={setInputs}/>
            <span>{label}</span>
            <ValidationAlert content={alert} />
        </label>
        </>
    )
}

export default CheckboxInput;