import axios from "axios";
import { apiUrl } from "./variables";

export const axiosInstance = axios.create({ baseURL: apiUrl });
