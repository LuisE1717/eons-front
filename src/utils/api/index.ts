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

// Función para verificar si estamos en el cliente (navegador)
const isClient = () => typeof window !== 'undefined';

export function axiosI(apiToken: string | undefined) {
  const intance = axios.create({
    baseURL: configEnv?.api,
  });

  intance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!apiToken && isClient()) {
        apiToken = Cookies.get("eons_token") || "";
      }

      if (apiToken && config.headers) {
        config.headers.Authorization = `Bearer ${apiToken}`;
      }

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
      if (error.response && isClient()) {
        console.log("Error in response", error.response);
        const originalConfig = error.config;
        
        // Evitar redirecciones automáticas en desarrollo para ciertas rutas
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.includes('/auth');
        const isVerificationPage = currentPath.includes('verification-success') || 
                                  currentPath.includes('email-verification');
        
        // Access Token was expired
        if (error.response.status === 401 && !isAuthPage && !isVerificationPage) {
          Cookies.remove('eons_token');
          // Solo redirigir si no estamos ya en una página de auth/verificación
          window.location.href = '/auth';
        } else if (error.response.status === 403 && !isVerificationPage) {
          if (validMail(Cookies.get("eons_user"))) {
            // Solo redirigir si no estamos ya en una página de verificación
            window.location.href = `/email-verification/${Cookies.get("eons_user") || ""}`;
          } else if (!isAuthPage) {
            window.location.href = `/auth`;
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return intance;
}