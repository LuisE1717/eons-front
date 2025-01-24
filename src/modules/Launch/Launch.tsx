import React, { useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';
import {postSaveEvaluation} from '../../utils/api/evaluation';
interface CoinState {
    isFaceUp: boolean;
    isOuterCircleFilled: boolean;
}
interface LaunchProps {
    token: string;
    steps: number;
}

const Launch: React.FC<LaunchProps> = ({token, steps}) => {
    const [coinPositions, setCoinPositions] = useState<CoinState[]>([
        { isFaceUp: true, isOuterCircleFilled: false },
        { isFaceUp: true, isOuterCircleFilled: false },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleCoinFlip = (index: number) => {
        setCoinPositions((prev) =>
            prev.map((coin, i) =>
                i === index ? { ...coin, isFaceUp: !coin.isFaceUp } : coin
            )
        );
    };
    const onChange = ()=>{
        if(currentStep <= steps){
            const evaluation = JSON.parse(localStorage.getItem('evaluation') || '[]');
        
            // Crear un nuevo registro para el paso actual
            const currentData = {
                step: currentStep,
                coin1: coinPositions[0].isFaceUp,
                coin2: coinPositions[1].isFaceUp,
            };
    
            // Actualizar el historial con el nuevo paso
            const updatedEvaluation = [...evaluation, currentData];
            localStorage.setItem('evaluation', JSON.stringify(updatedEvaluation));
            setCurrentStep(currentStep + 1);
            if(currentStep === steps) handleSubmit();
        }
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const evaluation = JSON.parse(localStorage.getItem('evaluation') || '[]');
            const coinPositions = evaluation.map(step => [step.coin1, step.coin2]);
            console.log(coinPositions);
            const data = {
                type: "evaluacion-etapa1",
                shortType: "etp1",
                coinPositions,
            };
            const response = await postSaveEvaluation(token, data);
            if(response.success){
                const dat = JSON.stringify(response.data.hexResults);
                console.log(dat);
                console.log(typeof dat);
                localStorage.setItem("etp1", dat);
                
            }
            setCoinPositions([
                { isFaceUp: true, isOuterCircleFilled: false },
                { isFaceUp: true, isOuterCircleFilled: false },
            ]);
            setCurrentStep(1);
            localStorage.removeItem('evaluation');
            window.location.href = '/result';
            
        } catch (error) {
            console.error('Error sending data:', error);
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <Frame>
            <div className="launch-container">
                <h5>Que símbolos cayeron hacia arriba?</h5>
                <div className="coin-container">
                    <div className="flex flex-col items-center">
                        <Coin
                            coin={true}
                            isFaceUp={coinPositions[0].isFaceUp}
                            isOuterCircleFilled={coinPositions[0].isOuterCircleFilled}
                            onFlip={() => handleCoinFlip(0)}
                        />
                        <span className='mt-2'>Moneda 1</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Coin
                            coin={false}
                            isFaceUp={coinPositions[1].isFaceUp}
                            isOuterCircleFilled={coinPositions[1].isOuterCircleFilled}
                            onFlip={() => handleCoinFlip(1)}
                        />
                        <span className='mt-2'>Moneda 2</span>
                    </div>


                </div>
                <Stepper totalSteps={steps} onChange={onChange} currentStep={currentStep} isLoading={isLoading} />
            </div>
        </Frame>
    );
};

export default Launch;
