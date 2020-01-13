import * as React from 'react';

function TextInput({ name, label, type, value, alert, setInputs }) {
    console.log('value', value)
    return (
        <div>
            <input id={name} name={name} type={type} value={value || ""} onChange={setInputs} className={"uk-input" + (alert ? ' uk-form-danger' : '')} />
           
        </div>
    )
}

export default TextInput;