import { flow, observable, set } from 'mobx';
import { values, omit } from 'lodash';
import { BaseModel, withUniqueCid } from 'core/BaseModel';
import { WeatherService, ForecastData, WeatherData } from 'services/WeatherService';
import { getCurrentWeatherInfo, WeatherInfo, getDaysWeatherInfo, ForecastInfo } from './City.utils';

export interface City {
  id: string;
  name: string;
  region: string;
  country: string;
}

const getCityId = (city: Pick<City, Exclude<keyof City, 'id'>>) =>
  values(omit(city, 'id'))
    .join('_')
    .replace(/ /g, '_');

@withUniqueCid()
export class CityModel extends BaseModel<City> {
  static getCityId = getCityId;

  @observable currentWeather: WeatherInfo = {} as WeatherInfo;
  @observable forecartWeather: WeatherInfo[] = [] as WeatherInfo[];

  getForecast = flow(getForecast);
  getCurrentWeather = flow(getCurrentWeather);

  initialize() {
    this.id = this.data.id;
  }

  hasValidData = (): boolean => !!this.data.name && !!this.data.country;
}

function* getCurrentWeather(this: CityModel) {
  if (!this.hasValidData()) {
    return;
  }
  try {
    const data: WeatherData = yield WeatherService.getCityCurrentWeather(this.data.name, this.data.country);
    set(this.currentWeather, getCurrentWeatherInfo(data));
  } catch (e) {
    //
  }
}

function* getForecast(this: CityModel) {
  if (!this.hasValidData()) {
    return;
  }
  try {
    const data: ForecastData[] = yield WeatherService.getCityForecast(this.data.name, this.data.country);
    return data.map(getDaysWeatherInfo) as ForecastInfo[];
  } catch (e) {
    //
  }
}
