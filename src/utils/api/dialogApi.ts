import { axiosI } from ".";

export async function getAllDialogs(token:string) {
    const res = await axiosI(token).get(`preguntas/`)
    const data = await res.data;

    return {
        data: data
    }
}

export async function postSaveDialog(token:string,datah:any) {
    const res = await axiosI(token).post(`preguntas/`,datah)
    const data = await res.data;

    return {
        data: data
    }
}