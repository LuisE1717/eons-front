import { axiosI, intanceAxios } from ".";
import type { IChangePass, ILogin } from "../../modules/user/domain/user";
import Cookies from 'js-cookie';
import axios from 'axios';

// Forzar desarrollo
const isDevelopment = true;
const API_BASE_URL = 'http://localhost:3000';

// Función para marcar como leído usando axios directamente
export const setReadedWithAxios = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/set-readed`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error in setReaded:', error);
    throw error;
  }
};

// Función para marcar como leído usando axiosI (la que deberíamos usar)
export async function setReaded(token: string) {
    try {
        const res = await axiosI(token).post(`/user/set-readed`, {});
        const data = await res.data;

        if (data) {
            return {
                data: data,
                success: true
            };
        } else {
            return {
                data: null,
                success: false
            };
        }
    } catch (error) {
        console.error('Error in setReaded:', error);
        return {
            data: null,
            success: false,
            error: error
        };
    }
}

// Otras funciones de API para usuario...
export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/profile`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export async function postLogin(dataLogin: ILogin) {
    const res = await intanceAxios.post('auth/login', dataLogin);
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        };
    } else {
        return {
            data: data,
        };
    }
}

export async function singUp(dataLogin: ILogin) {
    const res = await intanceAxios.post('auth/register', dataLogin);
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        };
    } else {
        return {
            data: data,
        };
    }
}

export async function postLogout(token: string, datah: any) {
    const res = await axiosI(token).post('auth/logout', datah);
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        };
    } else {
        return {
            data: data
        };
    }
}

export async function refreshSection(refreshToken: string) {
    const res = await axiosI(refreshToken).get('auth/login');
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        };
    } else {
        return {
            data: data,
        };
    }
}

export async function postChangePass(dataH: IChangePass, token: string) {
    const res = await axiosI(token).post('/auth/reset-password', dataH);
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        };
    } else {
        return {
            data: data
        };
    }
}

export async function postResetPass(dataH: any) {
    const res = await intanceAxios.post('/auth/request-password-reset', dataH);
    const data = await res.data;

    if (data) {
        return {
            data: data
        };
    }
}

export async function getValidateMail(dataH: any) {
    const res = await intanceAxios.get('/auth/verify-email', dataH);
    const data = await res.data;

    if (data) {
        return {
            data: data
        };
    }
}

export async function sendVerificationMail(email: string, lang: string) {
    const res = await intanceAxios.get(`/auth/request-verify-email?email=${email}&lang=${lang}`);
    const data = await res.data;

    if (data) {
        return {
            data: data
        };
    }
}

export async function getProfile(token: string) {
    try {
        const res = await axiosI(token).get(`/auth/profile`);
        const data = await res.data;

        if (data) {
            return {
                data: data,
                success: true
            };
        } else {
            return {
                data: null,
                success: false
            };
        }
    } catch (error) {
        console.error('Error getting profile:', error);
        return {
            data: null,
            success: false,
            error: error
        };
    }
}

export async function patchNotification(token: string, dataH: any) {
    const res = await axiosI(token).patch(`/notifications`, dataH);
    const data = await res.data;

    if (data) {
        return {
            data: data
        };
    }
}