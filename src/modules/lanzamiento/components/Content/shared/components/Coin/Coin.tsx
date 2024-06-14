import React, { type Dispatch, type FC, type SetStateAction } from "react";
import styles from "./Coin.module.css";
import Moon from "./components/Moon/Moon";
import Cross from "./components/Cross/Cross";

interface Props {
  svg: "moon" | "sun";
  condition: "face" | "cross";
  id: number;
  selectedCoin: number;
  secondCoin?: number;
  setSelected: Dispatch<SetStateAction<number>>;
  handleSelect: any;
  loading: boolean;
  doble?: boolean;
}

export default function Coin({
  svg,
  condition,
  selectedCoin,
  setSelected,
  handleSelect,
  id,
  loading,
  doble,
  secondCoin,
}: Props) {
  function handleClick() {
    if (doble) {
      handleSelect(setSelected, selectedCoin, id, secondCoin);
    } else {
      handleSelect(setSelected, selectedCoin, id);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className={selectedCoin == id ? styles.coinbaseActive : styles.coinbase}
    >
      {svg == "moon" ? (
        <Moon condition={condition === "face"} />
      ) : (
        <Cross condition={condition === "cross"} />
      )}
    </button>
  );
}
