import React, { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import Coin from '../UI/Coin';
import styles from '../../../src/components/React/ThrowReact.module.css'
import ButtonReact from '../../../src/components/UI/ButtonReact';

interface Props{
    loading:boolean;
    moneda1:number;
    setMoneda1:Dispatch<SetStateAction<number>>;
    moneda2:number;
    setMoneda2:Dispatch<SetStateAction<number>>;
    handleSelectCoin:any;
    handleSelectDobleCoin:any;
}

const StandThrow: FC<Props> = ({
    loading,
    moneda1,
    setMoneda1,
    moneda2,
    setMoneda2,
    handleSelectCoin,
    handleSelectDobleCoin
}) => {

  const [step,setStep] = useState(0)

  console.log(step)

  const showStep = () => {
    switch (step){
      case 0:
        return (
          <>
            <div className="flex flex-col items-center mt-8 my-4">
                    <span>
                        Como cayeron las monedas?
                    </span>
                </div>

          <div className="flex flex-wrap gap-2 justify-center my-4">
          <div onClick={()=>{setStep(1)}}>
          <ButtonReact loading={loading} color="white" text="Solo cayo una parada"/>
          </div>
          <div onClick={()=>{setStep(2)}}>
            <ButtonReact loading={loading} color="white" text="Las dos cayeron paradas"/>
          </div>
          <div onClick={()=>{setStep(3)}}>
            <ButtonReact loading={loading} color="white" text="Las dos cayeron paradas y montadas"/>
          </div>
          </div> 
        </>
        )
      case 1:
        return(
<>
      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    Caracterize su Lanzamiento Especial
                </span>
        </div>

      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolo cayó parado?
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
                handleSelect={handleSelectDobleCoin}
                />
                <Coin
                loading={loading}
                id={2}
                svg="sun" 
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span>
                    Moneda 2
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
                <Coin id={1} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin id={2} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolo cayó normal?
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
                handleSelect={handleSelectDobleCoin}
                />
                <Coin
                loading={loading}
                id={2}
                svg="sun" 
                condition="cross"
                selectedCoin={moneda1}
                setSelected={setMoneda1}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className={`flex flex-col ${styles.coin_number} my-4`}>
                <span>
                    Moneda 2
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
                <Coin id={1} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin id={2} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                handleSelect={handleSelectDobleCoin}
                />
            </div>
    </>
        );

      case 3:
        return(
          <>
      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    Caracterize su Lanzamiento Especial
                </span>
        </div>

      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolos cayeron parados?
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
                    Moneda 2
                </span>
            </div>

            <div className="flex grid-col justify-center my-4">
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
    </>
        )
        case 4:
          return (
            <>
      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    Caracterize su Lanzamiento Especial
                </span>
        </div>

      <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolo cayó delante?
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
                <Coin id={1} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
                />
                <Coin id={2} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda2}
                handleSelect={handleSelectDobleCoin}
                />
            </div>

            <div className="flex flex-col items-center my-4">
                <span className={styles.span}>
                    ¿Qué símbolo cayó detras?
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
                secondCoin={moneda1}
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
                <Coin id={1} svg="moon" condition="face"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectCoin}
                />
                <Coin id={2} svg="moon" condition="cross"
                loading={loading}
                selectedCoin={moneda2}
                setSelected={setMoneda2}
                doble
                secondCoin={moneda1}
                handleSelect={handleSelectCoin}
                />
            </div>
    </>
          )
    }
      
  }

  return (
    <>
      {showStep()}
    </>
  )
}

export default StandThrow
