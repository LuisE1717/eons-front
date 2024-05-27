import React, { type Dispatch, type FC, type SetStateAction } from 'react'

interface Props{
    loading:boolean;
    moneda1:number;
    setMoneda1:Dispatch<SetStateAction<number>>;
    moneda2:number;
    setMoneda2:Dispatch<SetStateAction<number>>;
    handleSelectCoin:any;
}

const StandThrow: FC<Props> = ({
    loading,
    moneda1,
    setMoneda1,
    moneda2,
    setMoneda2,
    handleSelectCoin
}) => {
  return (
    <div>
      
    </div>
  )
}

export default StandThrow
