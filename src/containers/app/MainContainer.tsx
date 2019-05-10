import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { TopMenuContainer } from 'components/top-menu/TopMenu';
import { Dashboard } from 'components/dashboard/Dashboard';

export const MainContainer = () => {
  return (
    <div className="MainContainer">
      <TopMenuContainer />
      <div className="MainContainer__content">
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
};
