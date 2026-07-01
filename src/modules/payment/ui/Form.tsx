import { useEffect } from "react";
import Loading from "@components/UI/Button/components/Loading/Loading";
import Button from "./components/Button/Button";
import Check from "./components/Check/Check";
import Section from "./components/Section/Section";
import useForm from "@modules/payment/application/useForm";
interface Props {
  bankOrderCode?:string,
  reference?:string,
  state?:string;
}

export default function Form({
  bankOrderCode,
  reference,
  state
} : Props) {

  const { confirm } = useForm();

  useEffect(()=>{
    handleVerifyPay()
  },[])

  async function handleVerifyPay() {
    if(bankOrderCode && reference){
      await confirm({
        bankOrderCode,
        reference
      })
      .then(()=>{window.location.href = '/services'})
      .catch((error)=>{console.log(error); window.location.href ='/payment/failed'})
    }
    else{
      window.location.href = '/payment/failed'
    }
  }

  return (
    <form className="flex flex-col gap-y-7 items-center" >
      <div className="flex flex-row">
        <Loading text_loading={"Verificando Pago..."} />
      </div>
    </form>
  );
}
