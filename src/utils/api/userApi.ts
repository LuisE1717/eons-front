import { axiosI, intanceAxios } from ".";
import type { IChangePass, ILogin } from "../../modules/user/domain/user";

export async function postLogin(dataLogin:ILogin) {
    const res = await intanceAxios.post('auth/login', dataLogin);

    const data = await res.data;
    console.log(data);

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

export async function singUp(dataLogin:ILogin) {
    const res = await intanceAxios.post('auth/register', dataLogin);

    const data = await res.data;
    console.log(res);

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

export async function postLogout() {
    const res = await intanceAxios.post('auth/logout')
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        }
    } else {
        return {
            data: data
        }
    }
}

export async function postChangePass(dataH:IChangePass,token:string) {
    const res = await axiosI(token).post('/auth/reset-password',dataH)
    const data = await res.data;

    if (!data) {
        return {
            notFound: true,
        }
    } else {
        return {
            data: data
        }
    }
}

export async function postResetPass(dataH:any) {
    const res = await intanceAxios.post('/auth/request-password-reset',dataH)
    const data = await res.data;

    if (data) {
        return {
            data: data
        }
    }
}


