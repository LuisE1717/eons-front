import React, { type Dispatch, type FC, type SetStateAction } from 'react'

interface Props{
  color:string;
  text:string;
  loading:boolean;
}

const ButtonReact:FC<Props> = ({color,text,loading}) => {
  return (
    <button
    disabled={loading}
  className={`inline-flex justify-center 
  text-sm font-semibold
  py-3 px-4
  text-${color?color:''}`}
  style={{color:color,backgroundColor: '#232323', borderRadius: '1.3rem', cursor:'pointer'}}
  >

    <span>
        {text}
    </span>
</button>
  )
}

export default ButtonReact
