import React from 'react'

const ButtonReact = ({color,text,loading}) => {
  return (
    <div aria-disabled={loading}
  className={`inline-flex justify-center 
  text-sm font-semibold
  py-3 px-4
  text-${color?color:''}`}
  style={{color:color,backgroundColor: '#232323', borderRadius: '1.3rem', cursor:'pointer'}}
  >

    <span>
        {text}
    </span>
</div>
  )
}

export default ButtonReact
