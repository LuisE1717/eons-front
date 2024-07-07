import type { Essence } from "../../domain";
import Fire from "./components/Fire/Fire";

interface Props {
  essence: Essence;
  handleClick(): void;
}

export default function Card({ essence, handleClick }: Props) {
  return (
    <article
      onClick={handleClick}
      className="bg-white cursor-pointer rounded-lg flex items-center justify-between py-3 sm:px-7 px-5 transition-all duration-200 hover:scale-105 shadow-sm"
    >
      <section className="flex flex-col">
        <h1 className="sm:text-lg text-base mb-0 font-semibold">
          {essence.name}
        </h1>
        <span className="sm:text-base text-sm text-gray-400">{`$${essence.price}`}</span>
      </section>

      <i>
        <Fire />
      </i>
    </article>
  );
}
