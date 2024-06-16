import { useCallback, useContext, useMemo } from "react";
import { CoinContext } from "../../../../context/CoinContext";

interface Props {
  coin: "1" | "2";
}

export default function useCoinSelected({ coin }: Props) {
  const { handleChangeMoneda1, handleChangeMoneda2, moneda1, moneda2 } =
    useContext(CoinContext);

  const selectedCoin = useMemo(() => {
    if (coin === "1") {
      return moneda1;
    } else {
      return moneda2;
    }
  }, [coin]);

  const secondCoin = useMemo(() => {
    if (coin === "1") {
      return moneda2;
    } else {
      return moneda1;
    }
  }, [coin]);

  const handleChangeSelected = useCallback(
    (v: number) => {
      console.log(v)
      if (coin === "1") {
        handleChangeMoneda1(v);
      } else {
        handleChangeMoneda2(v);
      }
    },
    [coin]
  );

  return { selectedCoin, secondCoin, handleChangeSelected };
}
