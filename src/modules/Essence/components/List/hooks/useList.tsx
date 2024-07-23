import { useCallback, useEffect, useState } from "react";
import { SECTION, type Transfer, type Essence, type Price } from "../domain";
import {
  calculatePrice,
  getPackages,
  getTransfers,
  startCustomPayment,
  startPayment,
} from "../../../../../utils/api/essenceApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useTranslation from "../../../../Shared/hooks/useTranslation";

export default function useList() {
  const [list, setList] = useState<Essence[]>([]);

  const [price, setPrice] = useState<Price | null>(null);

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
    fetchPackages();
  }, [fetchPackages]);

  const [section, setSection] = useState<SECTION | null>(null);

  function handleChangeSection(s: SECTION): void {
    setSection(s);
  }

  function handleClose() {
    setSection(null);
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

  async function handleCustomPayment() {
    if (price) {
      setloading(true);
      try {
        const token = Cookies.get("eons_token") || "";
        const datah = {
          esencia: price?.esencia,
          precio: price?.costo,
        };
        const pay = await startCustomPayment(token, datah);
        console.log(pay);
        window.open(pay.data.shortUrl, "_blank");
      } catch (error) {
        toast.error(translation.fecth_error);
        setloading(false);
      }
    }
  }

  async function findCost(esencia: number) {
    setloading(true);
    try {
      const response = await calculatePrice(esencia);
      if (response.data) {
        setPrice(response.data);
      }
    } catch (error) {
      toast.error(translation.fecth_error);
      setloading(false);
    }
  }

  return {
    list,
    handleClick,
    section,
    handleChangeSection,
    transferList,
    price,
    findCost,
    handleCustomPayment,
    handleClose,
  };
}
