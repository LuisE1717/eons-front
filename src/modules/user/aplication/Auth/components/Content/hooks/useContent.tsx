import { useEffect, useState } from "react";
import { validMail, validPass } from "../../../../../../../utils/validations";
import { setCookie } from "../../../../../../../utils/cookies/Cookies";
import { SECTIONS } from "../../../domain";
import { postLogin, singUp } from "../../../../../../../utils/api/userApi";
import { toast } from "react-toastify";
import useTranslation from "../../../../../../Shared/hooks/useTranslation";
import type { Session } from "@auth/core/types";
import Cookies from "js-cookie";
import { userProfile } from "../../../../../../../UserStore";
import { authErrors } from "../../../../../../../utils/errors/authErrors";

export default function useContent(session: Session | null) {
  const [section, setSection] = useState(SECTIONS.LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation_mail, setValidation_mail] = useState(true);
  const [validation_pass, setValidation_pass] = useState(true);
  const [validation_confirm_pass, setValidation_confirm_pass] = useState(true);

  const { translation } = useTranslation();

  useEffect(() => {
    setValidation_mail(validMail(email));
    setValidation_pass(validPass(password));
    setValidation_confirm_pass( section == SECTIONS.SIGN_UP ? password === confirmPassword : true)
  }, [email, password,confirmPassword, section]);

  useEffect(() => {
    if (session) {
      handleSession();
    }
  }, [session]);

  async function handleSubmit() {
    if (validation_mail && validation_pass && validation_confirm_pass) {
      setLoading(true);

      if (section === SECTIONS.LOGIN) {
        await postLogin({ email, password })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;

              setCookie("eons_user", user_info.email, 0.25);
              setCookie("eons_essence", user_info.essence, 0.25);
              setCookie("eons_token", user_info.accessToken, 0.25);
              setCookie("eons_refresh_token", user_info.refreshToken, 7);

              userProfile.set({
                email: user_info.email || "",
                valid: user_info.valid || false,
                essence: user_info.essence || 0,
              });

              if (user_info.valid) window.location.href = "/services";
              else {
                window.location.href =
                  "auth/email-verification/" + user_info.email;
              }
            } else {
              setLoading(false);
            }
          })
          .catch(({ response }) => {
            if(response?.data?.message){
              if(response?.data?.message == "email is wrong" || response?.data?.message == "password is wrong")
                toast.error(translation.Errors.Auth.check_credentials)
              else{
                toast.error(translation.fecth_error);
              }
            }
            else{
              toast.error(translation.fecth_error);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        await singUp({ email, password, type: "mail" })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;

              setCookie("eons_user", user_info.email, 0.25);
              setCookie("eons_essence", user_info.essence, 0.25);
              setCookie("eons_token", user_info.accessToken, 0.25);
              setCookie("eons_refresh_token", user_info.refreshToken, 7);

              userProfile.set({
                email: user_info.email || "",
                valid: user_info.valid || false,
                essence: user_info.essence || 0,
              });

              if (user_info.valid) window.location.href = "/services";
              else {
                window.location.href =
                  "auth/email-verification/" + user_info.email;
              }
            } else {
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            if(error?.data?.message){
              if(error?.data?.message == "User Alredy exist")
                toast.error(translation.Errors.Auth.already_exist)
              else{
                toast.error(translation.fecth_error);
              }
            }
            else{
              toast.error(translation.fecth_error);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }

  async function handleSession() {
    let token = "";
    try {
      if (session?.user?.email && session?.user?.id) {
        setLoading(true);
        await singUp({
          email: session.user.email,
          password: session?.user?.id || "",
          type: session.user.name || "",
        })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;

              setCookie("eons_user", user_info.email, 0.25);
              setCookie("eons_essence", user_info.essence, 0.25);
              setCookie("eons_token", response.data.accessToken, 0.25);
              setCookie(
                "eons_refresh_token",
                response.data.refreshToken || "",
                0.25
              );

              userProfile.set({
                email: user_info.email || "",
                valid: user_info.valid || false,
                essence: user_info.essence || 0,
              });

              if (user_info.valid) window.location.href = "/services";
              else {
                window.location.href =
                  "auth/email-verification/" + user_info.email;
              }

              token = response.data.accessToken;
            }
          })
          .catch(({ response }) => {
            if(response?.data?.message){
              if(response?.data?.message == "User Alredy exist")
                toast.error(translation.Errors.Auth.already_exist)
              else{
                toast.error(translation.fecth_error);
              }
            }
            else{
              toast.error(translation.fecth_error);
            }
          });
        setLoading(false);
      } else {
        setLoading(false);
        Cookies.remove("eons_token");
        userProfile.set(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(translation.fecth_error);
      setLoading(false);
    }
  }

  function handleChangeSection(s: SECTIONS) {
    setSection(s);
  }

  function handleChangePassword(p: string) {
    setPass(p);
  }

  function handleChangeConfirmPassword(p: string) {
    setConfirmPassword(p);
  }

  function handleChangeEmail(e: string) {
    setEmail(e);
  }

  return {
    validation_mail,
    validation_pass,
    validation_confirm_pass,
    loading,
    handleSubmit,
    handleChangeSection,
    password,
    confirmPassword,
    email,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleChangeEmail,
    section,
    session,
  };
}
