// Launch.tsx - CORREGIDO (sin react-router-dom)
import React, { useEffect, useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';
import { postSaveEvaluation } from '../../utils/api/evaluation';
import Cookies from 'js-cookie';

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
  const [coinPositions, setCoinPositions] = useState<CoinState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [evaluationHistory, setEvaluationHistory] = useState<any[]>([]);
  const [currentToken, setCurrentToken] = useState(token);

  // Verificar y actualizar el token si es necesario
  useEffect(() => {
    const checkToken = () => {
      const freshToken = Cookies.get("eons_token");
      if (freshToken && freshToken !== currentToken) {
        console.log('🔄 Token actualizado');
        setCurrentToken(freshToken);
      } else if (!freshToken) {
        console.error('❌ No se encontró token, redirigiendo a login');
        window.location.href = '/auth';
      }
    };

    // Verificar el token periódicamente
    const interval = setInterval(checkToken, 30000);
    return () => clearInterval(interval);
  }, [currentToken]);

  // Inicializar monedas basado en el tipo de lanzamiento
  useEffect(() => {
    const initialCoins = Array(type === 'dialogo-abierto' ? 2 : 2).fill(null).map(() => ({
      isFaceUp: Math.random() > 0.5,
      isOuterCircleFilled: false
    }));
    setCoinPositions(initialCoins);
  }, [type]);

  const handleCoinFlip = (index: number) => {
    setCoinPositions((prev) =>
      prev.map((coin, i) =>
        i === index ? { ...coin, isFaceUp: !coin.isFaceUp } : coin
      )
    );
  };

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (currentStep < steps) {
      // Guardar el estado actual de las monedas
      const currentData = coinPositions.map(coin => coin.isFaceUp ? 1 : 0);
      const updatedEvaluation = [...evaluationHistory, currentData];
      setEvaluationHistory(updatedEvaluation);
      setCurrentStep(currentStep + 1);

      // Resetear monedas para el próximo lanzamiento
      const newCoins = coinPositions.map(() => ({
        isFaceUp: Math.random() > 0.5,
        isOuterCircleFilled: false
      }));
      setCoinPositions(newCoins);
    } else if (currentStep === steps) {
      // Último lanzamiento - procesar todos los datos
      const finalData = [...evaluationHistory, coinPositions.map(coin => coin.isFaceUp ? 1 : 0)];
      await handleSubmit(finalData);
    }
  };

  const handleSubmit = async (evaluationData: any[]) => {
    try {
        setIsLoading(true);
        console.log('📋 Datos a enviar:', evaluationData);

        // Verificar token antes de enviar
        const freshToken = Cookies.get("eons_token") || currentToken;
        if (!freshToken) {
          alert('❌ Sesión expirada. Por favor inicia sesión nuevamente.');
          window.location.href = '/auth';
          return;
        }

        const data = {
          type: "dialogo-abierto",
          shortType: "DAB",
          coinPositions: evaluationData,
        };

        console.log('🚀 Enviando datos completos con token:', freshToken.substring(0, 20) + '...');

        const response = await postSaveEvaluation(freshToken, data);
        console.log('📨 Respuesta completa:', response);

        if (response.success && response.data) {
          console.log('✅ Procesamiento exitoso, redirigiendo...');
          
          // Guardar en localStorage para acceso inmediato
          localStorage.setItem('resultados_dialogo', JSON.stringify(response.data));
          localStorage.setItem('ultima_consulta_id', response.data.id);
          localStorage.setItem('ultima_consulta_tipo', 'dialogo');
          
          // Redirigir a la vista de resultados
          window.location.href = `/resultados?type=dialogo&id=${response.data.id}`;
        } else {
          console.error('❌ Error en la respuesta:', response.error);
          
          if (response.error?.message?.includes('Token') || response.error?.includes('token')) {
            alert('❌ Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
            window.location.href = '/auth';
          } else {
            alert(`Error: ${response.error?.message || 'Error al procesar los resultados. Intenta nuevamente.'}`);
          }
        }
    } catch (error) {
        console.error('❌ Error inesperado:', error);
        alert('Error inesperado. Por favor revisa la consola para más detalles.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Frame>
      <div className="launch-container text-center">
        <h5 className='mb-20 text-white text-xl font-bold'>
          {type === 'dialogo-abierto' 
            ? 'Modo Diálogo Abierto - Selecciona los símbolos' 
            : '¿Qué símbolos cayeron hacia arriba?'}
        </h5>
        
        <div className="coin-container flex justify-center gap-8 mb-8">
          {coinPositions.map((coin, index) => (
            <div key={index} className="flex flex-col items-center">
              <Coin
                coin={index === 0}
                isFaceUp={coin.isFaceUp}
                isOuterCircleFilled={coin.isOuterCircleFilled}
                onFlip={() => handleCoinFlip(index)}
              />
              <span className='mt-2 text-white'>Moneda {index + 1}</span>
            </div>
          ))}
        </div>

        <div className="mb-4 text-white">
          <p>Lanzamiento {currentStep} de {steps}</p>
          {type === 'dialogo-abierto' && currentStep <= 2 && (
            <p className="text-sm text-purple-300">Primeros 2 lanzamientos determinan el sistema</p>
          )}
        </div>

        <Stepper 
          totalSteps={steps} 
          onChange={handleNextStep}
          currentStep={currentStep} 
          isLoading={isLoading} 
        />
      </div>
    </Frame>
  );
};

export default Launch;