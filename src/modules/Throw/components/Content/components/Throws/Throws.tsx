import React, { Fragment, useContext } from "react";
import { TYPES } from "../../../../domain/types";
import Mount from "./components/Mount/Mount";
import Tranversal from "./components/Tranversal/Tranversal";
import Stand from "./components/Stand/Stand";
import Normal from "./components/Normal/Normal";
import { CoinContext } from "../../../../context/CoinContext";

interface Props {
  handleSendThrow(): void;
}

export default function Throws({ handleSendThrow }: Props) {
  const { throwType: type } = useContext(CoinContext);

  return (
    <Fragment>
      {type === TYPES.NORMAL && <Normal />}

      {type === TYPES.PARADO && <Stand />}

      {type === TYPES.MONTADO && <Mount />}

      {type === TYPES.TRANVERSAL && (
        <Tranversal handleSendThrow={handleSendThrow} />
      )}

      {type === TYPES.PARADO_MONTADO && <Mount />}
    </Fragment>
  );
}
