import React, { type Dispatch, type SetStateAction } from 'react'
import style from './LoginButtonReact.module.css'
import {intanceAxios} from '../../../../../src/utils/api/index'
import { postLogin, singUp } from '../../../../../src/utils/api/userApi';
import Cookies from 'js-cookie'
import { validMail, validPass } from '../../../../../src/utils/validations';
import { setCookie } from '../../../../../src/utils/cookies/Cookies';

interface Props {
    text: string;
    bgColor?: string;
    bgHover?: string;
    color?: string;
    email:string;
    setEmail: Dispatch<SetStateAction<string>>;
    password:string;
    setPass: Dispatch<SetStateAction<string>>;
    loading:boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoginButtonReact: React.FC<Props> = ({ 
    text, 
    bgColor = 'transparent', 
    bgHover = '#f1f5f9',
    email,
    setEmail,
    password,
    setPass,
    color,
    loading,
    setLoading
}) => {

    const handleSubmit = async () =>{
        if(validMail(email) && validPass(password)){
            setLoading(true)
            if(text=="Start" || text=="Iniciar"){
                try {
                    await postLogin({email,password})
                .then((response)=>{
                    if(response.data){
                        const user_info = response.data
                        console.log(response)

                        setCookie('eons_token',user_info.token,1)
                        setCookie('eons_user',user_info.email,1)
                        window.location.href = '/'
                    }
                })
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
            else {
                try {
                    await singUp({email,password})
                .then(async (response) => {
                    if(response.data){
                        await postLogin({email,password})
                        .then((loginResponse)=>{
                            const user_info = loginResponse.data
                            console.log('entra en submit')
    
                            setCookie('eons_token',user_info.token,1)
                            setCookie('eons_user',user_info.email,1)
                            window.location.href = '/'
                        })
                    }
                })
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
            setLoading(false)
            setEmail('')
            setPass('')
        }
    }
    
    return (
        <button disabled={loading} onClick={handleSubmit} className={
            `inline-flex justify-center 
            shadow-black/5 py-1 px-4 
            ${color? `text-${color}` : ''}
            ${style.LoginButton}
            `}
            >
            {loading &&
            <svg className="animate-spin -ml-1 mr-2 sm:mt-0 md:mt-1.5 md:h-5 md:w-5 h-4 w-4 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            }
            <span>{text}</span>
        </button>
    );
};

export default LoginButtonReact
