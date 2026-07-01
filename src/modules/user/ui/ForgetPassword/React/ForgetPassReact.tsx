import React, { useEffect, useState, type FC } from 'react'
import OutlineInputReact from '@components/UI/input/OutlineInputReact'
import { validMail } from 'src/utils/validations';
import Button from '../React/components/Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslation from '@modules/Shared/hooks/useTranslation';
import useForgetPass from '@modules/user/application/useForgetPass';

const ForgetPassReact = () => {

    const {translation} = useTranslation()

    const { loading, handleSubmit } = useForgetPass()

    const [state,setState] = useState<number>(1)

    const [email,setEmail] = useState('')
    const [validation_mail,setValidation_mail] = useState(true)

    useEffect(()=>{
        setValidation_mail(validMail(email))
    },[email])

  return (
    <>
        <div className="flex flex-col text-center w-full mb-10">
        <OutlineInputReact
          loading={loading}
          setValue={setEmail}
          value={email}
          type={"text"}
          label="Email"
        />
        <label
          className={`${
            validation_mail || email == "" ? "hidden" : ""
          } ml-5 text-lg text-red-600`}
        >
          {translation.Auth.invalid_email_text}
        </label>
        </div>
        <Button
        loading={loading}
        handleSubmit={() => handleSubmit(email)}
        text={translation.Verification.send_button}
        loading_text={translation.text_loading} 
        />

        <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
        />
    </>
  )
}

export default ForgetPassReact
