import React from 'react';
import { Menu } from 'semantic-ui-react';
import { bemPrefix } from 'lib/bem';
import { connect } from 'stores';
import { SearchCityInputContainer } from 'components/search-city/SearchCityInput';

interface TopMenuProps {}

const bem = bemPrefix('top-menu');

export const TopMenu: React.FC<TopMenuProps> = () => {
  return (
    <Menu className={bem()}>
      <Menu.Item>
        <SearchCityInputContainer />
      </Menu.Item>
    </Menu>
  );
};

export const TopMenuContainer = connect(() => {
  return {};
})(TopMenu);
