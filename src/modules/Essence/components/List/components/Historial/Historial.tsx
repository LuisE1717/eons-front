import React, { useEffect, useState } from "react";
import type { TransferHistorial } from "../../domain";
import Item from "./components/Item/Item";
import axios from "axios";
import { axiosI } from "../../../../../../utils/api";
import Cookies from "js-cookie";

interface Props {
  handleClose(): void;
}

export default function Historial({ handleClose }: Props) {
  const [historial, setHistorial] = useState<TransferHistorial[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHistorial(): Promise<TransferHistorial[]> {
    try {
      const { data } = await axiosI(Cookies.get("eons_token") || "").get(
        "/transferencias"
      );
      return data;
    } catch {
      return [];
    }
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
    <div className="flex flex-col w-max min-w-[600px] bg-white sm:px-14 px-8 sm:py-8 py-6 rounded-3xl shadow-lg">
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
