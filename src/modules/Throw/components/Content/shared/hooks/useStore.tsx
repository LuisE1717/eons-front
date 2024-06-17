import { useStore as useNanoStore } from "@nanostores/react";
import {
  throwType as _throwType,
  moneda1 as _moneda1,
  moneda2 as _moneda2,
  loading as _loading,
  lastThrow as _lastThrow,
} from "../../store";
import { TYPES } from "../../../../domain/types";

export default function useStore() {
  const throwType = useNanoStore(_throwType);
  const moneda1 = useNanoStore(_moneda1);
  const moneda2 = useNanoStore(_moneda2);
  const loading = useNanoStore(_loading);
  const lastThrow = useNanoStore(_lastThrow);

  function initStore() {
    handleChangeLoading(false);
    handleChangeMoneda1(0);
    handleChangeMoneda2(0);
    handleChangeThrowType(TYPES.NORMAL);
    handleChangeLastThrow("00");
  }

  function handleChangeMoneda1(v: number) {
    _moneda1.set(v);
  }

  function handleChangeThrowType(t: TYPES) {
    _throwType.set(t);
  }

  function handleChangeMoneda2(v: number) {
    _moneda2.set(v);
  }

  function handleChangeLoading(v: boolean) {
    _loading.set(v);
  }

  function handleChangeLastThrow(v: string) {
    _lastThrow.set(v);
  }

  return {
    throwType,
    moneda1,
    moneda2,
    loading,
    lastThrow,
    handleChangeLastThrow,
    handleChangeLoading,
    handleChangeMoneda1,
    handleChangeMoneda2,
    handleChangeThrowType,
    initStore,
  };
}
