import { useEffect, useState } from "react";
import { validMail, validPass } from "src/utils/validations";
import { setCookie } from "src/utils/cookies/Cookies";
import { SECTIONS } from "@modules/user/domain/sections";
import { postChangePass, postLogin, singUp } from "@modules/user/infrastructure/userApi";
import { toast } from "react-toastify";
import useTranslation from "@modules/Shared/hooks/useTranslation";
import type { Session } from "@auth/core/types";
import Cookies from "js-cookie";
import { userProfile } from "src/UserStore";
import { authErrors } from "src/utils/errors/authErrors";

interface Props {
    token?:string;
    email?:string;
}

export default function useChangePass({
    token,
    email
}) {

  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation_mail, setValidation_mail] = useState(true);
  const [validation_pass, setValidation_pass] = useState(true);
  const [validation_confirm_pass, setValidation_confirm_pass] = useState(true);

  const {translation} = useTranslation()

  useEffect(() => {
    setValidation_pass(validPass(password));
    setValidation_confirm_pass(password === confirmPassword)
  }, [password,confirmPassword]);

  const handleSubmit = async () =>{    
    setLoading(true)
    if(validation_pass && validation_confirm_pass){
      await postChangePass({newPassword:password},token)
      .then(()=>{
        toast.success(translation["ChangePassword"].succes)
        setTimeout(() => {
          setLoading(false)
          window.location.href = `/auth`
        }, 3000);
      })
      .catch((error)=>{
        setLoading(false)
        toast.error(translation.fecth_error)
      })
    }
    setLoading(false)
  }

  function handleChangePassword(p: string) {
    setPass(p);
  }

  function handleChangeConfirmPassword(p: string) {
    setConfirmPassword(p);
  }

  return {
    validation_mail,
    validation_pass,
    validation_confirm_pass,
    loading,
    handleSubmit,
    password,
    confirmPassword,
    handleChangePassword,
    handleChangeConfirmPassword
  };
}
