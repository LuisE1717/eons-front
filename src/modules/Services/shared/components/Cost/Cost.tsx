import React from 'react'

export default function Cost ({
  name,
  amount,
  cost,
  onclick,
}: {
  name: string;
  amount:string;
  cost?: string;
  onclick?: () => void;
}) {
  return (
    <div 
      onClick={onclick}
      className="
      w-full sm:text-[1rem]
      text-sm sm:mb-5 mb-3.5 md:px-6 !leading-8 
      hover:text-primary cursor-pointer items-center">
      <span className="">{name}</span>
      <div className='flex'>
      (
        <span className="">{amount}</span>
        <img src="/fire.webp" alt="fire" className="object-contain w-[30px]" />
        <span className="">{cost}</span>
      ).
      </div>
    </div>
  )
}
