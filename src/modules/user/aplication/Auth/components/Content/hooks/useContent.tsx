import { useEffect, useState } from "react";
import { validMail, validPass } from "../../../../../../../utils/validations";
import { setCookie } from "../../../../../../../utils/cookies/Cookies";
import { SECTIONS } from "../../../domain";
import { postLogin, singUp, googleLogin, googleRegister, microsoftLogin } from "../../../../../../../utils/api/userApi";
import { toast } from "react-toastify";
import useTranslation from "../../../../../../Shared/hooks/useTranslation";
import type { Session } from "@auth/core/types";
import { userProfile } from "../../../../../../../UserStore";

export default function useContent(session: Session | null) {
  const [section, setSection] = useState(SECTIONS.LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation states
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

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
  }, [session, section]);

  async function handleSubmit() {
    if (validation_mail && validation_pass && validation_confirm_pass) {
      setLoading(true);

      if (section === SECTIONS.LOGIN) {
        await postLogin({ email, password })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;

              setCookie("eons_user", user_info.email, 7);
              setCookie("eons_essence", user_info.essence, 7);
              setCookie("eons_token", user_info.accessToken, 7);
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

              setCookie("eons_user", user_info.email, 7);
              setCookie("eons_essence", user_info.essence, 7);
              setCookie("eons_token", user_info.accessToken, 7);
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
    if (!session?.user?.email || !session?.user?.id || !session?.user?.name) {
      toast.error(translation.fecth_error);
      return;
    }

    setLoading(true);

    const { email, id: password, name: type } = session.user;

    try {
      let response;

      // Distinguish between login and register based on current section
      if (type === "google") {
        if (section === SECTIONS.LOGIN) {
          // Google Login - only login, error if user doesn't exist
          response = await googleLogin({ email, password, type });
        } else {
          // Google Register - only register
          response = await googleRegister({ email, password, type });
        }
      } else if (type === "azure-ad") {
        if (section === SECTIONS.LOGIN) {
          // Microsoft Login - only login, error if user doesn't exist
          response = await microsoftLogin({ email, password, type });
        } else {
          // Microsoft Register - TODO: implement when needed
          toast.error("Microsoft register not yet implemented");
          setLoading(false);
          return;
        }
      } else {
        toast.error("Unknown provider");
        setLoading(false);
        return;
      }

      if (response.data) {
        const user_info = response.data;

        setCookie("eons_user", user_info.email, 7);
        setCookie("eons_essence", user_info.essence, 7);
        setCookie("eons_token", user_info.accessToken, 7);
        setCookie("eons_refresh_token", user_info.refreshToken, 7);

        userProfile.set({
          email: user_info.email || "",
          valid: user_info.valid || false,
          essence: user_info.essence || 0,
        });

        // Go directly to services - social login already verified email
        window.location.href = "/services";
      }
    } catch (error: any) {
      // Handle specific error messages
      if (error?.response?.data?.message) {
        if (error.response.data.message === "Usuario no existe") {
          toast.error(translation?.Errors?.Auth?.user_not_found || "Usuario no existe");
        } else if (error.response.data.message === "El usuario ya existe") {
          toast.error(translation?.Errors?.Auth?.already_exist || "El usuario ya existe");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(translation.fecth_error);
      }
    } finally {
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
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    confirmPasswordTouched,
    setConfirmPasswordTouched
  };
}