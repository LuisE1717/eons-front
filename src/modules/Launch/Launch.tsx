// Launch.tsx - ACTUALIZADO (con todos los cambios solicitados)
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
  const [currentStep, setCurrentStep] = useState(0); // 0 significa que no ha comenzado
  const [evaluationHistory, setEvaluationHistory] = useState<any[]>([]);
  const [currentToken, setCurrentToken] = useState(token);
  const [showWritingEffect, setShowWritingEffect] = useState(false);
  const [resultText, setResultText] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [isHoveringRetry, setIsHoveringRetry] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

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
      isFaceUp: true, // Cambiado a true para que sea cara blanca por defecto
      isOuterCircleFilled: false,
      isConfirmed: false
    }));
    setCoinPositions(initialCoins);
  }, [type]);

  const handleCoinFlip = (index: number) => {
    if (currentStep === 0) return; // No permitir cambios antes de comenzar
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

  const handleStart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Animación de inicio
    setIsStarting(true);
    
    // Esperar a que termine la animación
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(1);
    setIsStarting(false);
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

      // Resetear monedas para el próximo lanzamiento (sin confirmar, con caras blancas por defecto)
      const newCoins = coinPositions.map(() => ({
        isFaceUp: true, // Cambiado a true para cara blanca por defecto
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

        // Mostrar "Cargando resultados" durante 5 segundos
        setShowWritingEffect(true);
        setResultText('Cargando resultados');
        
        // Simular carga de 5 segundos
        await new Promise(resolve => setTimeout(resolve, 5000));

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
          
          // Limpiar texto de carga
          setResultText('');
          
          // Efecto de escritura gradual del resultado
          let currentIndex = 0;
          
          const typeWriter = () => {
            if (currentIndex < resultadoFinal.length) {
              setResultText(prev => prev + resultadoFinal.charAt(currentIndex));
              currentIndex++;
              setTimeout(typeWriter, 50); // Velocidad de escritura más lenta
            } else {
              // Cuando termine la escritura, mostrar los botones
              setTimeout(() => {
                setShowButtons(true);
              }, 500);
            }
          };
          
          // Iniciar el efecto de escritura
          typeWriter();
        } else {
          console.error('❌ No se pudo extraer el resultado final de la respuesta. Estructura completa:');
          console.error(JSON.stringify(response, null, 2));
          setResultText('Error: El servidor respondió pero no se pudo extraer el resultado. Por favor revisa la consola para más detalles.');
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
        
        setResultText(`Error: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // Reiniciar todo el estado para un nuevo lanzamiento
    setShowWritingEffect(false);
    setShowButtons(false);
    setResultText('');
    setCurrentStep(0);
    setEvaluationHistory([]);
    
    // Reiniciar monedas (con caras blancas por defecto)
    const newCoins = Array(type === 'dialogo-abierto' ? 2 : 2).fill(null).map(() => ({
      isFaceUp: true, // Cambiado a true para cara blanca por defecto
      isOuterCircleFilled: false,
      isConfirmed: false
    }));
    setCoinPositions(newCoins);
  };

  const handleGoBack = () => {
    if (currentStep > 0) {
      setShowExitModal(true);
    } else {
      window.location.href = '/services';
    }
  };

  const confirmExit = () => {
    setShowExitModal(false);
    window.location.href = '/services';
  };

  const cancelExit = () => {
    setShowExitModal(false);
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
            {isLoading && (
              <div className="loading-spinner">
                <div className="spinner-ball purple-spinner"></div>
              </div>
            )}
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

          {/* Botones de Modo Diálogo Abierto */}
          {showButtons && (
            <div className="absolute bottom-60 left-0 right-0 flex justify-center items-center gap-4 z-20">
              {/* Botón de Modo Diálogo Abierto */}
              <button
                className="bg-white text-purple-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 spiritual-glow"
                onClick={handleRetry}
                onMouseEnter={() => setIsHoveringRetry(true)}
                onMouseLeave={() => setIsHoveringRetry(false)}
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isHoveringRetry ? 'rotate-360' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Modo Diálogo Abierto
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes rotate-360 {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .rotate-360 {
            animation: rotate-360 0.5s ease-in-out;
          }
          
          .loading-spinner {
            display: flex;
            justify-content: center;
            margin: 1rem 0;
          }
          
          .spinner-ball {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          .purple-spinner {
            background: linear-gradient(135deg, #8B5CF6, #6D28D9);
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Frame>
    );
  }

  return (
    <Frame>
      {/* Botón de ir atrás */}
      <div className="back-button-container" onClick={handleGoBack}>
        <div className="back-button-bg"></div>
        <button className="back-button">
          <svg className="back-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Modal de confirmación de salida */}
      {showExitModal && (
        <div className="exit-modal-overlay">
          <div className="exit-modal">
            <div className="exit-modal-content">
              <img src="/informacion 3.webp" alt="Información" className="exit-modal-image" />
              <h3>¿Estás seguro?</h3>
              <p>Si sales ahora, perderás todos los lanzamientos realizados.</p>
              <div className="exit-modal-buttons">
                <button className="exit-modal-confirm" onClick={confirmExit}>Sí, salir</button>
                <button className="exit-modal-cancel" onClick={cancelExit}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="launch-container text-center arcane-container">
        <div className="arcane-background-elements">
          <div className="arcane-orb arcane-orb-1"></div>
          <div className="arcane-orb arcane-orb-2"></div>
          <div className="arcane-orb arcane-orb-3"></div>
          <div className="arcane-orb arcane-orb-4"></div>
        </div>
        
        {/* Círculo verde brillante en el centro (solo visible antes de comenzar) */}
        {currentStep === 0 && (
          <div className="green-glow-circle"></div>
        )}
        
        <h5 className='mb-2 text-white text-xl font-bold arcane-title'>
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

        {/* BOTÓN DE SIGUIENTE/Comenzar */}
        <div className="arcane-stepper-section mb-30">
          {currentStep === 0 ? (
            <button 
              className={`start-button white-button ${isStarting ? 'rotating' : ''}`}
              onClick={handleStart}
              disabled={isStarting}
            >
              {isStarting ? (
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                'Comenzar'
              )}
            </button>
          ) : (
            <Stepper 
              totalSteps={steps} 
              onChange={handleNextStep}
              currentStep={currentStep} 
              isLoading={isLoading} 
            />
          )}
        </div>
        
      </div>

      <style jsx>{`
        /* Estilos para el botón de ir atrás */
        .back-button-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 70px;
          z-index: 100;
        }
        
        .back-button-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          z-index: -1;
        }
        
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 101;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.3s;
        }
        
        .back-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .back-arrow {
          width: 24px;
          height: 24px;
          color: #4C1D95;
        }
        
        /* Estilos para el círculo verde brillante */
        .green-glow-circle {
          position: absolute;
          top: -23%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle, #00ff00, #00cc00);
          box-shadow: 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00;
          z-index: 5;
          animation: pulse-green 2s infinite;
        }
        
        @keyframes pulse-green {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
        }
        
        /* Estilos para el modal de confirmación */
        .exit-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .exit-modal {
          background: linear-gradient(135deg, #ffffff, #8B5CF6);
          border-radius: 20px;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: modal-appear 0.3s ease-out;
        }
        
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .exit-modal-content h3 {
          color: #4C1D95;
          margin-bottom: 1rem;
        }
        
        .exit-modal-content p {
          color: #333;
          margin-bottom: 2rem;
        }
        
        .exit-modal-image {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .exit-modal-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .exit-modal-confirm, .exit-modal-cancel {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .exit-modal-confirm {
          background-color: #ff4d4d;
          color: white;
        }
        
        .exit-modal-confirm:hover {
          background-color: #ff3333;
        }
        
        .exit-modal-cancel {
          background-color: #8B5CF6;
          color: white;
        }
        
        .exit-modal-cancel:hover {
          background-color: #7C3AED;
        }
        
        /* Estilos para el botón Comenzar */
        .start-button {
          background: white !important;
          color: #4C1D95 !important;
          border: none !important;
          padding: 15px 40px !important;
          border-radius: 50px !important;
          font-weight: 700 !important;
          font-size: 1.2rem !important;
          letter-spacing: 1px !important;
          box-shadow: 0 5px 20px rgba(255, 255, 255, 0.4) !important;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          position: relative !important;
          overflow: hidden !important;
          cursor: pointer;
        }
        
        .start-button:hover:not(:disabled) {
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.6) !important;
        }
        
        .start-button:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }
        
        .rotating {
          animation: rotate 1s linear infinite;
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .loading-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }
        
        .loading-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #8B5CF6;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .loading-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .loading-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        
        .white-button {
          background: white !important;
          color: #4C1D95 !important;
        }
      `}</style>
    </Frame>
  );
};

export default Launch;


