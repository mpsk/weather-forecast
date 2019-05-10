const APP_KEY = 'weather-app-local-state';

const serialize = (): object => {
  const data = localStorage.getItem(APP_KEY) as string;
  try {
    return data ? JSON.parse(data) : {};
  } catch (e) {
    //
  }
  return {};
};

export class LocalStorage {
  static serialize = serialize;

  static saveValue(key: string, value: any) {
    const data = {
      ...serialize(),
      [key]: value
    };
    localStorage.setItem(APP_KEY, JSON.stringify(data));
  }

  static getValue<T = any>(key: string): T {
    return serialize()[key];
  }
}
