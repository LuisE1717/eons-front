import React from 'react'
import style from './LoginButtonReact.module.css'

interface Props {
    text: string;
    bgColor?: string;
    bgHover?: string;
    color?: string;
}

const LoginButtonReact: React.FC<Props> = ({ text, bgColor = 'transparent', bgHover = '#f1f5f9', color }) => {
    return (
        <div className={
            `inline-flex justify-center 
            shadow-black/5 py-3 px-4 
            ${color? `text-${color}` : ''}
            ${style.LoginButton}
            `}
            >
            <span>{text}</span>
        </div>
    );
};

export default LoginButtonReact
