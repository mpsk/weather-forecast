import React from 'react';
import { observer, inject, IReactComponent } from 'mobx-react';
import { Stores } from 'stores/RootStore';

export type MapStoreToProps<TStateProps, TOwnProps, Stores> = (store: Stores, ownProps: TOwnProps) => TStateProps;

export function connect<InjectedProps, OwnProps = {}>(
  mapStoreToProps: MapStoreToProps<InjectedProps, OwnProps, Stores>
) {
  return (Component: IReactComponent<OwnProps> & { isMobxInjector?: boolean }) => {
    return inject(mapStoreToProps)(observer((props) => <Component {...props} />));
  };
}
