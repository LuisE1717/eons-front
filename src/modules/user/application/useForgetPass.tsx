import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import { validMail } from "src/utils/validations";
import { postResetPass } from "@modules/user/infrastructure/userApi";

export default function useForgetPass() {
  const { translation } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email: string) => {
    setLoading(true);
    if (validMail(email)) {
      await postResetPass({ email, lang: Cookies.get("eons_lng") || "es" })
        .then((response) => {
          toast.success(translation.RessetPassword.succes_send_mail);
          setLoading(false);
        })
        .catch(({ response }) => {
          console.log(response?.data?.message);
          if (response?.data?.message == "Email does not exist")
            toast.error(translation.RessetPassword.dont_exist_error);
          else {
            toast.error(translation.fecth_error);
          }
        });
    }
    setLoading(false);
  };

  return { loading, handleSubmit };
}
