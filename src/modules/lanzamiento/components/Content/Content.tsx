import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import NextButton from "../../../../components/UI/NextButton";
import { closeThrow, postThrow } from "../../../../utils/api/throwApi";
import Cookies from "js-cookie";
import { coinsInterpreter } from "../../domain/interpreter";
import NormalThrow from "./components/Throws/components/Normal/Normal";
import MountThrow from "./components/Throws/components/Mount/Mount";
import StandThrow from "./components/Throws/components/Stand/Stand";
import TranversalThrow from "./components/Throws/components/Tranversal/Tranversal";
import { toast, ToastContainer } from "react-toastify";
import useTranslation from "../../../Shared/hooks/useTranslation";
import { TYPES } from "../../domain/types";
import Header from "./components/Header/Header";

import "react-toastify/dist/ReactToastify.css";
import Buttons from "./components/Buttons/Buttons";
import Throws from "./components/Throws/Throws";

export default function Content() {
  const { translation } = useTranslation();

  function handleSelectCoin(
    setState: Dispatch<SetStateAction<number>>,
    value: number,
    target: number
  ) {
    if (target == value) {
      setState(0);
    } else {
      setState(target);
    }
  }

  function handleSelectDobleCoin(
    setState: Dispatch<SetStateAction<number>>,
    value: number,
    target: number,
    secondValue: number
  ) {
    if (target == value) {
      setState(0);
    } else {
      if (target > 2) {
        if (secondValue <= 2) {
          setState(target);
        }
      } else if (target <= 2) {
        if (secondValue > 2 || secondValue == 0) {
          setState(target);
        }
      }
    }
  }

  async function handleSendThrow() {
    const coin = coinsInterpreter({
      type: throwType,
      coin1: moneda1,
      coin2: moneda2,
    });

    if (coin != "00") {
      setLoading(true);

      try {
        await postThrow(Cookies.get("eons_token") || "", coin, "dialog").then(
          (response) => {
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
              window.location.href = `${
                lng == "es" ? "/es" : ""
              }/throw/response/${result?.data}`;
            }

            setCount(count + 1);
            scrollToTop();
            setLastThrow(coin);
            setThrowType(TYPES.NORMAL);
            setMoneda1(0);
            setMoneda2(0);
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(translation.fecth_error);
        setLoading(false);
      }

      setLoading(false);
    }
  }

  const closeDialog = async () => {
    try {
      setLoading(true);

      await closeThrow(Cookies.get("eons_token") || "").then((response) => {
        console.log(response);
        toast.success(translation.Throw.dialog_close);

        setCount(1);
        setLastThrow("00");
        scrollToTop();
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    setMoneda1(0);
    setMoneda2(0);
  }, [throwType]);

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

  function handleClickMontado() {
    scrollToTop();
    setThrowType(TYPES.MONTADO);
    setMoneda1(0);
    setMoneda2(0);
  }

  function handleClickParado() {
    scrollToTop();
    setThrowType(TYPES.PARADO);
    setMoneda1(0);
    setMoneda2(0);
  }

  function handleClickTranversal() {
    scrollToTop();
    setThrowType(TYPES.TRANVERSAL);
    setMoneda1(0);
    setMoneda2(0);
  }

  return (
    <main className="flex flex-col w-full items-center">
      <div className="z-10 rounded-xl bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <Header count={count} />

        <Throws type={throwType} />

        <div className="flex flex-col items-center mt-8 my-4">
          <span>{translation.Throw.especial_throw}</span>
        </div>

        <Buttons
          loading={loading}
          handleClickMontado={handleClickMontado}
          handleClickParado={handleClickParado}
          handleClickTranversal={handleClickTranversal}
        />
      </div>

      {/* {lastThrow!='00' && <ReloadButtonReact loading={loading} closeDialog={closeDialog}/>} */}
      <NextButton loading={loading} sendThrow={sendThrow} />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </main>
  );
}
