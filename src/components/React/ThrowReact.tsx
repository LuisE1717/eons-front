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

    const [lastThrow,setLastThrow] = useState('00')

    const handleSelectCoin = (setState:Dispatch<SetStateAction<number>>,value:number,target:number) =>{
        if(target == value)
            setState(0)
        else{
            setState(target)
        }
    }

    const handleSelectDobleCoin = (setState:Dispatch<SetStateAction<number>>,value:number,target:number,secondValue:number) =>{
        if(target == value)
            setState(0)
        else{
            if(target > 2){
                if(secondValue <= 2)
                    setState(target)
            }
            else if(target<=2){
                if(secondValue>2 || secondValue==0)
                    setState(target)
            }
        }
    }

    console.log(throwType)

    const sendThrow = async () =>{
            setLoading(true)
                try {
                    await postThrow(Cookies.get('eons_token')||'',CoinsInterpreter(throwType,moneda1,moneda2),'dialog')
                .then((response)=>{
                    const result = response.data
                    console.log(response)
                    
                    if(result?.message == "Vuelve a tirar"){
                        setThrowType('normal')
                        setCount(count+1)
                        setMoneda1(0)
                        setMoneda2(0)

                        if(CoinsInterpreter(throwType,moneda1,moneda2)<'04' && lastThrow<'04'){
                            setCount(count+1)
                        }

                        setLastThrow(CoinsInterpreter(throwType,moneda1,moneda2))
                    }
                    else{
                        console.log(result)
                        window.location.href = `/throw/response/${result?.data}`
                    }
                })
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            setLoading(false)
    }

    useEffect(()=>{
        setMoneda1(0)
        setMoneda2(0)
    },[throwType])

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
                lastThrow={lastThrow}
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
                handleSelectDobleCoin={handleSelectDobleCoin}
                />)
            case types.montado:
                return (
                <MountThrow
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectDobleCoin={handleSelectDobleCoin}
                sendThrow={sendThrow}
                />)
            case types.tranversal:
                return (
                <TranversalThrow
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectCoin={handleSelectCoin}
                setType={setThrowType}
                sendThrow={sendThrow}
                />)

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
                <div onClick={()=>{setThrowType('parado')}}>
                <ButtonReact loading={loading} color="white" text="Cayeron paradas"/>
                </div>
                <div onClick={()=>{setThrowType('tranversal')}}>
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
