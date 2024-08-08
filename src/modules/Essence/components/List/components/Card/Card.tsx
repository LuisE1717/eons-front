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
      className="shadow-lg shadow-gray-300 rounded-3xl px-6 py-4 flex flex-col items-center"
    >
      <figure className="mb-2">
        <Fire />
      </figure>

      <h2 className="font-semibold text-base mb-0.5">{essence.descripcion}.</h2>

      <span className="text-sm text-gray-400">
        {`${essence.precio}€`}{" "}
        <span className="text-green-400">{essence.descuento > 0?`(-${essence.descuento}%)`:''}</span>
      </span>
    </article>
  );
}
