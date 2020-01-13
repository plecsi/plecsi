import React from 'react';
import useForm from '../hooks/useForm';
import TextInput from './inputs/TextInput';
import RadioInput from './inputs/RadioInput';
import TextareaInput from './inputs/TextareaInput';
import CheckboxInput from './inputs/CheckboxInput';
import SelectInput from './inputs/SelectInput';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';

function FormPanel({ title, btnName, submitCallback, model, values }) {
  const [inputs, setInputs, setSubmit] = useForm(model, submitCallback);

  const Components = { TextInput, RadioInput, TextareaInput, CheckboxInput, SelectInput, EmailInput, PasswordInput };

  const capitalize = expression => expression.charAt(0).toUpperCase() + expression.slice(1);

  const renderInput = input => {
    const Component = Components[capitalize(input.type) + 'Input'];
    return <Component key={input.name} setInputs={setInputs} {...input} />;
  }

  console.log('title, btnName, submitCallback, model', title, btnName, submitCallback, model, values)

  return (
    <section>
      <h2>{title}</h2>
      <form>
        <div className="row">
        {inputs.map(input => renderInput(input))}
        </div>
        <div className="">
          <input type="submit" onClick={setSubmit} value={btnName} className="btn waves-effect waves-light" />
        </div>
      </form>
    </section>
  )
}

export default FormPanel;