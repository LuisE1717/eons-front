// utils/api/index.ts - ACTUALIZADO PARA PRODUCCIÓN
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import configEnv from "../../../.env_config";
import Cookies from "js-cookie";
import { validMail } from "../validations";

// Configuración dinámica según el entorno
const isDevelopment = process.env.ENV === "local";
const API_BASE_URL = isDevelopment ? 'http://localhost:3000' : 'https://api.eons.es';

export const intanceAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Función para verificar si estamos en el cliente (navegador)
const isClient = () => typeof window !== 'undefined';

export function axiosI(apiToken: string | undefined) {
  const intance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Aumentar timeout a 30 segundos
  });

  intance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Obtener el token de las cookies si no se proporcionó
      if (!apiToken && isClient()) {
        apiToken = Cookies.get("eons_token") || "";
      }

      if (apiToken && config.headers) {
        config.headers.Authorization = `Bearer ${apiToken}`;
        console.log('✅ Token añadido a la solicitud:', apiToken.substring(0, 20) + '...');
      } else {
        console.warn('⚠️ No se pudo obtener token para la solicitud');
      }

      return config;
    },
    (error) => {
      console.error('Error en interceptor de request:', error);
      return Promise.reject(error);
    }
  );

  intance.interceptors.response.use(
    (response) => {
      console.log('✅ Respuesta exitosa:', response.config.url);
      return response;
    },
    async (error) => {
      console.error('❌ Error en respuesta:', error.response?.status, error.config?.url);
      
      if (error.response && isClient()) {
        const originalConfig = error.config;
        
        // Access Token was expired
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          
          console.log('🔄 Token expirado, intentando renovar...');
          
          try {
            // Intentar renovar el token usando el refresh token
            const refreshToken = Cookies.get("eons_refresh_token");
            if (refreshToken) {
              const refreshResponse = await axios.post(
                `${API_BASE_URL}/auth/login`,
                {},
                {
                  headers: {
                    'Authorization': `Bearer ${refreshToken}`
                  }
                }
              );
              
              if (refreshResponse.data.accessToken) {
                const newAccessToken = refreshResponse.data.accessToken;
                Cookies.set("eons_token", newAccessToken);
                
                // Reintentar la solicitud original con el nuevo token
                originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
                return intance(originalConfig);
              }
            }
          } catch (refreshError) {
            console.error('❌ Error al renovar token:', refreshError);
            // Si falla la renovación, redirigir al login
            Cookies.remove('eons_token');
            Cookies.remove('eons_refresh_token');
            if (isClient() && !window.location.pathname.includes('/auth')) {
              window.location.href = '/auth';
            }
          }
        } else if (error.response.status === 403) {
          console.log('🔒 Acceso denegado, verificando email...');
          if (validMail(Cookies.get("eons_user"))) {
            const frontendUrl = isDevelopment ? 'http://localhost:4321' : 'https://eons.es';
            window.location.href = `${frontendUrl}/email-verification/${Cookies.get("eons_user") || ""}`;
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return intance;
}