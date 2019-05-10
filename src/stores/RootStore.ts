import { configure } from 'mobx';
import { History } from 'history';
import { RouterStore } from 'stores/RouterStore';
import { CityStore } from 'stores/CityStore';

configure({
  enforceActions: 'observed'
});

let instance: RootStore | null = null;

export interface Stores {
  city: CityStore;
  router: RouterStore;
}

const initStores = (): { stores: Stores; history: History } => {
  if (RootStore.getInstance().stores) {
    throw new Error('Stores already has been initiated');
  }

  const stores = {
    city: new CityStore(),
    router: new RouterStore()
  };

  RootStore.getInstance().stores = stores;

  const history = RouterStore.initHistory(stores.router);

  return { stores, history };
};

export class RootStore {
  static getInstance = getInstance;
  static initStores = initStores;

  stores: Stores;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
  }

  getStores(): Stores {
    return this.stores;
  }
}

function getInstance() {
  if (!instance) {
    instance = new RootStore();
  }
  return instance;
}
