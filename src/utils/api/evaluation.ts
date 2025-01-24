import { axiosI, intanceAxios } from ".";
import Cookies from "js-cookie";
export async function postSaveEvaluation(token: string, data: any) {
    try {
        const response = await axiosI(token).post(`launch/`, data);
        
        return {
            data: response.data,
            success: true,
        };
    } catch (error: any) {
        console.error('Error in postSaveEvaluation:', error);

        return {
            data: null,
            success: false,
            error: error.response ? error.response.data : error.message,
        };
    }
}

type Results = {
    type:string;
    language:string;
    hexResults: string[];
}

export async function postMesagges(token: string, data: Results) {
    try {
        const response = await axiosI(token).post(`messages/translate`, data);
        console.log(response);
        return {
            data: response.data,
            success: true,
        };
    } catch (error: any) {
        console.error('Error in postMesagges:', error);

        return {
            data: null,
            success: false,
            error: error.response ? error.response.data : error.message,
        };
    }
}