import { useEffect, useRef, useState } from "react";
import Item from "./components/Item/Item";
import ChevronDownIcon from "@components/UI/ChevronDownIcon";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import useHistorial from "@modules/Essence/application/useHistorial";

interface Props {
  handleClose(): void;
}

export default function Historial({ handleClose }: Props) {
  const { historial, loading } = useHistorial();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { translation } = useTranslation();

  const checkIfAtBottom = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isBottom = 
        Math.abs(
          container.scrollHeight - container.scrollTop - container.clientHeight
        ) < 1;
      setIsAtBottom(isBottom);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkIfAtBottom);
      // Verificamos la posición inicial
      checkIfAtBottom();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkIfAtBottom);
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full sm:min-w-[600px] bg-white sm:px-14 px-8 sm:py-8 py-6 rounded-3xl shadow-lg">
      <section className="flex justify-end mb-4">
        <button type="button" onClick={handleClose}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8L40 40"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 40L40 8"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      {/* Mensaje de "No hay transferencias" */}
      {historial.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-4">{translation.Esence.historial_empty}</p>
      )}

      {/* Lista de transferencias */}
      <div ref={scrollContainerRef} className="flex flex-col gap-y-3.5 max-h-[300px] overflow-y-auto">
        {historial.map((h) => (
          <div key={h.id} className="w-full">
            <Item item={h} />
          </div>
        ))}
      </div>

      {/* Flecha hacia abajo si hay más de 3 transferencias */}
      {historial.length > 3  && (
        <div className="flex justify-center mt-4">
          <ChevronDownIcon size={24} isOpen={isAtBottom} />
        </div>
      )}
    </div>
  );
}
