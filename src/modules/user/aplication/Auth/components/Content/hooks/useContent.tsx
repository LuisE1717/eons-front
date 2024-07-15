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

export default function useContent(session:Session|null) {
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

  useEffect(() =>{
    if(session){
      handleSession()
    }
  },[session])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validMail(email) && validPass(password)) {
      setLoading(true);

      if (section === SECTIONS.LOGIN) {
        await postLogin({ email, password })
          .then((response) => {
            if (response.data) {
              const user_info = response.data;
              
              setCookie("eons_user",user_info.email,0.25)
              setCookie("eons_essence",user_info.essence,0.25)
              setCookie("eons_token", user_info.accessToken, 0.25);
              setCookie("eons_refresh_token", user_info.refreshToken, 7)
              
              userProfile.set({
                email: user_info.email || '',
                valid: user_info.valid || false,
                essence: user_info.essence || 0
              });

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
            if(response?.status==401)
              toast.error("translation.Auth.unauthorized")
            else{
              toast.error(translation.fecth_error)
            }
            console.log(response?.status)
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        await singUp({ email, password })
          .then((response) => {
            if (response.data) {
                const user_info = response.data;

                setCookie("eons_user",user_info.email,0.25)
                setCookie("eons_essence",user_info.essence,0.25)
                setCookie("eons_token", user_info.accessToken, 0.25);
                setCookie("eons_refresh_token", user_info.refreshToken, 7);

                userProfile.set({
                  email: user_info.email || '',
                  valid: user_info.valid || false,
                  essence: user_info.essence || 0
                });

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

async function handleSession() {
  let token = ''
  try {
    if(session?.user?.email && session?.user?.id){
      setLoading(true)
      await singUp({email:session.user.email,password: session?.user?.id || ''})
      .then((response)=>{
        if(response.data){
          const user_info = response.data;

          setCookie("eons_user",user_info.email,0.25)
          setCookie("eons_essence",user_info.essence,0.25)
          setCookie('eons_token',response.data.accessToken,0.25)
          setCookie('eons_refresh_token',response.data.refreshToken || '',0.25)
  
          userProfile.set({
            email: user_info.email || '',
            valid: user_info.valid || false,
            essence: user_info.essence || 0
          });
  
          token=response.data.accessToken;
        }
      })
      .catch(({response})=>{
        toast.error(translation.fecth_error)
        console.log(response)
      })
      setLoading(false)
        if(token)
          window.location.href = `/services`
    }
    else{
      setLoading(false)
      Cookies.remove('eons_token')
      userProfile.set(null)
    }
  }
  catch (error) {
    console.log(error)
    toast.error(translation.fecth_error)
    setLoading(false)
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
    session
  };
}
