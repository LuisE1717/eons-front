import React, { type Dispatch, type FC, type SetStateAction } from "react";
import Coin from "../../../../shared/components/Coin/Coin";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";
import { TYPES } from "../../../../../../domain/types";
import CoinText from "../../../../shared/components/CoinText/CoinText";
import CoinContainer from "../../../../shared/components/CoinContainer/CoinContainer";

interface Props {
  loading: boolean;
  moneda1: number;
  setMoneda1: Dispatch<SetStateAction<number>>;
  moneda2: number;
  setMoneda2: Dispatch<SetStateAction<number>>;
  handleSelectDobleCoin: any;
  type: TYPES;
}

export default function Mount({
  loading,
  moneda1,
  setMoneda1,
  moneda2,
  setMoneda2,
  handleSelectDobleCoin,
  type,
}: Props) {
  const { translation } = useTranslation();

  return (
    <>
      <CoinText>
        {type === TYPES.PARADO_MONTADO
          ? translation.Throw.question_mount_stops1
          : translation.Throw.question_mount1}
      </CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <Coin
          loading={loading}
          id={1}
          svg="sun"
          condition="face"
          selectedCoin={moneda1}
          setSelected={setMoneda1}
          doble
          secondCoin={moneda2}
          handleSelect={handleSelectDobleCoin}
        />
        <Coin
          loading={loading}
          id={2}
          svg="sun"
          condition="cross"
          selectedCoin={moneda1}
          setSelected={setMoneda1}
          doble
          secondCoin={moneda2}
          handleSelect={handleSelectDobleCoin}
        />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <Coin
          id={3}
          svg="moon"
          condition="face"
          loading={loading}
          selectedCoin={moneda1}
          setSelected={setMoneda1}
          doble
          secondCoin={moneda2}
          handleSelect={handleSelectDobleCoin}
        />
        <Coin
          id={4}
          svg="moon"
          condition="cross"
          loading={loading}
          selectedCoin={moneda1}
          setSelected={setMoneda1}
          doble
          secondCoin={moneda2}
          handleSelect={handleSelectDobleCoin}
        />
      </CoinContainer>

      <CoinText>
        {type === TYPES.PARADO_MONTADO
          ? translation.Throw.question_mount_stops2
          : translation.Throw.question_mount2}
      </CoinText>

      <CoinText>{translation.Throw.coin1}</CoinText>

      <CoinContainer>
        <Coin
          loading={loading}
          id={1}
          svg="sun"
          condition="face"
          selectedCoin={moneda2}
          setSelected={setMoneda2}
          doble
          secondCoin={moneda1}
          handleSelect={handleSelectDobleCoin}
        />
        <Coin
          loading={loading}
          id={2}
          svg="sun"
          condition="cross"
          selectedCoin={moneda2}
          setSelected={setMoneda2}
          doble
          secondCoin={moneda1}
          handleSelect={handleSelectDobleCoin}
        />
      </CoinContainer>

      <CoinText>{translation.Throw.coin2}</CoinText>

      <CoinContainer>
        <Coin
          id={3}
          svg="moon"
          condition="face"
          loading={loading}
          selectedCoin={moneda2}
          setSelected={setMoneda2}
          doble
          secondCoin={moneda1}
          handleSelect={handleSelectDobleCoin}
        />
        <Coin
          id={4}
          svg="moon"
          condition="cross"
          loading={loading}
          selectedCoin={moneda2}
          setSelected={setMoneda2}
          doble
          secondCoin={moneda1}
          handleSelect={handleSelectDobleCoin}
        />
      </CoinContainer>
    </>
  );
}
