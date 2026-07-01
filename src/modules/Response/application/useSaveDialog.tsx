import { postSaveDialog } from "@modules/Dialogs/infrastructure/dialogApi";
import Cookies from "js-cookie";

export default function useSaveDialog() {
  const saveDialog = (datah: any) =>
    postSaveDialog(Cookies.get("eons_token") || "", datah);

  return { saveDialog };
}
