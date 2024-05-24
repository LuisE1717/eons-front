import axios, {Axios, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import configEnv from "./env_config";

export const intanceAxios : AxiosInstance = axios.create ({
    baseURL: configEnv?.api,
});