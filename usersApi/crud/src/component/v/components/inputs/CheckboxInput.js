import React from 'react';
import ValidationAlert from '../ValidationAlert';

const CheckboxInput = ({ name, label, type, value, alert, setInputs }) => {
    return (
        <label htmlFor={name}>
            <input id={name} name={name} type={type} value={value} checked={value || false} onChange={setInputs}/>
            <span>{label}</span>
            <ValidationAlert content={alert} />
        </label>
    )
}

export default CheckboxInput;