import { useEffect, useState } from "react";
import { validMail, validPass } from "../../../../../../../utils/validations";
import { setCookie } from "../../../../../../../utils/cookies/Cookies";
import { SECTIONS } from "../../../domain";
import { postLogin, singUp } from "../../../../../../../utils/api/userApi";

export default function useContent() {
  const [section, setSection] = useState(SECTIONS.LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation_mail, setValidation_mail] = useState(true);
  const [validation_pass, setValidation_pass] = useState(true);

  useEffect(() => {
    setValidation_mail(validMail(email));
    setValidation_pass(validPass(password));
  }, [email, password]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validMail(email) && validPass(password)) {
      setLoading(true);

      if (section === SECTIONS.LOGIN) {
        postLogin({ email, password })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;

              setCookie("eons_token", user_info.accessToken, 1);
              setCookie("eons_user", user_info.email, 1);
              window.location.href = "/services";
            } else {
              setLoading(false);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        singUp({ email, password })
          .then((response) => {
            if (response.data) {
              postLogin({ email, password }).then((loginResponse) => {
                const user_info = loginResponse.data;

                setCookie("eons_token", user_info.accessToken, 1);
                setCookie("eons_user", user_info.email, 1);
                window.location.href = "/services";
              });
            } else {
              setLoading(false);
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
