import { axiosI } from ".";

export async function getAllSpirits(token:string) {
    const res = await axiosI(token).get(`espiritus/`)
    const data = await res.data;

    return {
        data: data
    }
}

export async function postCreateSpirit(token:string) {
    const res = await axiosI(token).post(`espiritus/`,{})
    const data = await res.data;

    return {
        data: data
    }
}