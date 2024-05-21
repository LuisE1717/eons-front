import React, { useState } from 'react'
import LoginButtonReact from '../UI/button/LoginButtonReact';
import styles from './Auth.module.css'
import OutlineInputReact from '../UI/input/OutlineInputReact';

interface Props {
    state:string;
}

const Auth: React.FC<Props> = ({
    state,
}) => {

    const [section,setSection] = useState(state)

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
                    Iniciar Sessión
                </button>

                <button 
                onClick={() => setSection('sing-up')}
                className="py-1 px-5 login" 
                style={{borderColor: section=="sing-up"?"#d161b4":"#e5e5e6",
                    borderWidth: section=="sing-up"?"1px":"0px",
                    borderRadius: "9999px"
                }}>
                    Crear Cuenta
                </button>
            </div>    
        </div>

        <div className={`flex flex-col ${styles.inputs}`}>
            <OutlineInputReact type={"text"} label="Email"/>
            <OutlineInputReact type={"password"} label="Contraseña"/>
        </div>

        <div className={`flex flex-col mt-8 ${styles.inputs}`}>
            <LoginButtonReact text={section=="login"?"Inciar":"Crear"}/>
        </div>  

        {section == "login" &&
            <div className="flex flex-col mt-8 items-center">
            <span
            className="text-sm"
            style={{color: "#d161b4"}}
            >
                Haz olvidado la contraseña?
            </span>
        </div>}   
    </>
  )
}

export default Auth