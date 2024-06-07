import React, { useEffect, useState } from 'react'
import LoginButtonReact from '../Components/LoginButtonReact';
import styles from './Auth.module.css'
import OutlineInputReact from '../../../../../components/UI/input/OutlineInputReact';
import { validMail, validPass } from '../../../../../utils/validations';

interface Props {
    state:string;
    button_login:string;
    button_singUp:string;
    text_loading:string;
    login_switch:string;
    sing_up_switch:string;
    password_input_label:string;
    forget_pass:string;
    invalid_email_text:string;
    invalid_pass_text:string;
}

const AuthReact: React.FC<Props> = ({
    state,
    button_login,
    button_singUp,
    login_switch,
    sing_up_switch,
    password_input_label,
    forget_pass,
    text_loading,
    invalid_email_text,
    invalid_pass_text
}) => {

    const [section,setSection] = useState(state)

    const [email,setEmail] = useState('')
    const [password,setPass] = useState('')
    const [loading,setLoading] = useState(false)

    const [validation_mail,setValidation_mail] = useState(true)
    const [validation_pass,setValidation_pass] = useState(true)

    useEffect(()=>{
        setValidation_mail(validMail(email))
        setValidation_pass(validPass(password))
    },[email,password])

  return (
    <>
        <div className="flex flex-col items-center">
                <img 
                src={"/pixelcut-export.webp"}
                width={400} 
                height={400}
                alt="login-image"
                />
                
            <div className={`${styles.login} inline-flex justify-around
                rounded-full shadow-md shadow-black/5
                bg-white/0 hover:bg-white/25 hover:bg-slate-100`}
                style={{
                    borderColor: "#e5e5e6",
                    borderWidth: "1px",
                    borderRadius: "9999px"
                }}
                >
                <button 
                onClick={() => setSection('login')}
                className="py-1 px-5 login" 
                style={{borderColor: section=="login"?"#d161b4":"#e5e5e6",
                    borderWidth: section=="login"?"1px":"0px",
                    borderRadius: "9999px"
                }}>
                    {login_switch}
                </button>

                <button 
                onClick={() => setSection('sing-up')}
                className="py-1 px-5 login" 
                style={{borderColor: section=="sing-up"?"#d161b4":"#e5e5e6",
                    borderWidth: section=="sing-up"?"1px":"0px",
                    borderRadius: "9999px"
                }}>
                    {sing_up_switch}
                </button>
            </div>    
        </div>

        <div className={`flex flex-col ${styles.inputs}`}>
            <OutlineInputReact loading={loading} setValue={setEmail} value={email} type={"text"} label="Email"/>
            <label className={`${validation_mail || email==''?'hidden':''} ml-5 text-lg text-red-600`}>{invalid_email_text}</label>
            <OutlineInputReact loading={loading} setValue={setPass} value={password} type={"password"} label={password_input_label}/>
            <label className={`${validation_pass || password==''?'hidden':''} ml-5 text-lg text-red-600`}>{invalid_email_text}</label>
        </div>

        <div className={`flex flex-col mt-8 ${styles.inputs}`}>
            <LoginButtonReact
             text={section=="login"?
             loading?text_loading:button_login:
             loading?text_loading:button_singUp}
             email={email}
             password={password}
             setEmail={setEmail}
             setPass={setPass}
             loading={loading}
             setLoading={setLoading}
             />
        </div>  

        {section == "login" &&
            <div className="flex flex-col mt-8 items-center">
            <span
            className="text-sm"
            style={{color: "#d161b4"}}
            >
                {forget_pass}
            </span>
        </div>}   
    </>
  )
}

export default AuthReact