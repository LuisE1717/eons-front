import React, { useEffect, useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';
import {postSaveEvaluation} from '../../utils/api/evaluation';
import { toast } from 'react-toastify';

interface CoinState {
    isFaceUp: boolean;
    isOuterCircleFilled: boolean;
}

interface LaunchProps {
    token: string;
    steps: number;
    type: string;
}

const Launch: React.FC<LaunchProps> = ({token, steps, type}) => {
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

    const onChange = () => {
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
            console.log(type);
            const data = {
                type: type === "etp1" ? "evaluacion-etapa1" : "evaluacion-etapa2",
                shortType: type,
                coinPositions,
            };
            const response = await postSaveEvaluation(token, data);
            if(response.success){
                const dat = JSON.stringify(response.data.hexResults);
                console.log(dat);
                console.log(typeof dat);
                localStorage.setItem(type, dat);
                
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

    const handleSaveDialog = () => {
        // Lógica para guardar preguntas y respuestas
        console.log("Guardar preguntas y respuestas");
        toast.info("Funcionalidad de guardar preguntas y respuestas pronto disponible");
    };

    return (
        <Frame>
            {/* Icono de grimorio en la parte superior derecha */}
            <div className="absolute top-4 right-4 z-10">
                <button 
                    onClick={handleSaveDialog}
                    className="p-2 rounded-full bg-purple-800 hover:bg-purple-700 transition-colors shadow-lg"
                    aria-label="Guardar preguntas y respuestas"
                    title="Guardar diálogo"
                >
                    {/* Icono de grimorio/libro mágico */}
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                    >
                        <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div className="launch-container">
                <h5 className="text-xl font-bold mb-4 text-center">Que símbolos cayeron hacia arriba?</h5>
                <div className="coin-container flex justify-center space-x-8 mb-6">
                    <div className="flex flex-col items-center">
                        <Coin
                            coin={true}
                            isFaceUp={coinPositions[0].isFaceUp}
                            isOuterCircleFilled={coinPositions[0].isOuterCircleFilled}
                            onFlip={() => handleCoinFlip(0)}
                        />
                        <span className='mt-2 text-sm'>Moneda 1</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Coin
                            coin={false}
                            isFaceUp={coinPositions[1].isFaceUp}
                            isOuterCircleFilled={coinPositions[1].isOuterCircleFilled}
                            onFlip={() => handleCoinFlip(1)}
                        />
                        <span className='mt-2 text-sm'>Moneda 2</span>
                    </div>
                </div>
                <Stepper totalSteps={steps} onChange={onChange} currentStep={currentStep} isLoading={isLoading} />
            </div>
        </Frame>
    );
};

export default Launch;