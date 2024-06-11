import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import Coin from '../UI/Coins/Coin'
import styles from './ThrowReact.module.css'
import Button from '../../../components/UI/Button/Button'
import NextButton from '../../../components/UI/NextButton'
import { closeThrow, postThrow } from '../../../utils/api/throwApi'
import Cookies from 'js-cookie'
import { CoinsInterpreter, types } from '../../../utils/CoinsInterprete'
import NormalThrow from '../views/NormalThrow'
import MountThrow from '../views/MountThrow'
import StandThrow from '../views/StandThrow'
import TranversalThrow from '../views/TranversalThrow'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThrowReact = ({i18}) => {

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
        //console.log(throwType)
            if(CoinsInterpreter(throwType,moneda1,moneda2)!='00'){
                setLoading(true)
                try {
                    await postThrow(Cookies.get('eons_token')||'',CoinsInterpreter(throwType,moneda1,moneda2),'dialog')
                .then((response)=>{
                    const result = response.data
                    console.log(response)
                    
                    if(result?.message == "Vuelve a tirar"){
                        console.log(lastThrow)
                        

                        // if(CoinsInterpreter(throwType,moneda1,moneda2)<='04' && lastThrow<='04'){
                            
                        // }
                        // else{
                        //     if(CoinsInterpreter(throwType,moneda1,moneda2)>='04')
                        //         toast.warning("Vuelva a lanzar las monedas para definir su tiro especial")
                        // }
                    }
                    else if(result?.message == "No puede hacer más lanzamientos especiales. Debe continuar con los lanzamientos normales."){
                        window.location.reload()
                    }
                    // else if(!result.data && result.statusCode==200){
                    //     toast.success("Lanzamiento especial resuelto, continue")
                    // }
                    else if(result?.data){
                        console.log(result)
                        const lng = Cookies.get('eons_lng') || 'en'
                        window.location.href = `${lng=='es'?'/es':''}/throw/response/${result?.data}`
                    }
                    setCount(count+1)
                    scrollToTop()
                    setLastThrow(CoinsInterpreter(throwType,moneda1,moneda2))
                    setThrowType('normal')
                    setMoneda1(0)
                    setMoneda2(0)
                })
                } catch (error) {
                    console.log(error)
                    toast.error(i18.fecth_error)
                    setLoading(false)
                }
            setLoading(false)
            }
    }

    const closeDialog = async () =>{
        try {
            setLoading(true)
           await closeThrow(Cookies.get('eons_token')||'')
           .then((response)=>{
                console.log(response)
                toast.success(i18['Throw'].dialog_close)

                setCount(1)
                setLastThrow('00')
                scrollToTop()
           })
           setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcionalmente, puedes usar 'behavior: 'auto'' si prefieres un desplazamiento sin animación
      };

    useEffect(()=>{
        setMoneda1(0)
        setMoneda2(0)
    },[throwType])

    useEffect(()=>{
        closeThrow(Cookies.get('eons_token')||'')
    },[])

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //     //   event.preventDefault();
    //     //   event.returnValue = '';
    //       console.log(event) // Esto solicita confirmación al usuario
    //       console.log('El usuario está intentando salir de la página');
    //       //closeThrow(Cookies.get('eons_token')||'')
    //     };
      
    //     window.addEventListener('beforeunload', handleBeforeUnload);
      
    //     return () => {
    //       window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    //   }, []);

    const viewController = () =>{

        switch (throwType){
            case types.normal:
                return (
                <NormalThrow
                i18={i18}
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
                i18={i18}
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectCoin={handleSelectCoin}
                handleSelectDobleCoin={handleSelectDobleCoin}
                setThrowType={setThrowType}
                />)
            case types.montado:
                return (
                <MountThrow
                i18={i18}
                throwType={throwType}
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectDobleCoin={handleSelectDobleCoin}
                />)
            case types.tranversal:
                return (
                <TranversalThrow
                i18={i18}
                loading={loading}
                moneda1={moneda1}
                setMoneda1={setMoneda1}
                moneda2={moneda2}
                setMoneda2={setMoneda2}
                handleSelectCoin={handleSelectCoin}
                setType={setThrowType}
                sendThrow={sendThrow}
                />)
            case types.parado_montado:
                return (
                    <MountThrow
                    i18={i18}
                    throwType={throwType}
                    loading={loading}
                    moneda1={moneda1}
                    setMoneda1={setMoneda1}
                    moneda2={moneda2}
                    setMoneda2={setMoneda2}
                    handleSelectDobleCoin={handleSelectDobleCoin}
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
            <div className={`throw-counter my-4`}>
                <label>{i18['Throw'].throw} {count}</label>
            </div>
            
            {viewController()}

            <div className={`flex flex-col items-center mt-8 my-4`}>
                <span>
                    {i18['Throw'].especial_throw}
                </span>
            </div>

            <div className={`flex flex-wrap gap-2 justify-center my-4`}>
                <div onClick={()=>{
                    //toast.update("Defina su tiro especial")
                    scrollToTop();
                    setThrowType('montado')
                    setMoneda1(0)
                    setMoneda2(0)
                }}>
                <Button loading={loading}>
                    {i18['Throw'].mount_throw}
                </Button>
                </div>
                <div onClick={()=>{
                    scrollToTop();
                    setThrowType('parado')
                    setMoneda1(0)
                    setMoneda2(0)
                }}>
                <Button loading={loading}>
                    {i18['Throw'].stops_throw}
                </Button>
                </div>
                <div onClick={()=>{
                    scrollToTop();
                    setThrowType('tranversal')
                    setMoneda1(0)
                    setMoneda2(0)
                }}>
                <Button loading={loading}>
                    {i18['Throw'].tranversal_throw}
                </Button>
                </div>
            </div> 
        </div>

        <div className={`flex flex-row justify-center mt-8`}>
          {/* {lastThrow!='00' && <ReloadButtonReact loading={loading} closeDialog={closeDialog}/>} */}
          <NextButton loading={loading} sendThrow={sendThrow}/>  
        </div>

        <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
        />
        
    </>
  )

//   #334155
}

export default ThrowReact
