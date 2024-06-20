import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import Coin from '../components/Coin'
import styles from '../aplication/OpenDialog/OpenDialog.module.css'

interface Props{
    loading:boolean;
    moneda1:number;
    setMoneda1:Dispatch<SetStateAction<number>>;
    moneda2:number;
    setMoneda2:Dispatch<SetStateAction<number>>;
    handleSelectCoin:any;
    lastThrow:string;
    i18:any
}

const NormalThrow: FC<Props> = ({
    loading,
    moneda1,
    setMoneda1,
    moneda2,
    setMoneda2,
    handleSelectCoin,
    lastThrow,
    i18
}) => {
  return (
    <>
    <div className="flex flex-col items-center my-4">
                {/* {lastThrow>'04' && 
                <span className={styles.span}>
                    Lance las monedas para definir su lanzamiento especial
                </span>} */}

                <span className={styles.span}>
                    {i18["Throw"].question}
                </span>
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span className={styles.span}>
                {i18["Throw"].coin1}
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
                <Coin
                loading={loading}
                id={1} 
                svg="sun" 
                condition="face"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
                />
                <Coin
                loading={loading}
                id={2}
                svg="sun" 
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectCoin}
                />
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span>
                {i18["Throw"].coin2}
                </span>
            </div>

            <div className={`flex grid-col justify-center my-4`} >
                <Coin id={1} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectCoin}
                />
                <Coin id={2} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectCoin}
                />
            </div>


    {/* <div className="flex flex-col items-center mt-8 my-4">
                <span>
                    Lanzamiento Especial
                </span>
            </div>

    <div className="flex flex-wrap gap-2 justify-center my-4">
        <ButtonReact loading={loading} color="white" text="Cayeron montadas"/>
        <ButtonReact loading={loading} color="white" text="Cayeron paradas"/>
        <ButtonReact loading={loading} color="white" text="Cayó tranversal"/>
    </div>    */}
    </>
  )
}

export default NormalThrow