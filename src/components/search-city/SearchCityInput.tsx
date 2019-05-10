import React from 'react';
import { Search, SearchProps, Icon, Button } from 'semantic-ui-react';
import { debounce, values, omit } from 'lodash';
import { connect } from 'stores';
import { GeoService } from 'services/GeoService';
import { City } from 'models/City';
import { bemPrefix } from 'lib/bem';

import './SearchCityInput.css';

interface SearchCityInputProps {
  addCity(item: City): void;
}

interface SearchCityInputState {
  isLoading: boolean;
  query: string;
  list: City[];
}

const cityToResultItem = (item: City) => ({
  title: values(omit(item, 'id')).join(', '),
  city: item
});

const initialState = {
  isLoading: false,
  query: '',
  list: []
};

const bem = bemPrefix('search-city');

export class SearchCityInput extends React.PureComponent<SearchCityInputProps, SearchCityInputState> {
  state = { ...initialState };

  searchCity = debounce(qeuryCityList.bind(this), 300);

  onSearchChange = (e: any, { value = '' }: SearchProps) => {
    this.setState({ query: value }, () => this.searchCity(value));
  };
  onSelectCity = (e: any, { result }: SearchProps) => {
    this.setState({ ...initialState });
    this.props.addCity(result.city);
  };

  onClearQuery = () => this.setState({ query: '' });

  render() {
    const { isLoading, list, query } = this.state;

    return (
      <div className={bem()}>
        <Search
          className={bem('input')}
          minCharacters={3}
          input={{ icon: 'search', iconPosition: 'left', placeholder: 'City Name' }}
          loading={isLoading}
          value={query}
          results={list.map(cityToResultItem)}
          onSearchChange={this.onSearchChange}
          onResultSelect={this.onSelectCity}
        />
        <Button circular basic icon className={bem('clear')} onClick={this.onClearQuery}>
          <Icon name="remove" />
        </Button>
      </div>
    );
  }
}

export const SearchCityInputContainer = connect<SearchCityInputProps, {}>(({ city }) => ({
  addCity: (item) => {
    city.addCity(item);
  }
}))(SearchCityInput);

async function qeuryCityList(this: SearchCityInput, query: string) {
  this.setState({ isLoading: true });
  const list: City[] | void = await GeoService.searchCity(query);
  if (list) {
    this.setState({ list, isLoading: false });
  }
}
