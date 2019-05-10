import React, { useEffect, useRef } from 'react';
import { Segment, Dimmer, Loader, Header } from 'semantic-ui-react';
import { bemPrefix } from 'lib/bem';
import { connect } from 'stores';
import { City } from 'models/City';
import { ForecastInfo } from 'models/City.utils';
import { useAsyncFetchEffect } from 'hooks';

import './CityForecast.css';
import { DayWeather } from './DayWeather';

export interface CityForecastProps {
  item: City | undefined;
  selectedCityId: string;
  getForecast: () => Promise<any>;
}

const bem = bemPrefix('city-forecast');

export const CityForecast: React.FC<CityForecastProps> = ({ item, selectedCityId, getForecast, ...props }) => {
  const daysRef = useRef<HTMLDivElement>(null);
  const { loading, data = [] } = useAsyncFetchEffect<ForecastInfo[]>(getForecast, [selectedCityId]);

  useEffect(() => {
    if (daysRef.current) {
      daysRef.current.scrollIntoView();
    }
  }, [daysRef.current, loading]);

  if (!selectedCityId || !item) {
    return null;
  }

  return (
    <Segment className={bem()} color="blue">
      <Header>{item.name}</Header>
      {loading ? (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      ) : (
        <div className={bem('forecast-days')} ref={daysRef}>
          {data.map((day, idx) => (
            <Segment key={`${day.date}_${idx}`} className={bem('day-item')}>
              <DayWeather day={day} />
            </Segment>
          ))}
        </div>
      )}
    </Segment>
  );
};

export const CityForecastContainer = connect<CityForecastProps, {}>(({ city }) => {
  const model = city.getModelById(city.selectedCityId);
  return {
    selectedCityId: city.selectedCityId,
    item: model ? model.toJSON() : undefined,
    getForecast: () => model.getForecast()
  };
})(CityForecast);
