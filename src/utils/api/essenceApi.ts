import { axiosI, intanceAxios } from ".";
import type { PaymentCheck } from "../../modules/payment/Form/interfaces";

export async function getPackages() {
    const res = await intanceAxios.get(`/esencias`)
    const data = await res.data;

    return {
        data: data
    }
}

export async function getTransfers(token:string) {
    const res = await axiosI(token).get(`/transferencias`)
    const data = await res.data;

    return {
        data: data
    }
}

export async function startPayment(token:string,id:string) {
    const res = await axiosI(token).post(`/tropipay/create-payment-card/${id}`)
    const data = await res.data;

    return {
        data: data
    }
}

export async function confirmPayment(token:string,dataH:PaymentCheck) {
    const res = await axiosI(token).post(`/tropipay/validate-payment`,dataH)
    const data = await res.data;

    return {
        data: data
    }
}