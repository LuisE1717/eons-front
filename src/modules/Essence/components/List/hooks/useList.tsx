import { useCallback, useEffect, useState } from "react";
import { SECTION, type Transfer, type Essence } from "../domain";
import {
  getPackages,
  getTransfers,
  startPayment,
} from "../../../../../utils/api/essenceApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useTranslation from "../../../../Shared/hooks/useTranslation";

export default function useList() {
  const [list, setList] = useState<Essence[]>([
    { id: "1", descripcion: "5 Esencia", precio: 20 },
    { id: "2", descripcion: "5 Esencia", precio: 20 },
    { id: "3", descripcion: "5 Esencia", precio: 20 },
    { id: "4", descripcion: "5 Esencia", precio: 20 },
    { id: "5", descripcion: "5 Esencia", precio: 20 },
    { id: "6", descripcion: "5 Esencia", precio: 20 },
    { id: "7", descripcion: "5 Esencia", precio: 20 },
  ]);

  const [loading, setloading] = useState<boolean>(false);

  const { translation } = useTranslation();

  const [transferList, setTransferList] = useState<Transfer[]>([]);

  const fetchPackages = useCallback(async () => {
    setloading(true);

    try {
      const packs = await getPackages();
      console.log(packs);
      setList(packs.data);
    } catch (error) {
      toast.error(translation.fecth_error);
      setloading(false);
    }
  }, []);

  const fetchTranfers = useCallback(async () => {
    const token = Cookies.get("eons_token") || "";
    setloading(true);
    try {
      const transfers = await getTransfers(token);
      console.log(transfers);
      setTransferList(transfers.data);
    } catch (error) {
      toast.error(translation.fecth_error);
      setloading(false);
    }
  }, []);

  useEffect(() => {
    // fetchTranfers()
    // fetchPackages()
  }, [fetchTranfers, fetchPackages]);

  const [section, setSection] = useState<SECTION | null>(null);

  function handleChangeSection(s: SECTION): void {
    setSection(s);
  }

  async function handleClick(id: string) {
    setloading(true);
    try {
      const token = Cookies.get("eons_token") || "";
      const pay = await startPayment(token, id);
      console.log(pay);
      window.open(pay.data.shortUrl, "_blank");
    } catch (error) {
      toast.error(translation.fecth_error);
      setloading(false);
    }
  }

  return { list, handleClick, section, handleChangeSection, transferList };
}
