import { observable, flow, IObservableArray, action, set, reaction } from 'mobx';
import { find } from 'lodash';
import { City, CityModel } from 'models/City';
import { LocalStorage } from 'services/LocalStorage';

const CITIES_KEY = 'cities';
const getInitialCities = () => LocalStorage.getValue<City[]>(CITIES_KEY) || [];

export class CityStore {
  private _modelsMap = new Map<string, CityModel>();

  list: IObservableArray<City> = observable(getInitialCities());
  @observable selectedCityId: string = '';

  constructor() {
    reaction(() => [...this.list], (cities) => LocalStorage.saveValue(CITIES_KEY, cities));
  }

  @action addCity(item: City) {
    if (!find(this.list, item)) {
      this.list.push(item);
    }
  }

  @action removeCity(item: City) {
    this.list.remove(item);
  }

  @action setSelectedCityId(cityId: string) {
    this.selectedCityId = cityId;
  }

  getModelById(id: string, data: City | {} = {}) {
    if (!this._modelsMap.get(id)) {
      this._modelsMap.set(id, new CityModel({ ...data }));
    }
    return this._modelsMap.get(id) as CityModel;
  }
}
