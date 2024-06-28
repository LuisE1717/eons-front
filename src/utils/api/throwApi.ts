import { axiosI } from ".";

export async function postThrow(token:string,code:string,dataE) {
    const res = await axiosI(token).get(`respuestas/${code}/${dataE}`)
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

export async function closeThrow(token:string) {
    const res = await axiosI(token).post(`respuestas/?close=${true}`)
    const data = await res.data;

    if (!data) {
        console.log(res)
    } else {
        return {
            data: data
        }
    }
}