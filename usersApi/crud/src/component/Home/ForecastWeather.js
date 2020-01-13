import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Box, Typography, Hidden, List,ListItem, ListItemText } from '@material-ui/core';


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

const Forecast = props => {
    //const [s, setS] = useState([props]);
    const classes = useStyles();
    const dimension = props.units === "metric" ? "\xB0C" : props.units === "imperial" ? "\xB0F" : "K" 
    const propsArray = props.weather.list.map(l=>(
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
    
    const func = (arr, size) =>{
        const res = arr.reduce((acc, curr, i) => {
            if ( !(i % size)  ) { 
                //short array groupby days
                const a = arr.slice(i, i + size)
                //average datas
                var avg = Array.from(a.reduce(
                    (acc, obj) => Object.keys(obj).reduce( 
                        (acc, key) => typeof obj[key] == "number"
                            ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
                            : acc,
                    acc),
                new Map())).reduce( 
                    (acc, [name, values]) => 
                        Object.assign(acc, {day: a[0].dayName}, { [name]: parseInt(values.reduce( (a,b) => a+b ) / values.length) }),{}
                    );

                    const weatherIcon = id => id < 232  ? 'fa-thunderstorm' : 
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

                const icon = weatherIcon(avg.clouds)
                Object.assign(avg, {icon: icon})
                acc.push(avg); 
            }                  
                 
            return acc;
            }, []);
            return res
    }

    const res= func(propsArray.filter(Boolean), 8)   

    console.log('results: ', res)

    return (
        <>
        <Typography variant="subtitle1">Next {res.length} day weather forecast</Typography>
        <Paper className={classes.control}>
            <Grid container>
                <Grid item xs={12} className={classes.temp}>
                    {res.map(f=>(
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