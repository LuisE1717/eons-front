// Launch.tsx - CORREGIDO (con manejo específico de la respuesta)
import React, { useEffect, useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';
import { postSaveEvaluation } from '../../utils/api/evaluation';
import Cookies from 'js-cookie';

interface CoinState {
  isFaceUp: boolean;
  isOuterCircleFilled: boolean;
  isConfirmed: boolean;
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
  const [showWritingEffect, setShowWritingEffect] = useState(false);
  const [resultText, setResultText] = useState('');

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
      isFaceUp: false,
      isOuterCircleFilled: false,
      isConfirmed: false
    }));
    setCoinPositions(initialCoins);
  }, [type]);

  const handleCoinFlip = (index: number) => {
    if (coinPositions[index].isConfirmed) return; // No permitir cambios después de confirmar
    
    setCoinPositions((prev) =>
      prev.map((coin, i) =>
        i === index ? { ...coin, isFaceUp: !coin.isFaceUp } : coin
      )
    );
  };

  const confirmCurrentPositions = () => {
    // Marcar las monedas actuales como confirmadas
    setCoinPositions(prev => prev.map(coin => ({
      ...coin,
      isConfirmed: true,
      isOuterCircleFilled: true
    })));
  };

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Confirmar las posiciones actuales antes de proceder
    confirmCurrentPositions();
    
    // Pequeña pausa para mostrar la confirmación
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (currentStep < steps) {
      // Guardar el estado actual de las monedas
      const currentData = coinPositions.map(coin => coin.isFaceUp ? 1 : 0);
      const updatedEvaluation = [...evaluationHistory, currentData];
      setEvaluationHistory(updatedEvaluation);
      setCurrentStep(currentStep + 1);

      // Resetear monedas para el próximo lanzamiento (sin confirmar)
      const newCoins = coinPositions.map(() => ({
        isFaceUp: false,
        isOuterCircleFilled: false,
        isConfirmed: false
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
        console.log('📊 Estructura completa de response:', JSON.stringify(response, null, 2));

        // DEPURACIÓN: Verificar la estructura exacta de la respuesta
        if (response) {
          console.log('✅ Response existe');
          console.log('✅ Response.success:', response.success);
          console.log('✅ Response.data:', response.data);
          
          // Verificar diferentes estructuras posibles
          if (response.data) {
            console.log('✅ Response.data existe');
            console.log('✅ Response.data.resultadoFinal:', response.data.resultadoFinal);
          }
          
          if (response.resultadoFinal) {
            console.log('✅ Response.resultadoFinal existe:', response.resultadoFinal);
          }
        }

        // Extraer el resultado final basado en la estructura real de la respuesta
        let resultadoFinal = '';
        
        // Caso 1: Estructura desde los logs del backend (response.data.resultadoFinal)
        if (response && response.data && response.data.resultadoFinal) {
          resultadoFinal = response.data.resultadoFinal;
          console.log('✅ Usando response.data.resultadoFinal');
        } 
        // Caso 2: Estructura alternativa (response.resultadoFinal)
        else if (response && response.resultadoFinal) {
          resultadoFinal = response.resultadoFinal;
          console.log('✅ Usando response.resultadoFinal');
        }
        // Caso 3: La respuesta ES el resultado
        else if (typeof response === 'string' && response.length > 0) {
          resultadoFinal = response;
          console.log('✅ Usando response como string');
        }
        // Caso 4: Buscar en cualquier nivel del objeto
        else if (response && typeof response === 'object') {
          // Función recursiva para buscar texto largo que podría ser el resultado
          const findLongText = (obj: any, path = ''): string => {
            if (typeof obj === 'string' && obj.length > 20 && !path.includes('id') && !path.includes('token')) {
              console.log('📖 Texto largo encontrado en:', path, obj.substring(0, 50) + '...');
              return obj;
            }
            
            if (typeof obj === 'object' && obj !== null) {
              for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                  const found = findLongText(obj[key], `${path}.${key}`);
                  if (found) return found;
                }
              }
            }
            return '';
          };
          
          resultadoFinal = findLongText(response, 'response');
          if (resultadoFinal) {
            console.log('✅ Resultado encontrado mediante búsqueda recursiva');
          }
        }

        console.log('📝 Resultado final extraído:', resultadoFinal);

        if (resultadoFinal && resultadoFinal.length > 0) {
          console.log('✅ Procesamiento exitoso, mostrando efecto de escritura...');
          
          // Activar el efecto de escritura
          setShowWritingEffect(true);
          
          // Efecto de escritura gradual del resultado
          let currentIndex = 0;
          
          const typeWriter = () => {
            if (currentIndex < resultadoFinal.length) {
              setResultText(prev => prev + resultadoFinal.charAt(currentIndex));
              currentIndex++;
              setTimeout(typeWriter, 30); // Velocidad de escritura
            } else {
              // Cuando termine la escritura, guardar y redirigir después de un breve momento
              setTimeout(() => {
                // Guardar datos para la página de resultados
                if (response && response.data) {
                  localStorage.setItem('resultados_dialogo', JSON.stringify(response.data));
                  localStorage.setItem('ultima_consulta_id', response.data.id || 'unknown');
                } else if (response && response.id) {
                  localStorage.setItem('resultados_dialogo', JSON.stringify(response));
                  localStorage.setItem('ultima_consulta_id', response.id);
                }
                localStorage.setItem('ultima_consulta_tipo', 'dialogo');
                
                // Redirigir a la vista de resultados
                const resultadoId = (response && response.data && response.data.id) || 
                                  (response && response.id) || 'unknown';
                window.location.href = `/resultados?type=dialogo&id=${resultadoId}`;
              }, 2000);
            }
          };
          
          // Iniciar el efecto de escritura
          typeWriter();
        } else {
          console.error('❌ No se pudo extraer el resultado final de la respuesta. Estructura completa:');
          console.error(JSON.stringify(response, null, 2));
          alert('Error: El servidor respondió pero no se pudo extraer el resultado. Por favor revisa la consola para más detalles.');
        }
    } catch (error: any) {
        console.error('❌ Error inesperado:', error);
        
        // Manejo mejorado de errores
        let errorMessage = 'Error inesperado. Por favor revisa la consola para más detalles.';
        
        if (error.message) {
          errorMessage = error.message;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data) {
          errorMessage = JSON.stringify(error.response.data);
        }
        
        alert(`Error: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };

  // Si estamos mostrando el efecto de escritura, ocultar todos los elementos excepto el texto
  if (showWritingEffect) {
    return (
      <Frame>
        <div className="writing-effect-container text-center">
          <div className="arcane-writing-background">
            <div className="writing-orb writing-orb-1"></div>
            <div className="writing-orb writing-orb-2"></div>
            <div className="writing-orb writing-orb-3"></div>
          </div>
          
          <div className="writing-text-container">
            <p className="writing-text">{resultText}</p>
            <span className="writing-cursor">|</span>
            
            {/* Efectos de partículas de brillo */}
            <div className="writing-sparkles">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="sparkle" style={{
                  animationDelay: `${i * 0.2}s`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}></div>
              ))}
            </div>
          </div>
          
          <div className="writing-glow"></div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="launch-container text-center arcane-container">
        <div className="arcane-background-elements">
          <div className="arcane-orb arcane-orb-1"></div>
          <div className="arcane-orb arcane-orb-2"></div>
          <div className="arcane-orb arcane-orb-3"></div>
          <div className="arcane-orb arcane-orb-4"></div>
        </div>
        
        <h5 className='mb-43 text-white text-xl font-bold arcane-title'>
          {type === 'dialogo-abierto' 
            ? 'Modo Diálogo Abierto - Coloca las monedas como cayeron' 
            : '¿Cómo cayeron tus monedas?'}
        </h5>
        
        <div className="coin-container flex justify-center gap-8 mb-8 arcane-coin-area">
          {coinPositions.map((coin, index) => (
            <div key={index} className="flex flex-col items-center arcane-coin-wrapper" data-index={index}>
              <Coin
                coin={index === 0}
                isFaceUp={coin.isFaceUp}
                isOuterCircleFilled={coin.isOuterCircleFilled}
                isConfirmed={coin.isConfirmed}
                onFlip={() => handleCoinFlip(index)}
              />
              <span className='mt-2 text-white arcane-coin-label'>Moneda {index + 1}</span>
            </div>
          ))}
        </div>

        {/* Botón de lanzamiento especial arriba del botón siguiente */}
        <div className="special-launch-btn-container mb-4">
          <button className="special-launch-btn">
            Lanzamiento especial <span className="prox-text">(próximamente)</span>
          </button>
        </div>

        {/* BOTÓN DE SIGUIENTE CON CONTADOR */}
        <div className="arcane-stepper-section mb-30">
          <Stepper 
            totalSteps={steps} 
            onChange={handleNextStep}
            currentStep={currentStep} 
            isLoading={isLoading} 
          />
        </div>
        
      </div>
    </Frame>
  );
};

export default Launch;