import React, { useEffect, useState, type FC } from 'react'
import { validMail, validPass } from '../../../../../utils/validations';
import OutlineInputReact from '../../../../../components/UI/input/OutlineInputReact';
import Button from '../../ChangePassword/Button/Button';
import { postChangePass } from '../../../../../utils/api/userApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  i18:any
  token?:string;
  email?:string;
  currentLocale:string;
}

const ChangePassReact:FC<Props> = ({token,email,i18,currentLocale}) => {
  const [loading,setLoading] = useState(false)

  const [pass,setPass] = useState('')
  const [validation_pass,setValidation_pass] = useState(true)

  useEffect(()=>{
    setValidation_pass(validPass(pass))
  },[pass])

  const handleSubmit = async () =>{    
    setLoading(true)
    if(validPass(pass) && token){
      await postChangePass({token,newPassword:pass},token)
      .then(()=>{
        toast.success(i18["ChangePassword"].succes)
        setTimeout(() => {
          setLoading(false)
          window.location.href = `/auth`
        }, 3000);
      })
      .catch((error)=>{
        setLoading(false)
        toast.error(i18.fecth_error)
      })
    }
    setLoading(false)
  }

return (
  <>
<div className="flex flex-col text-center w-full mb-10">
        <OutlineInputReact
          loading={loading}
          setValue={setPass}
          value={pass}
          type={"password"}
          label={i18["ChangePassword"].label}
        />
        <label
          className={`${
            validation_pass || pass == "" ? "hidden" : ""
          } ml-5 text-lg text-red-600`}
        >
          {i18["Auth"].invalid_email_text}
        </label>
        </div>
        <Button
        loading={loading} 
        handleSubmit={handleSubmit}
        loading_text={i18["text_loading"]} 
        text={i18["ChangePassword"].send} />
        
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

export default ChangePassReact
