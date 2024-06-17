import { useEffect, useState } from "react";
import NextButton from "../../../../components/UI/NextButton";
import { closeThrow, postThrow } from "../../../../utils/api/throwApi";
import Cookies from "js-cookie";
import { coinsInterpreter } from "../../domain/interpreter";
import { toast } from "react-toastify";
import useTranslation from "../../../Shared/hooks/useTranslation";
import { TYPES } from "../../domain/types";
import Header from "./components/Header/Header";
import Buttons from "./components/Buttons/Buttons";
import Throws from "./components/Throws/Throws";
import CoinText from "./shared/components/CoinText/CoinText";
import Layout from "./components/Layout/Layout";
import useStore from "./shared/hooks/useStore";

interface Props {
  action: string;
  param1: number;
}

export default function Content({ action, param1 }: Props) {
  const { translation } = useTranslation();
  const {
    handleChangeMoneda1,
    handleChangeMoneda2,
    handleChangeLastThrow,
    handleChangeLoading,
    handleChangeThrowType,
    lastThrow,
    moneda1,
    moneda2,
    throwType,
  } = useStore();

  const [count, setCount] = useState(1);

  useEffect(() => {
    handleChangeMoneda1(0);
    handleChangeMoneda2(0);
  }, [throwType]);

  async function handleSendThrow() {
    const coin = coinsInterpreter({
      type: throwType,
      coin1: moneda1,
      coin2: moneda2,
    });

    if (coin != "00") {
      handleChangeLoading(true);

      try {
        const response = await postThrow(
          Cookies.get("eons_token") || "",
          coin,
          "dialog"
        );

        const result = response.data;

        if (result?.message == "Vuelve a tirar") {
          console.log(lastThrow);

          // if(CoinsInterpreter(throwType,moneda1,moneda2)<='04' && lastThrow<='04'){

          // }
          // else{
          //     if(CoinsInterpreter(throwType,moneda1,moneda2)>='04')
          //         toast.warning("Vuelva a lanzar las monedas para definir su tiro especial")
          // }
        } else if (
          result?.message ==
          "No puede hacer más lanzamientos especiales. Debe continuar con los lanzamientos normales."
        ) {
          window.location.reload();
        }
        // else if(!result.data && result.statusCode==200){
        //     toast.success("Lanzamiento especial resuelto, continue")
        // }
        else if (result?.data) {
          const lng = Cookies.get("eons_lng") || "en";
          window.location.href = `${lng == "es" ? "/es" : ""}/throw/response/${
            result?.data
          }`;
        }

        setCount((prev) => prev + 1);
        scrollToTop();
        handleChangeLastThrow(coin);
        handleChangeThrowType(TYPES.NORMAL);
        handleChangeMoneda1(0);
        handleChangeMoneda2(0);
      } catch (error) {
        toast.error(translation.fecth_error);
      } finally {
        handleChangeLoading(false);
      }
    }
  }

  async function handleCloseDialog() {
    try {
      handleChangeLoading(true);

      const response = await closeThrow(Cookies.get("eons_token") || "");

      toast.success(translation.Throw.dialog_close);

      setCount(1);
      handleChangeLastThrow("00");
      scrollToTop();
    } finally {
      handleChangeLoading(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    // closeThrow(Cookies.get("eons_token") || "");
  }, []);

  // useEffect(() => {
  //     const handleBeforeUnload = (event) => {
  //     //   event.preventDefault();
  //     //   event.returnValue = '';
  //       console.log(event) // Esto solicita confirmación al usuario
  //       console.log('El usuario está intentando salir de la página');
  //       //closeThrow(Cookies.get('eons_token')||'')
  //     };

  //     window.addEventListener('beforeunload', handleBeforeUnload);

  //     return () => {
  //       window.removeEventListener('beforeunload', handleBeforeUnload);
  //     };
  //   }, []);

  function handleClickType(t: TYPES) {
    scrollToTop();
    handleChangeLastThrow(t);
    handleChangeMoneda1(0);
    handleChangeMoneda2(0);
  }

  return (
    <Layout>
      <Header count={count} />

      <Throws handleSendThrow={handleSendThrow} />

      <CoinText>{translation.Throw.especial_throw}</CoinText>

      <Buttons
        handleClickMontado={() => handleClickType(TYPES.MONTADO)}
        handleClickParado={() => handleClickType(TYPES.PARADO)}
        handleClickTranversal={() => handleClickType(TYPES.TRANVERSAL)}
      />

      {/* {lastThrow!='00' && <ReloadButtonReact loading={loading} closeDialog={closeDialog}/>} */}
      <NextButton handleSendThrow={handleSendThrow} />
    </Layout>
  );
}
