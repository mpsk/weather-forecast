import React, { useCallback, useRef, useEffect } from 'react';
import { Card, Loader, Dimmer, Button, Icon } from 'semantic-ui-react';
import { City, CityModel } from 'models/City';
import { connect } from 'stores';
import { bemPrefix } from 'lib/bem';
import { useAsyncEffect } from 'hooks';
import { WeatherInfo } from 'models/City.utils';
import { WeatherIcon } from 'components/weather-icon/WeatherIcon';

import './CityCard.css';
import { WeatherView } from 'components/weather-view/WeatherView';

interface CityCardProps {
  item: City;
  isSelected: boolean;
  currentWeather: WeatherInfo;
  getCurrentWeather: () => Promise<any>;
  onSelectCity: (item: City) => void;
  onRemoveCity: () => void;
}

const bem = bemPrefix('city-card');

export const CityCard: React.FC<CityCardProps> = ({
  item,
  isSelected,
  currentWeather,
  onSelectCity,
  getCurrentWeather,
  onRemoveCity,
  ...props
}) => {
  const cardEl = useRef<HTMLDivElement>(null);
  const { loading } = useAsyncEffect(getCurrentWeather, [item.id]);
  const onClick = useCallback(() => onSelectCity(item), [item.id]);

  useEffect(() => {
    if (isSelected && cardEl.current) {
      cardEl.current.scrollIntoView();
    }
  }, [cardEl.current, isSelected]);

  const color = isSelected ? 'blue' : undefined;

  return (
    <Card className={bem()} onClick={onClick} color={color}>
      <Card.Content>
        <div ref={cardEl} />
        {loading && (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        )}
        <Button icon circular basic size="mini" className={bem('remove')} onClick={onRemoveCity}>
          <Icon name="close" />
        </Button>
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>{item.country}</Card.Meta>
        <WeatherView className={bem('weather')} {...currentWeather} />
      </Card.Content>
    </Card>
  );
};

export const CityCardContainer = connect<CityCardProps, Pick<CityCardProps, 'item'>>(({ city }, { item, ...props }) => {
  const model = city.getModelById(item.id, item);
  return {
    ...props,
    item,
    currentWeather: { ...model.currentWeather },
    isSelected: city.selectedCityId === item.id,
    getCurrentWeather: () => model.getCurrentWeather(),
    getForecast: () => model.getForecast(),
    onRemoveCity: () => city.removeCity(item),
    onSelectCity: () => city.setSelectedCityId(item.id)
  };
})(React.memo(CityCard));
