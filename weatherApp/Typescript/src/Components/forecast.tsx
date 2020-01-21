import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Typography, Hidden, List,ListItem, ListItemText } from '@material-ui/core';
import { ApiWeather } from '../Types/ApiData'

const useStyles = makeStyles(theme => ({
    control: {
        padding: theme.spacing(2),
      },
      temp: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      box: {
        display: 'flex',
        width : '100%',
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
      },
      list:{
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            display: 'flex',
            flexFlow: 'row'
          },
      },
      listItem: {
          textAlign: 'center',
        justifyContent: 'center',
      },
}));

const Forecast: React.FC<any> = (props:ApiWeather) => {
    const classes = useStyles();
    const dimension = props.units === "metric" ? "\xB0C" : props.units === "imperial" ? "\xB0F" : "K" 

    const propsArray:any = props.list.map(l=>(
        new Date(l.dt*1000).toLocaleDateString() !== new Date(Date.now()).toLocaleDateString() && 
        {
            days: new Date(l.dt*1000).toDateString(),
            dayName: new Date(l.dt*1000).toString().split(' ')[0],
            days_txt: l.dt_txt, 
            temp: l.main.temp,
            min_temp: l.main.temp_min,
            max_temp: l.main.temp_max,
            feels_like: l.main.feels_like,
            humidity:l.main.humidity,
            wind: l.wind.speed,
            clouds: l.weather[0].id,
            description: l.weather[0].description
        }
        )
    )
    const func = (arr:any, size:any) =>{
            const results:object[] = arr.reduce((acc:any, curr:any, i:number) => {
                if ( !(i % size)  ) { 
                    //short array groupby days
                    const shortArray:any[] = arr.slice(i, i + size);
               
                        const avarge = (array:any) =>
                           Array.from(array.reduce((acc:any, obj:any, index:any, self:any) => 
                                Object.keys(obj).reduce( (acc:any, key:any):any => 
                                    typeof obj[key] == "number" ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                                    : acc,
                            acc),
                                new Map())).reduce((acc:any, [name,values]:any):any =>
                                    Object.assign(acc, {day: array[0].dayName}, { [name]: Math.round(values.reduce( (a:any,b:any) => a+b ) / values.length) }),{}
                                    );
                        const avgObject:any = avarge(shortArray)
                        const weatherIcon = (id:number) => id < 232  ? 'fa-thunderstorm' : 
                                            id < 321  ? 'fa-cloud-drizzle' :
                                            id < 504  ? 'fa-cloud-rain' : 
                                            id === 511  ? 'fa-snowflakes' : 
                                            id < 531 ? 'cloud-drizzle fa-cloud-snow': 
                                            id < 622 ? 'fa-snowflakes': 
                                            id < 781  ? 'fa-fog': 
                                            800 === id ? 'fa-sun' : 
                                            801 === id ? 'fa-cloud-sun' : 
                                            802 === id ? 'fa-cloud' : 
                                            803 === id ? 'fa-clouds' :
                                            804 === id ? 'fa-clouds' : ''

                    const icon = weatherIcon(avgObject.clouds)
                    Object.assign(avgObject, {icon: icon})
                    acc.push(avgObject); 
                }
                return acc;
            }, [])
            return results
        }
    const avgResult:object[] = func(propsArray.filter(Boolean), 8)

    return (
        <>
        <Typography variant="subtitle1">Next {avgResult.length} day weather forecast</Typography>
        <Paper className={classes.control}>
            <Grid container>
                <Grid item xs={12} className={classes.temp}>
                    {avgResult.map((f:any)=>(
                        <Box className={classes.box} key={f.day} m={1}>
                            <List className={classes.list}>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={f.day}/>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <i className={`${f.icon} fa-2x`}></i>
                                </ListItem>
                                <Hidden mdUp>
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary={`${f.min_temp} - ${f.max_temp} ${dimension}`}  />
                                    </ListItem>
                                </Hidden>
                            </List>
                            <Hidden smDown>
                            <List className={classes.list}>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={`${f.min_temp} ${dimension}`} secondary="low"/>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                <ListItemText primary={`${f.max_temp} ${dimension}`} secondary="high"/>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                <ListItemText primary={`${f.feels_like} ${dimension}`} secondary="feels like"/>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={`${f.wind} m/s`} secondary="wind"/>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={`${f.humidity} %`} secondary="humidity"/>
                                </ListItem>
                            </List>
                            </Hidden>
                        </Box>
                    ))}
                </Grid>
            </Grid> 
        </Paper>
        </>
    )
}

export default Forecast;