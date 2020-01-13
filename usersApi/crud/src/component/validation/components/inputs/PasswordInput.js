import * as React from 'react';
//import ValidationAlert from '../ValidationAlert';
import TextField from '@material-ui/core/TextField';

function EmailInput({ name, label, type, value, alert, setInputs }) {
    return (
        <div className="input-field col s6">
            <TextField id={name} name={name} type={type} label={label} value={value || ""} onChange={setInputs} required  error={alert} helperText={alert}/>
        </div>
    )
}

export default EmailInput;