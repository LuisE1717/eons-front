import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import Coin from '../UI/Coin';
import styles from '../../../src/components/React/ThrowReact.module.css'

interface Props{
    loading:boolean;
    moneda1:number;
    setMoneda1:Dispatch<SetStateAction<number>>;
    moneda2:number;
    setMoneda2:Dispatch<SetStateAction<number>>;
    handleSelectDobleCoin:any;
    sendThrow:any
}

const MountThrow:FC<Props> = ({
    loading,
    moneda1,
    setMoneda1,
    moneda2,
    setMoneda2,
    handleSelectDobleCoin,
    sendThrow
}) => {

    console.log(moneda1)
    console.log(moneda2)

  return (
    <>
        <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    Caracterize su Lanzamiento Especial
                </span>
        </div>

      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolo cayó encima?
                </span>
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span className={styles.span}>
                    Moneda 1
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
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin
                loading={loading}
                id={2}
                svg="sun" 
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span>
                    Moneda 2
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
                <Coin id={3} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin id={4} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolo cayó debajo?
                </span>
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span className={styles.span}>
                    Moneda 1
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
                <Coin
                loading={loading}
                id={1} 
                svg="sun" 
                condition="face"
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin
                loading={loading}
                id={2}
                svg="sun" 
                condition="cross"
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span>
                    Moneda 2
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
                <Coin id={3} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin id={4} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectDobleCoin}
                />
            </div>
    </>
  )
}

export default MountThrow
