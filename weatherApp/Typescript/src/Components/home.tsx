import React, {useState, useReducer} from "react";
import axios from 'axios';
import {AppBar, Container, Grid, Button, FormControl, TextField, Select, MenuItem,Input, InputLabel, Snackbar, LinearProgress} from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/core/styles';

import { ApiDatas } from '../Types/ApiData';
import reducer from './reducer'

import Weather from './weather';
import Forecast from './forecast';



const useStyles = makeStyles(theme => ({
    root: {
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: theme.spacing(1),
        backgroundColor: blueGrey[500],
        color: theme.palette.text.primary,
    },
    input:{
        margin: '0 15px',
    },
    select:{
        margin: '0 15px;',
        minWidth: 120,
    },
  }));

 
const WeatherMain: React.FC<any> = () => {
    const [currentCity, setCurrentCity] = useState<ApiDatas>({
        location:'',
        units: ''
    })

    const [{ weather, forecast, isLoading, error }, dispatch] = useReducer(reducer, { isLoading: false });

    const classes = useStyles();
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';


    const getWeather = async (datas: ApiDatas) =>{
        try {
            let response = await axios({
                url: weatherUrl, 
                params: {
                    q: datas.location,
                    units: datas.units, 
                    APPID: '65af73c0e25ebe95316462a85691f45f'
                },
                method: 'get',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/json'
                }
            });
            dispatch({ type: 'currentWeather', results: response.data })
            getForecast(currentCity);
           
        } catch(e) {
            dispatch({ type: 'errors', error: e.toString()})
        }
    }

    const getForecast = async (datas: ApiDatas) => {
        try {
            let response = await axios({
                url: forecastUrl, 
                params: {
                    q: datas.location,
                    units: datas.units, 
                    APPID: '65af73c0e25ebe95316462a85691f45f'
                },
                method: 'get',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/json'
                }
            });
            dispatch({ type: 'forecastWeather', results: response.data })
           
        } catch(e) {
            dispatch({ type: 'errors', error: e.toString()})
        }
    }

    const handleChange = (e: any) => {
        setCurrentCity({...currentCity, [e.target.name]: e.target.value});
    }

    const submitCityForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'request' });
        if (currentCity) {
           getWeather(currentCity);
        }
    }
    return (
        <>
         {error && <Snackbar open={true} autoHideDuration={100} message={error}/>}
         <AppBar className={classes.root} position="sticky">
                <form onSubmit={submitCityForm}>
                    <TextField  label="location" name="location" onChange={handleChange}/>
                    <FormControl className={classes.select}>
                        <InputLabel htmlFor="demo-mutiple-name">Unit</InputLabel>
                        <Select
                        id="demo-mutiple-name"
                        name="units"
                        value={currentCity.units}
                        onChange={handleChange}
                        input={<Input />}
                        >
                        <MenuItem value={'metric'}>Celsius</MenuItem>
                        <MenuItem value={'imperial'}>Farenheit</MenuItem>
                        <MenuItem value={'Kelvin'}>Kelvin</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="outlined"> <i className="fa fa-search"></i>Search</Button>
                </form>
            </AppBar>
            <Container>
                {isLoading &&  <LinearProgress />} 
                {weather && <Grid container spacing={3}>
                                <Grid item xs={12}><Weather {...weather} units={currentCity.units}/></Grid>
                            </Grid> }

                {forecast && <Grid container spacing={3}>
                                <Grid item xs={12}><Forecast {...forecast} units={currentCity.units}/></Grid>
                            </Grid>}
            </Container>
       </>
    )
}

export default WeatherMain;