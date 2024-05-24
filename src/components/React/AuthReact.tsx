import React, { useState } from 'react'
import LoginButtonReact from '../UI/button/LoginButtonReact';
import styles from './Auth.module.css'
import OutlineInputReact from '../UI/input/OutlineInputReact';

interface Props {
    state:string;
    button_login:string;
    button_singUp:string;
    login_switch:string;
    sing_up_switch:string;
    password_input_label:string;
    forget_pass:string;
}

const AuthReact: React.FC<Props> = ({
    state,
    button_login,
    button_singUp,
    login_switch,
    sing_up_switch,
    password_input_label,
    forget_pass
}) => {

    const [section,setSection] = useState(state)

    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')

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
            <OutlineInputReact setValue={setEmail} value={email} type={"text"} label="Email"/>
            <OutlineInputReact setValue={setPass} value={pass} type={"password"} label={password_input_label}/>
        </div>

        <div className={`flex flex-col mt-8 ${styles.inputs}`}>
            <LoginButtonReact
             text={section=="login"?button_login:button_singUp}
             email={email}
             pass={pass}
             setEmail={setEmail}
             setPass={setPass}
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