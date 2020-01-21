import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Paper, Typography, Tooltip, Zoom, List,ListItem, ListItemText } from '@material-ui/core';

import { ApiWeather } from '../Types/ApiData'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  control: {
    padding: theme.spacing(2),
  },
  list: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  temp: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Weather: React.FC<any> = (props:ApiWeather) => {
    const classes = useStyles();
    const weather  = props

    const curTime:any = new Date(weather.dt * 1000).toDateString()
    const sunset:any = new Date(weather.sys.sunset * 1000).toLocaleTimeString()
    const sunrise:any = new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
    const dimension = props.units === "metric" ? "\xB0C" : props.units === "imperial" ? "\xB0F" : "K"
    const day:any =  curTime > curTime-1 ? 0 : 1
    const weatherIcon = (id: number ) => id < 232  ? 'fa-thunderstorm' : 
                              id < 321  ? 'fa-cloud-drizzle' :
                              id < 504  ? 'fa-cloud-rain' : 
                              id === 511  ? 'fa-snowflakes' : 
                              id < 531 ? 'cloud-drizzle fa-cloud-snow': 
                              id < 622 ? 'fa-snowflakes': 
                              id < 781  ? 'fa-fog': 
                              800 === id && day !== 0  ? 'fa-sun' : 
                              800 === id && day !== 1  ?'fa-moon-stars' :
                              801 === id && day !== 0 ? 'fa-cloud-sun' : 
                              801 === id && day !== 1 ? 'fa-cloud-moon' : 
                              802 === id ? 'fa-cloud' : 
                              803 === id ? 'fa-clouds' :
                              804 === id ? 'fa-clouds' : ''
  
    const icon = weatherIcon(weather.weather[0].id)
   
    return (
        <Paper className={classes.control}>

            <Grid container>
                <Grid item xs={12}>
                    <Tooltip title={`lat: ${weather.coord.lat}, lon: ${weather.coord.lon}`} placement="bottom-start" interactive TransitionComponent={Zoom}>
                        <Typography variant="h2">
                            {weather.name}, {weather.sys.country}
                        </Typography>
                    </Tooltip>
                    <Typography variant="subtitle2">
                        {curTime}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className={classes.temp}>
                <Box>
                    <i className={`${icon} fa-4x`}></i>
                </Box>
                <Box>
                    <Typography variant="h3">
                    {parseInt(weather.main.temp)} {dimension}
                    </Typography>
                    <Typography variant="subtitle2">
                        {weather.weather.map(w=>w.description)}
                    </Typography>
                </Box>
                </Grid>
                <Grid item xs={12} md={6} className={classes.box}>
                <Box>
                    <List>
                    <ListItem>
                        <ListItemText primary={sunrise} secondary="sunrise" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={sunset} secondary="sunset" />
                    </ListItem>
                    </List>
                </Box>
                <Box>
                    <List>
                    <ListItem>
                        <ListItemText primary={`${parseInt(weather.main.temp_max)} ${dimension}`} secondary="max" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${parseInt(weather.main.temp_min)} ${dimension}`} secondary="min" />
                    </ListItem>
                    </List>
                </Box>
                <Box>
                    <List>
                    <ListItem>
                        <ListItemText primary={`${weather.main.humidity} %`} secondary="humidity" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`${weather.main.pressure} hPa`} secondary="pressure" />
                    </ListItem>
                    </List>
                </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Weather;