import Cookies from "js-cookie";
import { getValidateMail, sendVerificationMail } from "@modules/user/infrastructure/userApi";

export default function useEmailVerification() {
  function sendVerification(email: string) {
    return sendVerificationMail(email, Cookies.get("eons_lng") || "es");
  }

  return { sendVerification, getValidateMail };
}
