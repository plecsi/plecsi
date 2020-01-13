import * as React from 'react';
import ValidationAlert from '../ValidationAlert';

function EmailInput({ name, label, type, value, alert, setInputs }) {
    return (
        <div className="input-field col s6">
            <input id={name} name={name} type={type} value={value || ""} onChange={setInputs} className={"validate" + (alert ? 'red-text darken-4' : '')} />
            <label htmlFor={name}>{label}</label>
            <ValidationAlert content={alert} />
        </div>
    )
}

export default EmailInput;