import { isEmpty, startsWith } from "lodash";
import qs from "query-string";
import { Axios, AxiosPromise, AxiosRequestConfig } from "lib/axios";

export { AxiosPromise, AxiosResponse } from "lib/axios";

export class Rest {
  static get = get;
  get = get;
}

export const queryParams = (params: object): string => (isEmpty(params) ? "" : "?" + qs.stringify(params));
const strigifyParamsForGet = (params: string | object): string => {
  let query = typeof params === "object" ? queryParams(params) : params;

  if (!isEmpty(query) && !startsWith(query, "?")) {
    query = `?${query}`;
  }

  return query;
};

const REQUESTS: Record<string, Record<string, AxiosPromise<any>>> = {
  GET: {}
};

async function get(url: string, params: string | object = "") {
  try {
    const urlParams = strigifyParamsForGet(params);
    const resp = await memoizeGetRequest(REQUESTS.GET, url + urlParams);
    return resp.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Cache same requests during pending some of them
 */
function memoizeGetRequest(container: typeof REQUESTS.GET, url: string, config?: AxiosRequestConfig) {
  if (!container[url]) {
    container[url] = Axios.get(url, config).finally(() => cleanCache(container, url));
  }
  return container[url];
}

function cleanCache(container: object, data: string) {
  delete container[data];
}
