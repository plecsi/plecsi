import React, { useState } from 'react';
import axios from 'axios';
import WeatherModel from './WeatherModel';
import FormPanel from '../validation/components/FormPanel';
import submit from '../validation/callback';
import CW from './CurrentWeather';
import FW from './ForecastWeather';
import {Paper,Grid, LinearProgress, AppBar, Container, Snackbar} from '@material-ui/core/';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: blueGrey[500],
    color: theme.palette.text.primary,
  },
  alert:{
      backgroundColor: 'f00',
  },
}));


const WeatherForm = () =>{
    const [currentWeather, setCurrentWeather] = useState();
    const [forecastWeather, setForecastWeather] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const [units, setUnits] = useState();
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const forecastWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const classes = useStyles();
    
    const CurrentWeathers = async (data) =>{
        try {
            let response = await axios({
                url: weatherUrl, 
                params: {
                    q: data.location,
                    units: data.units, 
                    APPID: '65af73c0e25ebe95316462a85691f45f'
                },
                method: 'get',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/json'
                }
            });
    
            setIsLoading(true);
            setUnits(data.units);
            if(response.status === 200){
               // console.log('res', response.data)
                setIsLoading(false)
                setIsError(false)
                setCurrentWeather(response.data)
                Forcast({response: response.data.name, units: data.units});
            } else {
                setIsError({message: response.data.message,error: true});
            }
        } catch(e) {
            console.log('fail:', e);
            setIsError({message: e.toString(),error: true});
        }
    }

    const Forcast = async (data) =>{
        try {
            let response = await axios({
                url: forecastWeatherUrl, 
                params: {
                    q: data.response,
                    units: data.units, 
                    APPID: '65af73c0e25ebe95316462a85691f45f'
                },
                method: 'get',
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/json'
                }
            });
            //console.log('forecast', response.data)
            setIsLoading(true)
            if(response.status === 200){
                setIsLoading(false)
                setForecastWeather(response.data)
                setIsError(false)
            } else {
                setIsError({message: response.data.message,error: true});
            }
        } catch(e) {
            console.log('fail:', e);
            setIsError({message: e.toString(),error: true});
        }
    }
    const submitCallback = e => {
        const result = submit(WeatherModel)
        CurrentWeathers(result); 
    }

    return (
        <>
        <AppBar position="sticky" className={classes.root}>
            <FormPanel btnName='search' icon='fa-search' submitCallback={submitCallback} model={WeatherModel}/>
        </AppBar>
        <Container>
        {isLoading && <LinearProgress variant="query"/>}
        {isError && <Snackbar open={isError.error} autoHideDuration={1000} message={isError.message}/>}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={1}>
                    
                    </Paper>
                </Grid>
                {currentWeather &&
                    <Grid item xs={12}>
                        <CW weather={currentWeather} units={units}/>
                    </Grid>
                }
                {forecastWeather &&
                    <Grid item xs={12}>
                        <FW weather={forecastWeather} units={units}/>
                    </Grid>
                }
            </Grid>
        </Container>
        </>
    )

}

export default WeatherForm;