import React from 'react';
//import ValidationAlert from '../ValidationAlert';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
    },
  }));

function RadioInput({ name, label, type, value, alert,sizes, options, setInputs }) {
    const classes = useStyles();
    return (
     <Grid item xs={sizes.xs} md={sizes.md}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="label">{label}</FormLabel>
          <RadioGroup aria-label={label} name={name} value={value} onChange={setInputs}  >
            {options && options.map(option =>
              <FormControlLabel id={option.name} value={option.value} key={option.value}
                                  control={<Radio size="small"/>} checked={value === option.value} 
                                  label={option.name} error={alert}  />
            )}
          </RadioGroup>
        </FormControl>
    </Grid>
    )
}

export default RadioInput;