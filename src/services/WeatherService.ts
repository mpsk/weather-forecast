import { BaseService } from '../core/BaseService';
import { Rest } from './Rest';
import { ItemDescription } from 'semantic-ui-react';

// README: API_KEY should be recived not via hardcoded way
const OPEN_WEATHER = {
  API_HOST: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'e3184bb0b0c1b3bab8e8d16f77414c65'
};

const url = (path: string) => `/data/2.5${path}`;

export interface WeatherDataMain {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherDataWind {
  speed: number;
  deg: number;
}

export interface WeatherDataDesc {
  id: number;
  icon: string;
  main: string;
  description: string;
}

export interface WeatherData {
  main: WeatherDataMain;
  wind: WeatherDataWind;
  weather: WeatherDataDesc[];
}

export interface ForecastData extends Pick<WeatherData, 'weather'> {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
}

const createOpts = (options: Record<string, string | number>) => ({
  APPID: OPEN_WEATHER.API_KEY,
  units: 'metric',
  ...options
});

export class WeatherService extends BaseService {
  static getCityCurrentWeather(city: string, country: string): Promise<WeatherData | void> {
    const uri = url('/weather');
    const data = createOpts({
      q: [city, country].join(',')
    });
    return this.handleRequest<WeatherData>(() => Rest.get(uri, data));
  }

  static getCityForecast(city: string, country: string): Promise<ForecastData[] | void> {
    const uri = url('/forecast/daily');
    const data = createOpts({
      q: [city, country].join(',')
    });
    return this.handleRequest<ForecastData[]>(() =>
      Rest.get(uri, data).then((resp) => resp.list.map((item: ForecastData) => ({ ...item, dt: item.dt * 1000 })))
    );
  }
}
