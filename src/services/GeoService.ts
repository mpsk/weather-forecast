import { identity } from 'lodash';
import { BaseService } from 'core/BaseService';
import { Rest } from './Rest';
import { City, CityModel } from 'models/City';

export class GeoService extends BaseService {
  static searchCity(value: string): Promise<City[] | void> {
    return this.handleRequest(() =>
      Rest.get(`/AutoCompleteCity?q=${value}`).then((data: string[]) =>
        data.filter((item) => item !== '%s' && identity(item)).map(itemToCity)
      )
    );
  }
}

function itemToCity(item: string): City {
  const [name, region, country] = item.split(',').map((value) => value.trim());
  const data = { name, region, country };
  return { ...data, id: CityModel.getCityId(data) };
}
