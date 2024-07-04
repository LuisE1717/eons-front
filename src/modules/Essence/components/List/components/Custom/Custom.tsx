import { useMemo, useState } from "react";

export default function Custom() {
  const [count, setCount] = useState(1);

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
    <article className="bg-white gap-x-4 cursor-pointer rounded-lg flex items-center justify-between py-3 sm:px-7 px-5 shadow-sm">
      <section className="flex flex-col">
        <h1 className="sm:text-lg text-base mb-0 font-semibold">
          {"Esenecias específicas"}
        </h1>
      </section>

      <section className="flex items-center gap-x-5">
        <input
          type="number"
          className="px-3 py-1 outline-none border-2 border-gray-300 rounded w-full max-w-[100px] text-sm focus:border-gray-400"
          value={count}
          min={0}
          onChange={(e) => handleChange(Number(e.target.value))}
        />

        <div className="flex flex-col">
          <p className="text-base text-gray-400 whitespace-nowrap">{`$${price}`}</p>
          <span className="text-base text-green-400 whitespace-nowrap">{`-$${discount}`}</span>
        </div>
      </section>
    </article>
  );
}
