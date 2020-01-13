import React from 'react';
import ValidationAlert from '../ValidationAlert';

function TextareaInput({ name, label, type, value, alert, setInputs }) {
    return (
        <div className="input-field col s12">
            <textarea id={name} name={name} value={value || ""} type={type} onChange={setInputs} className={"materialize-textarea" + (alert ? ' red-text' : '')}></textarea>
            <label htmlFor={name}>{label}</label>
            <ValidationAlert content={alert} />
        </div>
    )
}

export default TextareaInput;