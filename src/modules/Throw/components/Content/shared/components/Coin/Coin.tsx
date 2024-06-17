import Moon from "../Moon/Moon";
import Cross from "../Cross/Cross";
import type { CoinProps } from "../../domain";
import useCoinSelected from "../../hooks/useCoinSelected";
import clsx from "clsx";
import useStore from "../../hooks/useStore";

interface Props extends CoinProps {}

export default function Coin({ svg, condition, coin, id }: Props) {
  const { loading } = useStore();
  const { handleChangeSelected, selectedCoin } = useCoinSelected({
    coin: coin,
  });

  function handleClick() {
    if (id === selectedCoin) {
      handleChangeSelected(0);
    } else {
      handleChangeSelected(id);
    }
  }

  const CLASS = clsx(
    "rounded-full",
    "w-[70px] h-[70px]",
    "flex justify-center items-center"
  );

  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className={CLASS}
      style={{ backgroundColor: selectedCoin === id ? "#94a3b8" : "#cccccc" }}
    >
      {svg == "moon" ? (
        <Moon condition={condition} />
      ) : (
        <Cross condition={condition} />
      )}
    </button>
  );
}
