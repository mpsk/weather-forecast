import { observable, set, computed, isObservable, toJS, action } from 'mobx';
import { pick, isEqual, runInContext } from 'lodash';

export class BaseModel<T = { id: string | undefined }> {
  @observable data: T = {} as any;

  id: string = '';

  constructor(options: Partial<T>) {
    set(this.data, options);
    this.initialize();
  }

  initialize() {
    //
  }

  @action setData(data: Partial<T>): this {
    if (!this.isEqual(data)) {
      set(this.data, isObservable(data) ? toJS(data) : data);
    }
    return this;
  }

  @action clear(): this {
    this.data = {} as T;
    return this;
  }

  isEqual(data: Partial<T>): boolean {
    const values = isObservable(data) ? toJS(data) : data;
    return isEqual(pick(this.toJSON(), Object.keys(data)), values);
  }

  toJSON(): T {
    return toJS(this.data);
  }
}

type Constructor<T> = new (...args: any[]) => T;
type StaticProps = any;

interface WithUniqueCid {
  _cid: string;
}

export function withUniqueCid(id?: string) {
  return <T>(target: Constructor<T>): StaticProps & Constructor<T & WithUniqueCid> => {
    const context = runInContext();
    const original = target;

    // the new constructor behaviour
    const extendedConstructor: any = (...args: any[]) => {
      const classInstance = construct(original, args);
      classInstance._cid = context.uniqueId(`${id || target.name}-`);
      return classInstance;
    };

    const staticProps = pick(target, Object.keys(target));
    Object.setPrototypeOf(extendedConstructor, Object.getPrototypeOf(target));
    Object.assign(extendedConstructor, { ...staticProps });

    // return new constructor (will override original)
    return extendedConstructor as StaticProps & Constructor<T & WithUniqueCid>;
  };

  function construct(constructor: any, args: any[]) {
    const c = () => new constructor(...args);
    c.prototype = constructor.prototype;
    return c();
  }
}
