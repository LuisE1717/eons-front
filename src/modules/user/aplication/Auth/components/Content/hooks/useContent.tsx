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
  }, [session]);

  // Función para redirigir a verificación de email
  const redirectToEmailVerification = (email: string, message?: string) => {
    console.log('🔐 Redirecting to email verification for:', email);
    
    // Guardar datos en localStorage para la página de verificación
    if (typeof window !== 'undefined') {
      localStorage.setItem('verification_email', email);
      localStorage.setItem('verification_required', 'true');
      localStorage.setItem('verification_message', message || 'Please verify your email address');
      
      // Redirigir a la página de verificación de email
      const verificationUrl = `/auth/email-verification/${email}`;
      window.location.href = verificationUrl;
    }
  };

  // Función para manejar redirección desde la respuesta de la API
  const handleApiRedirect = (response: any) => {
    if (response.requiresVerification && response.redirectTo) {
      console.log('🔐 API requires verification, redirecting to:', response.redirectTo);
      
      // Usar la URL proporcionada por el backend
      if (typeof window !== 'undefined') {
        window.location.href = response.redirectTo;
      }
      return true;
    }
    return false;
  };

  async function handleSubmit() {
    if (validation_mail && validation_pass && validation_confirm_pass) {
      setLoading(true);

      try {
        let response;

        if (section === SECTIONS.LOGIN) {
          // 🔄 INTENTAR LOGIN
          response = await postLogin({ email, password });
          
          // Manejar redirección a verificación
          if (handleApiRedirect(response)) {
            setLoading(false);
            return;
          }

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

            if (user_info.valid) {
              if (typeof window !== 'undefined') {
                window.location.href = "/services";
              }
            } else {
              redirectToEmailVerification(user_info.email, 'Please verify your email address to continue');
            }
          } else {
            // 🔄 FALLBACK: REDIRIGIR A VERIFICACIÓN SI EL LOGIN FALLA
            console.log('🔐 Login failed, redirecting to verification');
            redirectToEmailVerification(email, 'Please verify your email address to continue');
          }
        } else {
          // 🔄 REGISTRO
          response = await singUp({ email, password, type: "mail" });
          
          // Manejar redirección a verificación
          if (handleApiRedirect(response)) {
            setLoading(false);
            return;
          }

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

            if (user_info.valid) {
              if (typeof window !== 'undefined') {
                window.location.href = "/services";
              }
            } else {
              redirectToEmailVerification(user_info.email, 'Registration successful. Please verify your email address.');
            }
          } else {
            // 🔄 FALLBACK: REDIRIGIR A VERIFICACIÓN SI EL REGISTRO FALLA
            console.log('🔐 Registration failed, redirecting to verification');
            redirectToEmailVerification(email, 'Registration successful. Please verify your email address.');
          }
        }
      } catch (error: any) {
        console.error("Auth error:", error);
        
        // 🔄 MANEJO ROBUSTO DE ERRORES - SIEMPRE REDIRIGIR A VERIFICACIÓN
        if (error.response?.status === 401 || error.response?.status === 400 || error.response?.status === 409) {
          const errorMessage = error.response?.data?.message || 'An error occurred. Please verify your email address.';
          
          // Mostrar mensaje de error específico
          if (errorMessage.includes('already exists') || errorMessage.includes('ya existe')) {
            toast.info('An account with this email already exists. Please verify your email address.');
          } else {
            toast.info(errorMessage);
          }
          
          // 🔄 REDIRECCIÓN AUTOMÁTICA A VERIFICACIÓN EN CASO DE ERROR
          redirectToEmailVerification(email, errorMessage);
        } else {
          // Error de conexión u otro error
          toast.error(translation.fecth_error);
          
          // 🔄 REDIRECCIÓN DE FALLBACK A VERIFICACIÓN
          setTimeout(() => {
            redirectToEmailVerification(email, 'Connection error. Please verify your email address.');
          }, 2000);
        }
      } finally {
        setLoading(false);
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

              if (user_info.valid && typeof window !== 'undefined') {
                window.location.href = "/services";
              } else if (typeof window !== 'undefined') {
                window.location.href = `/auth/email-verification/${user_info.email}`;
              }

              token = response.data.accessToken;
            }
          })
          .catch(({ response }) => {
            if(response?.data?.message){
              if(response?.data?.message == "User Alredy exist") {
                toast.error(translation.Errors.Auth.already_exist);
                // Redirigir a verificación
                if (session?.user?.email && typeof window !== 'undefined') {
                  window.location.href = `/auth/email-verification/${session.user.email}`;
                }
              }
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
    emailTouched,
    setEmailTouched,
    passwordTouched,
    setPasswordTouched,
    confirmPasswordTouched,
    setConfirmPasswordTouched
  };
}