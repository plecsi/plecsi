import {ApiWeather} from '../Types/ApiData'

type Action =
| { type: 'request' }
| { type: 'currentWeather', results: ApiWeather }
| { type: 'forecastWeather', results: ApiWeather }
| { type: 'errors', error: string };

type State = {
state?: ApiWeather;
weather?: ApiWeather
forecast?: ApiWeather;
isLoading: boolean;
error?: string;
}

export default  (state: State, action: Action): State =>{
    switch (action.type) {
        case 'request':
            return { isLoading: true };
        case 'currentWeather':
            return { ...state, isLoading: false, weather: action.results };
        case 'forecastWeather':
            return { ...state, isLoading: false, forecast: action.results };
        case 'errors':
            return { isLoading: false, error: action.error };
    }
  }