import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import Coin from '../../../modules/lanzamiento/UI/Coin'
import Button from '../UI/Button.astro'
import styles from './ThrowReact.module.css'
import ButtonReact from '../UI/ButtonReact'
import NextButton from '../UI/NextButton'
import { postThrow } from '../../utils/api/throwApi'
import Cookies from 'js-cookie'
import { CoinsInterpreter, types } from '../../utils/CoinsInterprete'
import NormalThrow from '../../../modules/lanzamiento/views/NormalThrow'
import MountThrow from '../../../modules/lanzamiento/views/MountThrow'
import StandThrow from '../../../modules/lanzamiento/views/StandThrow'
import TranversalThrow from '../../../modules/lanzamiento/views/TranversalThrow'

const ThrowReact = () => {

    const [moneda1,setMoneda1] = useState(0)
    const [moneda2,setMoneda2] = useState(0)

    const [loading,setLoading] = useState(false)
    const [count,setCount] = useState(1)

    const [throwType,setThrowType] = useState('normal')

    const handleSelectCoin = (setState:Dispatch<SetStateAction<number>>,value:number,target:number) =>{
        if(target == value)
            setState(0)
        else{
            setState(target)
        }
    }

    console.log(throwType)

    const sendThrow = async () =>{
            setLoading(true)
                try {
                    await postThrow(Cookies.get('eons_token')||'',CoinsInterpreter('normal',moneda1,moneda2),'dialog')
                .then((response)=>{
                    const user_info = response.data
                    console.log(response)
                    setCount(count+1)
                })
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            setLoading(false)
            setMoneda1(0)
            setMoneda2(0)
    }

    const viewController = () =>{

        switch (throwType){
            case types.normal:
                return (
                <NormalThrow
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectCoin={handleSelectCoin}
                />)
            case types.parado:
                return (
                <StandThrow
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectCoin={handleSelectCoin}
                />)
            case types.montado:
                return (
                <MountThrow
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectCoin={handleSelectCoin}
                />)
            case types.tranversal:
                return (<TranversalThrow/>)

            default:
                return (<></>)
        }
    }

  return (
    <>
    <div className= {`${styles.card} z-10 
        rounded-xl bg-white shadow-xl shadow-black/5 
        ring-1 ring-slate-700/10`}>
            <div className="throw-counter my-4">
                <label>lanzamiento {count}</label>
            </div>
            
            {viewController()}

            <div className="flex flex-col items-center mt-8 my-4">
                <span>
                    Lanzamiento Especial
                </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center my-4">
                <div onClick={()=>{setThrowType('montado')}}>
                <ButtonReact loading={loading} color="white" text="Cayeron montadas"/>
                </div>
                <div>
                <ButtonReact loading={loading} color="white" text="Cayeron paradas"/>
                </div>
                <div>
                <ButtonReact loading={loading} color="white" text="Cayó tranversal"/>
                </div>
            </div> 
        </div>

        <div className='flex mt-8 flex-col items-center'>
          <NextButton loading={loading} sendThrow={sendThrow}/>  
        </div>
        
    </>
  )

//   #334155
}

export default ThrowReact
