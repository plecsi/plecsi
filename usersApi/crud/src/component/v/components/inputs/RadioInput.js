import React from 'react';
import ValidationAlert from '../ValidationAlert';

function RadioInput({ name, label, type, value, alert, options, setInputs }) {
    return (
        <div>
            {options && options.map(option =>
                <label key={option.value}>
                    <input id={option.name} name={name} type={type} value={option.value} checked={value === option.value} onChange={setInputs} className="with-gap" />
                    <span>{option.name}</span>
                </label>)}
            <ValidationAlert content={alert} />
        </div>
    )
}

export default RadioInput;