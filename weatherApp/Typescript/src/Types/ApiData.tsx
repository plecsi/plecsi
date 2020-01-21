export interface  Datas {
    location: string;
    units: string;
}

export type ApiDatas = Datas;


export interface Main {
    temp: string;
    feels_like:number;
    pressure: number;
    humidity: number;
    temp_min: string;
    temp_max: string;
}

export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface Coord {
    lon: any;
    lat: any;
}

interface w{
    id: number;
    description: string
}

interface wind{
    speed:number
}

interface forecast{
    dt:number;
    dt_txt:string
    main:Main;
    wind:wind;
    weather:w[]
}

export interface Weather {
    base: string;
    coord: Coord;
    dt: number;
    sys: Sys;
    main: Main;
    name: string;
    weather:w[];
    list:forecast[];
    units:string;
}


 export type ApiWeather = Weather;