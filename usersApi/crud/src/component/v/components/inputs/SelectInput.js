import React from 'react';
import ValidationAlert from '../ValidationAlert';

function SelectInput({ name, label, type, value, alert, options, setInputs }) {
    return (
        <div className="input-field col s12 m6">
            
            <select id={name} name={name} type={type} value={value} onChange={setInputs} className={"icons" + (alert ? ' red-text' : '')}>
                {options && options.map(option => <option key={option.value} value={option.value} data-icon="">{option.name}</option>)}
            </select>
            <label htmlFor={name}>{label}</label>
            <ValidationAlert content={alert} />
        </div>
    )
}

export default SelectInput;