import { axiosI, intanceAxios } from ".";
import type { Price } from "../../modules/Essence/components/List/domain";
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

export async function calculatePrice(esencia:number) {
    const res = await intanceAxios.get(`/esencias/calculate/${esencia}`)
    const data = await res.data;

    return {
        data: data
    }
}

export async function transferEssence(token:string,datah:any) {
    const res = await axiosI(token).post(`/transferencias`,datah)
    const data = await res.data;

    return {
        data: data
    }
}

export async function startPayment(token:string,id:string,lang:string) {
    console.log("llega aqui")
    const res = await axiosI(token).post(`/tropipay/create-payment-card/${id}?lang=${lang}`)
    console.log(res)
    const data = await res.data;

    return {
        data: data
    }
}

export async function startCustomPayment(token:string,datah:any) {
    const res = await axiosI(token).post(`/tropipay/create-payment-card`,datah)
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