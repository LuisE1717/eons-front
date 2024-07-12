import { useMemo, useState } from "react";
import Button from "./components/Button/Button";

export default function Custom() {
  const [count, setCount] = useState(1000);

  const price = useMemo(() => {
    return count * 5;
  }, [count]);

  const discount = useMemo(() => {
    return count * 2;
  }, [count]);

  function handleChange(v: number) {
    setCount(v);
  }

  return (
    <article className="mt-10 gap-x-4 gap-y-2 cursor-pointer rounded-lg flex md:flex-row flex-col items-center justify-between">
      <h1 className="text-base mb-0 font-semibold">
        {"Establecer número de esencia exacta a comprar"}
      </h1>

      <section className="flex items-center gap-x-7">
        <input
          type="number"
          className="py-1 outline-none border-b-2 focus:border-b-primary border-gray-300 w-full max-w-[100px] text-sm focus:border-gray-400"
          value={count}
          min={1000}
          onChange={(e) => handleChange(Number(e.target.value))}
        />

        <div className="flex flex-col text-sm">
          <p className="text-gray-400 whitespace-nowrap">{`$${price}`}</p>
          <span className=" text-green-400 whitespace-nowrap">{`-$${discount}`}</span>
        </div>

        <Button />
      </section>
    </article>
  );
}
