import React, { useState } from 'react';
import axios from 'axios';
import WeatherModel from './WeatherModel';
import FormPanel from '../validation/components/FormPanel';
import submit from '../validation/callback';
import CW from './CurrentWeather';
import FW from './ForecastWeather';

import {Paper,Grid, LinearProgress} from '@material-ui/core/';

const WeatherForm = () =>{
    const [currentWeather, setCurrentWeather] = useState();
    const [forecastWeather, setForecastWeather] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [units, setUnits] = useState();
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const forecastWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    
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
                setCurrentWeather(response.data)
                Forcast({response: response.data.name, units: data.units});
            } else {
                //setIsError({message: response.data.message,error: true});
            }
        } catch(e) {
            console.log('fail:', e);
            //setIsError({message: e,error: true});
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
            console.log('forcast', response.data)
            setIsLoading(true)
            if(response.status === 200){
                setIsLoading(false)
                setForecastWeather(response.data)
            } else {
                //setIsError({message: response.data.message,error: true});
            }
        } catch(e) {
            console.log('fail:', e);
            //setIsError({message: e,error: true});
        }
    }
    const submitCallback = e => {
        const result = submit(WeatherModel)
        console.log('submit', result)
        CurrentWeathers(result); 
    }

    return (
        <Grid container spacing={2}>
             <Grid item xs={12}>
                <Paper elevation={1}>
                    <FormPanel btnName='search' icon='fa-search' submitCallback={submitCallback} model={WeatherModel}/>
                </Paper>
             </Grid>
             {isLoading && <LinearProgress />}
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
    )

}

export default WeatherForm;