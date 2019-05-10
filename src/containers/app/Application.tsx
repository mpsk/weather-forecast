import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Route } from 'react-router-dom';
import { RootStore } from 'stores';
import { isDevMode } from 'lib/envs';
import { MainContainer } from './MainContainer';

import 'semantic-ui-css/semantic.min.css';

const { stores, history } = RootStore.initStores();

if (isDevMode) {
  Object.assign(window, { stores });
}

export const Application: React.FC<{}> = () => {
  return (
    <div className="app-root">
      <Provider {...stores}>
        <Router history={history}>
          <div className="Application">
            <Route component={MainContainer} />
          </div>
        </Router>
      </Provider>
    </div>
  );
};
