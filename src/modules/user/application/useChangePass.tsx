import { useEffect, useState } from "react";
import { validPass } from "src/utils/validations";
import { postChangePass } from "@modules/user/infrastructure/userApi";
import { toast } from "react-toastify";
import useTranslation from "@modules/Shared/hooks/useTranslation";

export default function useChangePass({
    token,
    email
}) {

  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validation_mail] = useState(true);
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
