import React, { useEffect, useState, type FC } from 'react'
import OutlineInputReact from '../../../../../components/UI/input/OutlineInputReact'
import styles from '../../Auth/React/Auth.module.css'
import { validMail } from '../../../../../utils/validations';
import buttonStyles from '../../Auth/Components/LoginButtonReact.module.css'

interface Props {
    token?:string;
}

const ForgetPassReact:FC<Props> = ({token}) => {

    const [state,setState] = useState<number>(token?3:1)
    const [loading,setLoading] = useState(false)

    const [email,setEmail] = useState('')
    const [validation_mail,setValidation_mail] = useState(true)

    useEffect(()=>{
        setValidation_mail(validMail(email))
    },[email])

    const handleSubmit = async () =>{
        if(validMail(email)){

        }
    }

  return (
    <>
        <div className="flex flex-col items-center">
            <p>dgodijgiodsgosjdigjsdgoijdjgiosjgojsdgsdjgsdgsdgs</p>
        </div>

        <div className={`flex flex-col ${styles.inputs2}`}>
            <OutlineInputReact
            type="email"
            label="Email"
            setValue={setEmail}
            value={email}
            loading={loading}
            />
            <label className={`${validation_mail || email==''?'hidden':''} ml-5 text-lg text-red-600`}>{"invalid_email_text"}</label>
        </div>

        <div className={`flex flex-col mt-8 ${styles.inputs}`}>
            <button disabled={loading} onClick={handleSubmit} className={
                `inline-flex justify-center 
                shadow-black/5 py-1 px-4 mb-4 mt-8
                ${buttonStyles.LoginButton}
                `}
                >
                {loading &&
                <svg className="animate-spin -ml-1 mr-2 sm:mt-0 md:mt-1.5 md:h-5 md:w-5 h-4 w-4 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                }
                <span>{'Siguiente'}</span>
            </button>
        </div>
    </>
  )
}

export default ForgetPassReact
