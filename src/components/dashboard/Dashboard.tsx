import React from 'react';
import { City } from 'models/City';
import { connect } from 'stores';
import { CityListContainer } from 'components/city-list/CityList';
import { CityForecastContainer } from 'components/city-forecast/CityForecast';
import './Dashboard.css';

export interface DashboardProps {
  cities: City[];
}

export const Dashboard: React.FC<DashboardProps> = ({ cities, ...props }) => {
  return (
    <div className="dashboard">
      <CityListContainer />
      <CityForecastContainer />
    </div>
  );
};

export const DashboardContainer = connect<DashboardProps, {}>(({ city }) => ({
  cities: [...city.list]
}))(Dashboard);
