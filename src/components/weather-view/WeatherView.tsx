import React from 'react';
import { Card } from 'semantic-ui-react';
import { WeatherIcon } from 'components/weather-icon/WeatherIcon';
import { bemPrefix } from 'lib/bem';

import './WeatherView.css';

export interface WeatherViewProps {
  className?: string;
  temp: string;
  degree: string;
  weatherId: number;
  min: string;
  max: string;
  description: string;
}

const bem = bemPrefix('weather-view');

export const WeatherView: React.FC<WeatherViewProps> = ({
  className = '',
  temp,
  min,
  max,
  degree,
  weatherId,
  description,
  ...props
}) => {
  return (
    <Card.Content className={`${bem()} ${className}`}>
      <Card.Description className={bem('temp')}>
        {temp} {degree}
      </Card.Description>
      <Card.Description className={bem('icon')}>
        <WeatherIcon weatherId={weatherId} />
      </Card.Description>
      <Card.Description className={bem('temp-details')}>
        <span>
          Min: {min} {degree}
        </span>
        <span>
          Max: {max} {degree}
        </span>
      </Card.Description>
      <Card.Description className={bem('description')}>{description}</Card.Description>
    </Card.Content>
  );
};
