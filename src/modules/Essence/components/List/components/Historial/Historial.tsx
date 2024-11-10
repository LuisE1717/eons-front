import { useEffect, useRef, useState } from "react";
import type { TransferHistorial } from "../../domain";
import Item from "./components/Item/Item";
import { axiosI } from "../../../../../../utils/api";
import Cookies from "js-cookie";
import ChevronDownIcon from "../../../../../../components/UI/ChevronDownIcon";
import useTranslation from "../../../../../Shared/hooks/useTranslation";

interface Props {
  handleClose(): void;
}

export default function Historial({ handleClose }: Props) {
  const [historial, setHistorial] = useState<TransferHistorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { translation } = useTranslation();

  async function fetchHistorial(): Promise<TransferHistorial[]> {
    try {
      const token = Cookies.get("eons_token") || "";
      const { data } = await axiosI(token).get(
        "/transferencias"
      );
      return data;
    } catch {
      return [];
    }
  }

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
    fetchHistorial()
      .then((data) => {
        setHistorial(data);
      })
      .catch(() => {
        setHistorial([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      <section className="flex justify-end">
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
