import axios from "axios";
import { apiUrl } from "./variables";

export const axiosInstance = axios.create({ baseURL: apiUrl });

export const axiosGetData = (uri: string, apiToken?: string) => {
  return axiosInstance.get(uri, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });
};
