import React, { type Dispatch, type SetStateAction } from 'react'
import style from './LoginButtonReact.module.css'
import {intanceAxios} from '../../../utils/api/index'
import { postLogin } from '../../../utils/api/userApi';

interface Props {
    text: string;
    bgColor?: string;
    bgHover?: string;
    color?: string;
    email:string;
    setEmail: Dispatch<SetStateAction<string>>;
    pass:string;
    setPass: Dispatch<SetStateAction<string>>;
}

const LoginButtonReact: React.FC<Props> = ({ 
    text, 
    bgColor = 'transparent', 
    bgHover = '#f1f5f9',
    email,
    setEmail,
    pass,
    setPass,
    color 
}) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async () =>{

        try {
            await postLogin({email,pass})
        .then((response)=>{
            if(response.data){
                console.log(response)
            }
        })
        } catch (error) {
            console.log(error)
        }
        
        

        setEmail('')
        setPass('')
    }
    
    return (
        <button onClick={handleSubmit} className={
            `inline-flex justify-center 
            shadow-black/5 py-1 px-4 
            ${color? `text-${color}` : ''}
            ${style.LoginButton}
            `}
            >
            <span>{text}</span>
        </button>
    );
};

export default LoginButtonReact
