import React from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'stores';
import { City } from 'models/City';
import { CityCardContainer } from 'components/city-card/CityCard';
import './CityList.css';

export interface CityListProps {
  cities: City[];
}

export const CityList: React.FC<CityListProps> = ({ cities, ...props }) => {
  return (
    <Card.Group className="city-list">
      {cities.map((city, idx) => (
        <CityCardContainer key={`${city.name}_${idx}`} item={city} />
      ))}
    </Card.Group>
  );
};

export const CityListContainer = connect<CityListProps, {}>(({ city }) => ({
  cities: [...city.list]
}))(CityList);
