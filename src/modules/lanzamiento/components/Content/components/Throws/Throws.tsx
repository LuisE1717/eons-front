import React, { Fragment } from "react";
import { TYPES } from "../../../../domain/types";
import Mount from "./components/Mount/Mount";
import TranversalThrow from "./components/Tranversal/Tranversal";
import Stand from "./components/Stand/Stand";
import Normal from "./components/Normal/Normal";

interface Props {
  type: TYPES;
  loading: boolean;
  moneda1: number;
  moneda2: number;
}

export default function Throws({ type, loading, moneda1, moneda2 }: Props) {
  return (
    <Fragment>
      {type === TYPES.NORMAL && (
        <Normal
          loading={loading}
          moneda1={moneda1}
          setMoneda1={setMoneda1}
          moneda2={moneda2}
          setMoneda2={setMoneda2}
          handleSelectCoin={handleSelectCoin}
          lastThrow={lastThrow}
        />
      )}

      {type === TYPES.PARADO && (
        <Stand
          loading={loading}
          moneda1={moneda1}
          setMoneda1={setMoneda1}
          moneda2={moneda2}
          setMoneda2={setMoneda2}
          handleSelectCoin={handleSelectCoin}
          handleSelectDobleCoin={handleSelectDobleCoin}
          setThrowType={setThrowType}
        />
      )}

      {type === TYPES.MONTADO && (
        <Mount
          throwType={throwType}
          loading={loading}
          moneda1={moneda1}
          setMoneda1={setMoneda1}
          moneda2={moneda2}
          setMoneda2={setMoneda2}
          handleSelectDobleCoin={handleSelectDobleCoin}
        />
      )}

      {type === TYPES.TRANVERSAL && (
        <TranversalThrow
          loading={loading}
          moneda1={moneda1}
          setMoneda1={setMoneda1}
          moneda2={moneda2}
          setMoneda2={setMoneda2}
          handleSelectCoin={handleSelectCoin}
          setType={setThrowType}
          sendThrow={sendThrow}
        />
      )}

      {type === TYPES.PARADO_MONTADO && (
        <Mount
          throwType={throwType}
          loading={loading}
          moneda1={moneda1}
          setMoneda1={setMoneda1}
          moneda2={moneda2}
          setMoneda2={setMoneda2}
          handleSelectDobleCoin={handleSelectDobleCoin}
        />
      )}
    </Fragment>
  );
}
