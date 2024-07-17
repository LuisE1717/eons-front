import { axiosI } from ".";

export async function getAllDialogs(token:string,type:string) {
    const res = await axiosI(token).get(`preguntas/?type=${type}`)
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

export async function putDialog(token:string,datah:any,id:string) {
    const res = await axiosI(token).put(`preguntas/${id}`,datah)
    const data = await res.data;

    return {
        data: data
    }
}

export async function deleteDialog(token:string,id:string) {
    const res = await axiosI(token).delete(`preguntas/${id}`)
    const data = await res.data;

    return {
        data: data
    }
}