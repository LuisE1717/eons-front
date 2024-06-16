import { createContext, useEffect, useState } from "react";
import { TYPES } from "../domain/types";

interface Props {
  handleChangeMoneda1(v: number): void;
  handleChangeMoneda2(v: number): void;
  moneda1: number;
  moneda2: number;
  lastThrow: string;
  throwType: TYPES;
  loading: boolean;
  handleChangeThrowType(t: TYPES): void;
  handleChangeLoading(v: boolean): void;
  handleChangeLastThrow(v: string): void;
}

export const CoinContext = createContext<Props>({} as Props);

export function CoinProvider({ children }: { children: React.ReactNode }) {
  const [moneda1, setMoneda1] = useState(0);
  const [moneda2, setMoneda2] = useState(0);

  const [loading, setLoading] = useState(false);

  const [throwType, setThrowType] = useState<TYPES>(TYPES.NORMAL);

  const [lastThrow, setLastThrow] = useState("00");

  function handleChangeMoneda1(v: number) {
    setMoneda1(v);
  }

  function handleChangeThrowType(t: TYPES) {
    setThrowType(t);
  }

  function handleChangeMoneda2(v: number) {
    setMoneda2(v);
  }

  function handleChangeLoading(v: boolean) {
    setLoading(v);
  }

  function handleChangeLastThrow(v: string) {
    setLastThrow(v);
  }

  useEffect(() => {
    setMoneda1(0);
    setMoneda2(0);
  }, [throwType]);

  const value: Props = {
    handleChangeMoneda1,
    handleChangeMoneda2,
    moneda1,
    moneda2,
    throwType,
    lastThrow,
    loading,
    handleChangeThrowType,
    handleChangeLoading,
    handleChangeLastThrow,
  };

  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
}
