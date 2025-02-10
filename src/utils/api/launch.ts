import { axiosI } from ".";

export async function getLaunches(token: string) {
    try {
        const response = await axiosI(token).get(`launch/evals`);
        const data = await response.data;
        return {
            data,
            success: true,
        };
    } catch (error: any) {
        console.error('Error in getLaunches:', error);

        return {
            data: null,
            success: false,
            error: error.response ? error.response.data : error.message,
        };
    }
}