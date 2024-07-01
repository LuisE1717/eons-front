import { useEffect, useState } from "react";
import { validMail, validPass } from "../../../../../../../utils/validations";
import { setCookie } from "../../../../../../../utils/cookies/Cookies";
import { SECTIONS } from "../../../domain";
import { postLogin, singUp } from "../../../../../../../utils/api/userApi";
import { toast } from "react-toastify";
import useTranslation from "../../../../../../Shared/hooks/useTranslation";

export default function useContent() {
  const [section, setSection] = useState(SECTIONS.LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation_mail, setValidation_mail] = useState(true);
  const [validation_pass, setValidation_pass] = useState(true);

  const { translation } = useTranslation()

  useEffect(() => {
    setValidation_mail(validMail(email));
    setValidation_pass(validPass(password));
  }, [email, password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validMail(email) && validPass(password)) {
      setLoading(true);

      if (section === SECTIONS.LOGIN) {
        await postLogin({ email, password })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;

              setCookie("eons_token", user_info.accessToken, 1);
              setCookie("eons_user", user_info.email, 1);
              setCookie("eons_refresh_token", user_info.refreshToken, 7);

              if(user_info.valid)
                  window.location.href = "/services";
                else{
                  window.location.href = "auth/email-verification/" + user_info.email;
                }
            } else {
              setLoading(false);
            }
          })
          .catch(({response}) => {
            if(response.status==401)
              toast.error("translation.Auth.unauthorized")
            else{
              toast.error(translation.fecth_error)
            }
            console.log(response.status)
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        await singUp({ email, password })
          .then((response) => {
            if (response.data) {
                const user_info = response.data;

                setCookie("eons_token", user_info.accessToken, 1);
                setCookie("eons_user", user_info.email, 1);
                setCookie("eons_refresh_token", user_info.refreshToken, 7);

                if(user_info.valid)
                  window.location.href = "/services";
                else{
                  window.location.href = "auth/email-verification/" + user_info.email;
                }
            } else {
              setLoading(false);
            }
          })
          .catch((error)=>{
            console.log(error)
            if(error.status==401)
              toast.error("translation.Auth.unauthorized")
            else{
              toast.error(translation.fecth_error)
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }

  function handleChangeSection(s: SECTIONS) {
    setSection(s);
  }

  function handleChangePassword(p: string) {
    setPass(p);
  }

  function handleChangeEmail(e: string) {
    setEmail(e);
  }

  return {
    validation_mail,
    validation_pass,
    loading,
    handleSubmit,
    handleChangeSection,
    password,
    email,
    handleChangePassword,
    handleChangeEmail,
    section,
  };
}
