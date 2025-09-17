import useTranslation from "../../../../../Shared/hooks/useTranslation";
import type { Essence } from "../../domain";
import Fire from "./components/Fire/Fire";

interface Props {
  essence: Essence;
  handleClick(): void;
}

function separarTexto(texto: string) {
  // Expresión regular para encontrar un número al inicio del texto
  // y luego capturar las palabras "de" y "Esencia"
  const regex = /^(\d+)(\sde\sEsencia)?$/;

  // Utilizamos el método match() para buscar coincidencias
  const resultado = texto.match(regex);

  // Si encontramos una coincidencia, extraemos las partes
  if (resultado && resultado.length > 1) {
    // El primer grupo captura el número
    const numero = resultado[1];
    // El segundo grupo captura las palabras "de" y "Esencia", si están presentes
    const resto = resultado[2] ? "de Esencia" : "";

    return {
      numero,
      resto,
    };
  }

  // Si no se encuentra ninguna coincidencia, retornamos null o un mensaje de error
  return null;
}

export default function Card({ essence, handleClick }: Props) {
  const { translation } = useTranslation();
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <article className="shadow-lg shadow-gray-300 rounded-3xl px-6 py-4 flex flex-col items-center">
        <figure className="mb-2">
          <Fire />
        </figure>

        <h2 className="font-semibold text-base mb-0.5">
          {separarTexto(essence.descripcion)?.numero +
            " " +
            translation.of_esence}
          .
        </h2>

        <span className="text-sm text-gray-400">
          {`${essence.precio}€`}{" "}
          <span className="text-green-400">
            {essence.descuento > 0 ? `(-${essence.descuento}%)` : ""}
          </span>
        </span>
      </article>
    </div>
  );
}
