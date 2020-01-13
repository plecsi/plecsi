import React from 'react';
import useForm from '../hooks/useForm';
import TextInput from './inputs/TextInput';
import RadioInput from './inputs/RadioInput';
import TextareaInput from './inputs/TextareaInput';
import CheckboxInput from './inputs/CheckboxInput';
import SelectInput from './inputs/SelectInput';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import HiddenInput from './inputs/HiddenInput';
import Icon from '../../CustomFa/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button , Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form:{
      width: '100%',
      margin: theme.spacing(1),
    },
}));

function FormPanel({ title, btnName, icon, submitCallback, model }) {
  const classes = useStyles();
  const [inputs, setInputs, setSubmit] = useForm(model, submitCallback);

  const Components = { TextInput, RadioInput, TextareaInput, CheckboxInput, SelectInput, EmailInput, PasswordInput, HiddenInput };

  const capitalize = expression => expression.charAt(0).toUpperCase() + expression.slice(1);

  const renderInput = input => {
    const Component = Components[capitalize(input.type) + 'Input'];
    return <Component key={input.name} setInputs={setInputs} {...input} />;
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={setSubmit}>
      <Grid container>{inputs.map(input => renderInput(input))}
        <Grid item xs>
          <Button type='submit' color="primary" startIcon={<Icon icon={icon}/>}>
                {btnName}
          </Button>
        </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default FormPanel;