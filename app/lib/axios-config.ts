import axios from "axios";
import { apiUrl } from "./variables";

export const axiosInstance = axios.create({ baseURL: apiUrl });

export const axiosGetData = (uri: string, apiToken?: string) => {
  return axiosInstance.get(uri, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
};

export const axiosPatchData = (uri: string, apiToken?: string) => {
  console.log(uri, apiToken);
  return axiosInstance.patch(uri, null, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
};
