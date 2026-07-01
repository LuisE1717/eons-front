import { useCallback } from "react";
import Cookies from "js-cookie";
import { patchNotification } from "@modules/user/infrastructure/userApi";

export default function useMarkAsRead() {
  const markAsRead = useCallback((id: number) => {
    patchNotification(Cookies.get("eons_token") || "", {
      id,
      state: true,
    });
  }, []);

  return { markAsRead };
}
