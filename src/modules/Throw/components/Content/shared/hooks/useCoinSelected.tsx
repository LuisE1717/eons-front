import { useMemo } from "react";
import useStore from "./useStore";

interface Props {
  coin: "1" | "2";
}

export default function useCoinSelected({ coin }: Props) {
  const { moneda1, moneda2, handleChangeMoneda1, handleChangeMoneda2 } =
    useStore();

  const selectedCoin: number = useMemo(() => {
    if (coin === "1") {
      return moneda1;
    } else {
      return moneda2;
    }
  }, [coin, moneda1, moneda2]);

  const secondCoin: number = useMemo(() => {
    if (coin === "1") {
      return moneda2;
    } else {
      return moneda1;
    }
  }, [coin, moneda1, moneda2]);

  function handleChangeSelected(v: number): void {
    if (coin === "1") {
      handleChangeMoneda1(v);
    } else {
      handleChangeMoneda2(v);
    }
  }

  return { selectedCoin, secondCoin, handleChangeSelected };
}
