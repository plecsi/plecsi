import * as React from 'react';
//import ValidationAlert from '../ValidationAlert';
import {Grid, TextField} from '@material-ui/core';

function TextInput({ name, label, type, required, value,sizes, alert, setInputs }) {
    return (
        <Grid item xs={sizes.xs} md={sizes.md}>
            <TextField id={name} name={name} type={type} fullWidth
                        label={label} value={value || ""} onChange={setInputs} 
                        required={required} error={alert}  helperText={alert}/>
        </Grid>
    )
}

export default TextInput;