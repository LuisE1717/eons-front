import axios, {
  Axios,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import configEnv from "../../../.env_config";
import Cookies from "js-cookie";
import { setCookie } from "../cookies/Cookies";
import { validMail } from "../validations";
import { userProfile } from "../../UserStore";

export const intanceAxios: AxiosInstance = axios.create({
  baseURL: configEnv?.api,
});

export function axiosI(apiToken: string | undefined) {
  //console.log(configEnv)

  const intance = axios.create({
    baseURL: configEnv?.api,
  });

  intance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!apiToken) {
        apiToken = Cookies.get("eons_token") || "";
      }

      if (apiToken && config.headers) {
        config.headers.Authorization = `Bearer ${apiToken}`;
      }

      //console.log("Request was sent", config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  intance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        const originalConfig = error.config;
        // Access Token was expired
        setCookie("comeback_url", window.location.href, 0.25);
        if (error.response.status === 401) {
          window.location.reload();
        } else if (error.response.status === 403) {
           if (validMail(Cookies.get("eons_user")))
            window.location.href = `/auth/email-verification/${
              Cookies.get("eons_user") || ""
            }`;
          else window.location.href = `/auth`;
        }
      }
      return Promise.reject(error);
    }
  );

  return intance;
}
