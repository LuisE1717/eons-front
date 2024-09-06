import React, { useEffect, useState } from "react";
import type { TransferHistorial } from "../../domain";
import Item from "./components/Item/Item";

interface Props {
  handleClose(): void;
}

export default function Historial({ handleClose }: Props) {
  const [historial, setHistorial] = useState<TransferHistorial[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHistorial(): Promise<TransferHistorial[]> {
    return [
      {
        id: 1,
        fecha: new Date(),
        recibido: false,
        cantidad: 4,
        usuario: "Fulano",
      },
      {
        id: 2,
        fecha: new Date(),
        recibido: true,
        cantidad: 20,
        usuario: "Fulano",
      },
      {
        id: 3,
        fecha: new Date(),
        recibido: false,
        cantidad: 10,
        usuario: "Fulano",
      },
    ];
  }

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

  return (
    <div className="flex flex-col w-full max-w-[600px] bg-white sm:px-14 px-8 sm:py-8 py-6 rounded-2xl shadow-lg">
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
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 40L40 8"
              stroke="#000000"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </section>

      <div className="flex flex-col gap-y-3.5">
        {historial.map((h) => (
          <Item key={h.id} item={h} />
        ))}
      </div>
    </div>
  );
}
