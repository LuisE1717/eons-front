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
    setType:Dispatch<SetStateAction<string>>;
    sendThrow:any
}

const TranversalThrow: FC<Props> = ({
    loading,
    moneda1,
    setMoneda1,
    moneda2,
    setMoneda2,
    handleSelectCoin,
    setType,
    sendThrow
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
          <ButtonReact loading={loading} color="white" text="Solo una cayó tranversal"/>
          </div>
          <div onClick={()=>{setStep(2)}}>
            <ButtonReact loading={loading} color="white" text="Ambas cayeron tranversales"/>
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
                    ¿Qué moneda no cayó tranversal?
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
        );

        case 2:
          sendThrow()
    }
      
  }

  return (
    <>
      {showStep()}
    </>
  )
}

export default TranversalThrow
