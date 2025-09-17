import React, { useEffect, useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';
import { postSaveEvaluation } from '../../utils/api/evaluation';

interface CoinState {
  isFaceUp: boolean;
  isOuterCircleFilled: boolean;
}

interface LaunchProps {
  token: string;
  steps: number;
  type: string;
}

const Launch: React.FC<LaunchProps> = ({ token, steps, type }) => {
  const [coinPositions, setCoinPositions] = useState<CoinState[]>([
    { isFaceUp: true, isOuterCircleFilled: false },
    { isFaceUp: true, isOuterCircleFilled: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [evaluationHistory, setEvaluationHistory] = useState<any[]>([]);

  const handleCoinFlip = (index: number) => {
    setCoinPositions((prev) =>
      prev.map((coin, i) =>
        i === index ? { ...coin, isFaceUp: !coin.isFaceUp } : coin
      )
    );
  };

  const onChange = () => {
    if (currentStep <= steps) {
      const currentData = {
        step: currentStep,
        coin1: coinPositions[0].isFaceUp,
        coin2: coinPositions[1].isFaceUp,
      };

      const updatedEvaluation = [...evaluationHistory, currentData];
      setEvaluationHistory(updatedEvaluation);
      setCurrentStep(currentStep + 1);

      // Resetear monedas para el próximo lanzamiento
      setCoinPositions([
        { isFaceUp: Math.random() > 0.5, isOuterCircleFilled: false },
        { isFaceUp: Math.random() > 0.5, isOuterCircleFilled: false },
      ]);

      if (currentStep === steps) {
        handleSubmit(updatedEvaluation);
      }
    }
  };

  const handleSubmit = async (evaluationData: any[]) => {
    try {
      setIsLoading(true);

      const coinPositionsForBackend = evaluationData.map(step => [step.coin1, step.coin2]);

      const data = {
        type: type === "etp1" ? "evaluacion-etapa1" : "evaluacion-etapa2",
        shortType: type,
        coinPositions: coinPositionsForBackend,
      };

      const response = await postSaveEvaluation(token, data);

      if (response.success && response.data) {
        // Guardar en localStorage para acceso inmediato
        localStorage.setItem(`resultados_${type}`, JSON.stringify(response.data));
        
        // Redirigir a la vista de resultados
        window.location.href = `/resultados?type=${type}&id=${response.data.id}`;
      } else {
        console.error('Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Inicializar monedas aleatoriamente
    setCoinPositions([
      { isFaceUp: Math.random() > 0.5, isOuterCircleFilled: false },
      { isFaceUp: Math.random() > 0.5, isOuterCircleFilled: false },
    ]);
  }, []);

  return (
    <Frame>
      <div className="launch-container text-center">
        <h5 className='mb-20 text-white text-xl font-bold'>¿Qué símbolos cayeron hacia arriba?</h5>
        
        <div className="coin-container flex justify-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <Coin
              coin={true}
              isFaceUp={coinPositions[0].isFaceUp}
              isOuterCircleFilled={coinPositions[0].isOuterCircleFilled}
              onFlip={() => handleCoinFlip(0)}
            />
            <span className='mt-2 text-white'>Moneda 1</span>
          </div>
          <div className="flex flex-col items-center">
            <Coin
              coin={false}
              isFaceUp={coinPositions[1].isFaceUp}
              isOuterCircleFilled={coinPositions[1].isOuterCircleFilled}
              onFlip={() => handleCoinFlip(1)}
            />
            <span className='mt-2 text-white'>Moneda 2</span>
          </div>
        </div>

        <Stepper 
          totalSteps={steps} 
          onChange={onChange} 
          currentStep={currentStep} 
          isLoading={isLoading} 
        />
      </div>
    </Frame>
  );
};

export default Launch;