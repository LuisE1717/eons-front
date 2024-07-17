import { type Dispatch, type FC, type SetStateAction } from "react";
import clsx from "clsx";

interface Props {
  condition: string;
  id: number;
  selectedCoin: number;
  secondCoin?: number;
  setSelected: Dispatch<SetStateAction<number>>;
  handleSelect: any;
  loading: boolean;
  doble?: boolean;
  big: boolean;
}

const Coin: FC<Props> = ({
  condition,
  selectedCoin,
  setSelected,
  handleSelect,
  id,
  loading,
  doble,
  secondCoin,
  big,
}) => {
  const selected = selectedCoin == id;

  return (
    <button
      disabled={loading}
      onClick={(e) => {
        doble
          ? handleSelect(setSelected, selectedCoin, id, secondCoin)
          : handleSelect(setSelected, selectedCoin, id);
      }}
      className="rounded-full w-[90px] h-[90px] border-[1px] border-black/70 flex justify-center items-center mx-8 shadow-lg shadow-gray-200"
    >
      <div
        className={clsx(
          "rounded-full border-[1px] border-black/70",
          selected && "bg-black/70"
        )}
        style={{ width: big ? "50px" : "30px", height: big ? "50px" : "30px" }}
      ></div>
    </button>
  );
};

export default Coin;
