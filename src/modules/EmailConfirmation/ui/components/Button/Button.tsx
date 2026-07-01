import { useEffect, useState } from "react";
import AppButton from "@components/UI/Button/Button";
import useEmailVerification from "@modules/EmailConfirmation/application/useEmailVerification";
import { toast } from "react-toastify";
import useTranslation from "@modules/Shared/hooks/useTranslation";
interface Props {
  text: string;
  question: string;
  email:string;
}

export default function Button({ question, text, email }: Props) {
  const [disabled, setDisabled] = useState(false);
  const [pending,setPending] = useState(false)

  const { translation } = useTranslation()
  const { sendVerification } = useEmailVerification()

  useEffect(() => {
    if (disabled && !pending) {
      setTimeout(() => {
        setDisabled(false);
      }, 10000);
    }
  }, [disabled,pending]);

  useEffect(() => {
    handleClick()
  }, []);

  async function handleClick() {
    try {
      setDisabled(true);
      setPending(true)
      await sendVerification(email)
      setPending(false)
      toast.info('verifique su buzon de correo ' + '(' + email + ')')
    } catch (error) {
      setPending(false)
      if(error?.data?.message){
        if(error?.data?.message == "Email does not exist")
          toast.error(translation.Errors.Auth.email_not_found)
        else if(error?.data?.message == "This user its valid")
          toast.error(translation.Errors.Auth.user_valid)
        else{
          toast.error(translation.fecth_error);
        }
      }
      else{
        toast.error(translation.fecth_error);
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-2 text-sm text-gray-400">{question}</p>

      <AppButton loading={false} disabled={disabled} onClick={handleClick}>
        {text}
      </AppButton>
    </div>
  );
}
