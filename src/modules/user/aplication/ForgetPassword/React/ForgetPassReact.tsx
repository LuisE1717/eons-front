import React, { useEffect, useState, type FC } from 'react'
import OutlineInputReact from '../../../../../components/UI/input/OutlineInputReact'
import { validMail } from '../../../../../utils/validations';
import EmailConfirmation from '../../../../EmailConfirmation/EmailConfirmation.astro';
import Button from '../React/components/Button/Button';
import { postResetPass } from '../../../../../utils/api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTranslation from '../../../../Shared/hooks/useTranslation';
import Cookies from 'js-cookie';

const ForgetPassReact = () => {

    const {translation} = useTranslation()

    const [state,setState] = useState<number>(1)
    const [loading,setLoading] = useState(false)

    const [email,setEmail] = useState('')
    const [validation_mail,setValidation_mail] = useState(true)

    useEffect(()=>{
        setValidation_mail(validMail(email))
    },[email])

    const handleSubmit = async () =>{
        setLoading(true)
        if(validMail(email)){
            await postResetPass({email,lang: Cookies.get("eons_lng")||'es'})
            .then((response)=>{
              toast.success(translation.RessetPassword.succes_send_mail)
              setLoading(false)
            })
            .catch(({response})=>{
              console.log(response?.data?.message)
              if(response?.data?.message=="Email does not exist")
                toast.error(translation.RessetPassword.dont_exist_error)
              else{
                toast.error(translation.fecth_error)
              }
              
            })
        }
        setLoading(false)
    }

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
        handleSubmit={handleSubmit} 
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
