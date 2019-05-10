import axios from "axios";

export { AxiosPromise, AxiosResponse, AxiosRequestConfig } from "axios";

export const Axios = axios.create({
  responseType: "json"
  // headers
});
