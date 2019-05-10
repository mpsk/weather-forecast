import { WeatherData, ForecastData } from 'services/WeatherService';

const getTemp = (temp: number) => temp.toFixed(1);

export interface WeatherInfo {
  temp: string;
  min: string;
  max: string;
  degree: string;
  description: string;
  weatherId: number;
}

export interface ForecastInfo extends WeatherInfo {
  date: string;
}

export function getCurrentWeatherInfo({ main, wind, weather }: WeatherData): WeatherInfo {
  const data = {
    temp: `${getTemp(main.temp)}`,
    min: `${getTemp(main.temp_min)}`,
    max: `${getTemp(main.temp_max)}`,
    degree: '°C',
    description: weather.map((item) => item.main).join(', '),
    icon: weather[0].icon,
    weatherId: weather[0].id
  };

  return data;
}

export function getDaysWeatherInfo({ dt, temp, weather }: ForecastData): ForecastInfo {
  const data = {
    date: new Date(dt).toDateString(),
    temp: `${getTemp(temp.day)}`,
    min: `${getTemp(temp.min)}`,
    max: `${getTemp(temp.max)}`,
    degree: '°C',
    description: weather.map((item) => item.main).join(', '),
    icon: weather[0].icon,
    weatherId: weather[0].id
  };

  return data;
}
