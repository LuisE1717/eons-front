import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import Cookies from "js-cookie";
import { getAllSpirits } from "../../../../../utils/api/spiritsApi";
import { toast } from "react-toastify";
import useTranslation from "../../../../Shared/hooks/useTranslation";
import { getAllDialogs } from "../../../../../utils/api/dialogApi";
import type { Dialog } from "../../../interfaces";

export default function useGetAllDialogs(
  control: boolean,
  setControl: Dispatch<SetStateAction<boolean>>,
  type: string
) {
  const { translation } = useTranslation();

  const [loading, setloading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<Dialog[]>([]);
  const [total_pages, setTotal_pages] = useState<number>();

  const fetchDialogs = useCallback(async () => {
    if (control) {
      const token = Cookies.get("eons_token") || "";
      setloading(true);
      try {
        const spirits = await getAllDialogs(token, type);
        setData(spirits.data);
      } catch (error) {
        toast.error(translation.fecth_error);
        setError(error);
        setloading(false);
      }
      setControl(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [control]);

  useEffect(() => {
    fetchDialogs();
  }, [fetchDialogs]);

  return {
    loading: loading,
    error: error,
    data: data,
    total_pages: total_pages,
  };
}
