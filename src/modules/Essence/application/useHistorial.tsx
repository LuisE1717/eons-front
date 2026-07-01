import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import type { TransferHistorial } from "@modules/Essence/domain";
import { getTransfers } from "@modules/Essence/infrastructure/essenceApi";

export default function useHistorial() {
  const [historial, setHistorial] = useState<TransferHistorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("eons_token") || "";
    getTransfers(token)
      .then(({ data }) => {
        setHistorial(data);
      })
      .catch(() => {
        setHistorial([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { historial, loading };
}
