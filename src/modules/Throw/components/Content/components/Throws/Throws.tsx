import React, { Fragment, useContext } from "react";
import { TYPES } from "../../../../domain/types";
import Mount from "./components/Mount/Mount";
import Tranversal from "./components/Tranversal/Tranversal";
import Stand from "./components/Stand/Stand";
import Normal from "./components/Normal/Normal";
import { throwType } from "../../store";

interface Props {
  handleSendThrow(): void;
}

export default function Throws({ handleSendThrow }: Props) {
  return (
    <Fragment>
      {throwType.get() === TYPES.NORMAL && <Normal />}

      {throwType.get() === TYPES.PARADO && <Stand />}

      {throwType.get() === TYPES.MONTADO && <Mount />}

      {throwType.get() === TYPES.TRANVERSAL && (
        <Tranversal handleSendThrow={handleSendThrow} />
      )}

      {throwType.get() === TYPES.PARADO_MONTADO && <Mount />}
    </Fragment>
  );
}
