import React from 'react';
import { Header } from 'semantic-ui-react';
import { WeatherView } from 'components/weather-view/WeatherView';
import { bemPrefix } from 'lib/bem';
import { ForecastInfo } from 'models/City.utils';

export interface DayWeatherProps {
  className?: string;
  day: ForecastInfo;
}

const bem = bemPrefix('day-weather');

export const DayWeather: React.FC<DayWeatherProps> = ({ day, className = '', ...props }) => {
  const { temp, date } = day;
  return (
    <div className={`${bem()} ${className}`}>
      <Header>
        <Header.Subheader>{date}</Header.Subheader>
      </Header>
      <WeatherView temp={temp} {...day} />
    </div>
  );
};
