import React from 'react';
import useForm from '../hooks/useForm';
import TextInput from './inputs/TextInput';
import RadioInput from './inputs/RadioInput';
import Icon from '../../CustomFa/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button , Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    form:{
      width: '100%',
    },
}));

function FormPanel({ title, btnName, icon, submitCallback, model }) {
  const classes = useStyles();
  const [inputs, setInputs, setSubmit] = useForm(model, submitCallback);

  const Components = { TextInput, RadioInput };

  const capitalize = expression => expression.charAt(0).toUpperCase() + expression.slice(1);

  const renderInput = input => {
    const Component = Components[capitalize(input.type) + 'Input'];
    return <Component key={input.name} setInputs={setInputs} {...input} />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={setSubmit}>
      <Grid container>{inputs.map(input => renderInput(input))}
        <Grid item xs>
          <Button type='submit' variant="outlined" startIcon={<Icon icon={icon}/>}>
                {btnName}
          </Button>
        </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default FormPanel;