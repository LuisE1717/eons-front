import React, { type FC } from 'react'

interface Props{
    sendThrow:any
    loading:boolean;
}

const NextButton: FC<Props> = ({sendThrow,loading}) => {
  return (
    <button disabled={loading} onClick={sendThrow} className="flex rounded-full bg-gray-200 p-6 cursor-pointer hover:bg-slate-300">
        {loading ?
            <svg width='24' height='24' className="animate-spin text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        :
        <svg fill="#000000" height="24" width="24" version="1.1" id="XMLID_287_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="next"> <g> <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 ">
            </polygon>
             </g> 
             </g> 
             </g>
        </svg>
        }
        
        
    </button>
  )
}

export default NextButton
