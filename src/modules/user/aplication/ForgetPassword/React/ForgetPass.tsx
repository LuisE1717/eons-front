import React, { useEffect, useState, type FC } from 'react'
import OutlineInputReact from '../../../../../components/UI/input/OutlineInputReact'
import styles from '../../Auth/React/Auth.module.css'
import { validMail } from '../../../../../utils/validations';

interface Props {
    token?:string;
}

const ForgetPass:FC<Props> = ({token}) => {

    const [state,setState] = useState<number>(token?3:1)
    const [loading,setLoading] = useState(false)

    const [email,setEmail] = useState('')
    const [validation_mail,setValidation_mail] = useState(true)

    useEffect(()=>{
        setValidation_mail(validMail(email))
    },[email])

    const handleInput = () =>{
        if(state == 1){
            return (
                <>
                <div className={`flex flex-col ${styles.inputs}`}>
                    <OutlineInputReact 
                    loading={loading} 
                    setValue={setEmail} 
                    value={email} 
                    type={"text"} 
                    label="Email"/>
                    <label 
                    className={
                    `${validation_mail || email==''?'hidden':''} 
                    ml-5 text-lg text-red-600`}
                    >*sfafadfs</label>
                </div>
                </>
            )
        }
        else if(state == 2){
            return (
                <>
                <div className={`flex flex-col ${styles.inputs}`}>
                    <OutlineInputReact 
                    loading={loading} 
                    setValue={setEmail} 
                    value={email} 
                    type={"text"} 
                    label="Email"/>
                    <label 
                    className={
                    `${validation_mail || email==''?'hidden':''} 
                    ml-5 text-lg text-red-600`}
                    >*sfafadfs</label>
                </div>
                </>
                
            )
        }
        else if(state == 3){
            return (
                <>
                <div className={`flex flex-col ${styles.inputs}`}>
                    <OutlineInputReact 
                    loading={loading} 
                    setValue={setEmail} 
                    value={email} 
                    type={"text"} 
                    label="Email"/>
                    <label 
                    className={
                    `${validation_mail || email==''?'hidden':''} 
                    ml-5 text-lg text-red-600`}
                    >*sfafadfs</label>
                </div>
                </>
            )
        }
        else{
            return (<></>)
        }
    }

  return (
    <>
    <div className="flex flex-col items-center">
        <img 
            src={"/pixelcut-export.webp"}
            width={400} 
            height={400}
            alt="login-image"
        />
    </div>
    
    </>
  )
}

export default ForgetPass
