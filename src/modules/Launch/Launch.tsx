// Launch.tsx - ACTUALIZADO con botón de traducción manual al inglés
import React, { useEffect, useState } from 'react';
import Coin from '../../components/UI/Coin/Coin';
import Stepper from '../../components/UI/Stepper/Stepper';
import Frame from '../../components/UI/Frame/Frame';
import { postSaveEvaluation } from '../../utils/api/evaluation';
import Cookies from 'js-cookie';
import useTranslation from '../../modules/Shared/hooks/useTranslation'; // Asegúrate de que la ruta sea correcta

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

// Función para traducir texto de español a inglés usando un proxy público (solo para demo)
const translateToEnglish = async (text: string): Promise<string> => {
  if (!text || text.trim() === '') return text;

  try {
    // ⚠️ ADVERTENCIA: Este proxy es público y no recomendado para producción.
    // En producción, usa tu propio backend con la API de Google Translate o similar.
    const proxyUrl = 'https://api.corsproxy.io/  ';
    const targetUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(proxyUrl + targetUrl);
    if (!response.ok) throw new Error('Translation service unavailable');

    const data = await response.json();
    if (data && Array.isArray(data[0])) {
      return data[0].map((item: any) => item[0]).join(' ');
    }
    return text;
  } catch (error) {
    console.warn('⚠️ Falló la traducción. Mostrando texto original.', error);
    return text;
  }
};

const Launch: React.FC<LaunchProps> = ({ token, steps, type }) => {
  const { translation } = useTranslation();
  const [coinPositions, setCoinPositions] = useState<CoinState[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 significa que no ha comenzado
  const [evaluationHistory, setEvaluationHistory] = useState<any[]>([]);
  const [currentToken, setCurrentToken] = useState(token);
  const [showWritingEffect, setShowWritingEffect] = useState(false);
  const [resultText, setResultText] = useState('');
  const [originalResultText, setOriginalResultText] = useState(''); // Guardamos el original en español
  const [showButtons, setShowButtons] = useState(false);
  const [isHoveringRetry, setIsHoveringRetry] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false); // Nuevo estado para controlar si se está traduciendo

  // Nuevo estado para controlar la visibilidad del modal de información
  const [showInfoModal, setShowInfoModal] = useState(false);
  // Estado para controlar la animación de cierre del modal
  const [isClosingInfoModal, setIsClosingInfoModal] = useState(false);

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
    // ✅ REMOVIDO: if (currentStep === 0) return; → Ahora se permite voltear antes de comenzar
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
        setResultText(translation.Launch.loading_results || 'Cargando resultados');
        // Simular carga de 5 segundos
        await new Promise(resolve => setTimeout(resolve, 5000));
        // Verificar token antes de enviar
        const freshToken = Cookies.get("eons_token") || currentToken;
        if (!freshToken) {
          alert(translation.Launch.session_expired || '❌ Sesión expirada. Por favor inicia sesión nuevamente.');
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
          // Guardar el resultado original en español
          setOriginalResultText(resultadoFinal);
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
          setResultText(translation.Launch.result_error || 'Error: El servidor respondió pero no se pudo extraer el resultado. Por favor revisa la consola para más detalles.');
        }
    } catch (error: any) {
        console.error('❌ Error inesperado:', error);
        // Manejo mejorado de errores
        let errorMessage = translation.Launch.unexpected_error || 'Error inesperado. Por favor revisa la consola para más detalles.';
        if (error.message) {
          errorMessage = error.message;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data) {
          errorMessage = JSON.stringify(error.response.data);
        }
        setResultText(`${translation.Launch.error || 'Error'}: ${errorMessage}`);
    } finally {
        setIsLoading(false);
    }
  };

  // Función para traducir el resultado al inglés al hacer clic en el ícono
  const handleTranslateToEnglish = async () => {
    if (isTranslating) return;
    setIsTranslating(true);
    setResultText('Translating results...');
    const translated = await translateToEnglish(originalResultText);
    setResultText(translated);
    setIsTranslating(false);
  };

  const handleRetry = () => {
    // Reiniciar todo el estado para un nuevo lanzamiento
    setShowWritingEffect(false);
    setShowButtons(false);
    setResultText('');
    setOriginalResultText('');
    setIsTranslating(false);
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

  // Funciones para el nuevo Modal de Información
  const openInfoModal = () => {
    setShowInfoModal(true);
    setIsClosingInfoModal(false);
  };

  const closeInfoModal = () => {
    // Iniciar animación de cierre
    setIsClosingInfoModal(true);
    // Esperar a que termine la animación antes de ocultar el modal
    setTimeout(() => {
      setShowInfoModal(false);
      setIsClosingInfoModal(false);
    }, 300); // Duración de la animación de cierre
  };

  // Generar contenido dinámico para el modal según el paso actual usando traducciones
  const getInfoModalContent = () => {
    let stepInstructions = '';
    
    if (currentStep === 0) {
      stepInstructions = translation.Launch.info_modal_step0_instructions || 'Una vez las herramientas caigan, marque en el panel exactamente los símbolos que cayeron hacia arriba, y luego presione el botón "Comenzar"';
    } else if (currentStep > 0 && currentStep < steps) {
      stepInstructions = translation.Launch.info_modal_step1_instructions || 'Una vez las herramientas caigan, marque en el panel exactamente los símbolos que cayeron hacia arriba, y luego presione el botón "Siguiente"';
    } else if (currentStep === steps) {
      stepInstructions = translation.Launch.info_modal_final_instructions || 'Una vez las herramientas caigan, marque en el panel exactamente los símbolos que cayeron hacia arriba, y luego presione el botón "Siguiente"';
    }

    return (
      <div className="info-modal-content">
        <img src="/informacion 3.webp" alt="Información" className="info-modal-image" />
        
        {currentStep === 0 ? (
          <p>{translation.Launch.info_modal_general_instructions_with_question || 'Tome las herramientas, realice su pregunta, bata las herramientas entre sus manos y luego láncelas para que estas caigan supuestamente al azar.'}</p>
        ) : (
          <p>{translation.Launch.info_modal_general_instructions || 'Tome las herramientas, bátalas entre sus manos y luego láncelas para que estas caigan supuestamente al azar.'}</p>
        )}
        
        <p>{stepInstructions}</p>
      </div>
    );
  };

  // Si estamos mostrando el efecto de escritura, ocultar todos los elementos excepto el texto
  if (showWritingEffect) {
    return (
      <Frame>
        {/* ✅ Botón de ir atrás en modo escritura: mismo diseño, color blanco, redirige directamente a /services */}
        <div className="back-button-container-writing" onClick={() => window.location.href = '/services'}>
          <div className="back-button-bg"></div>
          <button className="back-button-writing">
            <svg className="back-arrow-writing" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="writing-effect-container text-center">
          <div className="arcane-writing-background">
            <div className="writing-orb writing-orb-1"></div>
            <div className="writing-orb writing-orb-2"></div>
            <div className="writing-orb writing-orb-3"></div>
          </div>
          <div className="writing-text-container">
            {/* Ícono de traducción (solo visible cuando el resultado ya terminó de escribirse y no se está traduciendo) */}
            {showButtons && !isTranslating && (
              <button
                className="translate-button"
                onClick={handleTranslateToEnglish}
                title="Translate to English"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </button>
            )}
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
                {translation.Launch.open_dialog_mode || 'Modo Diálogo Abierto'}
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

          /* Estilos para el botón de ir atrás en modo escritura */
          .back-button-container-writing {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            z-index: 100;
          }
          .back-button-writing {
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
          .back-button-writing:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .back-arrow-writing {
            width: 24px;
            height: 24px;
            color: #ffffff; /* ✅ Color blanco */
          }

          /* Estilo para el botón de traducción */
          .translate-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: background-color 0.2s;
          }
          .translate-button:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          .translate-button svg {
            color: white;
            width: 20px;
            height: 20px;
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
              <img src="/moon.webp" alt="Información" className="exit-modal-image" />
              <h3>{translation.Launch.exit_confirm_title || '¿Estás seguro?'}</h3>
              <p>{translation.Launch.exit_confirm_message || 'Si sales ahora, perderás todos los lanzamientos realizados.'}</p>
              <div className="exit-modal-buttons">
                <button className="exit-modal-confirm" onClick={confirmExit}>{translation.Launch.yes_exit || 'Sí, salir'}</button>
                <button className="exit-modal-cancel" onClick={cancelExit}>{translation.Launch.cancel || 'Cancelar'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Información para el botón verde */}
      {showInfoModal && (
        <div className={`info-modal-overlay ${isClosingInfoModal ? 'closing' : ''}`} onClick={closeInfoModal}>
          <div className={`info-modal ${isClosingInfoModal ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="info-modal-close" onClick={closeInfoModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            
            {getInfoModalContent()}
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

        {/* Círculo que cambia de color según el estado del modal */}
        <div 
          className={`glow-circle ${showInfoModal ? 'red-glow-circle' : 'green-glow-circle'}`} 
          onClick={openInfoModal}
        ></div>
        
        

        <div className="coin-container flex justify-center gap-8 mt-24 arcane-coin-area">
          {coinPositions.map((coin, index) => (
            <div key={index} className="flex flex-col items-center arcane-coin-wrapper" data-index={index}>
              <Coin
                coin={index === 0}
                isFaceUp={coin.isFaceUp}
                isOuterCircleFilled={coin.isOuterCircleFilled}
                isConfirmed={coin.isConfirmed}
                onFlip={() => handleCoinFlip(index)}
              />
              
            </div>
          ))}
        </div>

        {/* Botón de lanzamiento especial arriba del botón siguiente */}
        <div className="special-launch-btn-container mb-4">
          <button className="special-launch-btn">
            {translation.Launch.special_launch || 'Lanzamiento especial'} <span className="prox-text">({translation.Launch.coming_soon || 'próximamente'})</span>
          </button>
        </div>

        {/* BOTÓN DE SIGUIENTE/Comenzar */}
        <div className="arcane-stepper-section mb-30">
          {currentStep === 0 ? (
            <button 
              className={`start-button white-button`}
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
                translation.Launch.start || 'Comenzar'
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
          color: #f8f5fbff;
        }

        /* Estilos base para el círculo brillante */
        .glow-circle {
          position: absolute;
          top: -17%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          z-index: 5;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        /* Círculo verde brillante (estado normal) */
        .green-glow-circle {
          background: radial-gradient(circle, #00ff00, #00cc00);
          box-shadow: 0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00;
          animation: pulse-green 2s infinite;
        }

        /* Círculo rojo brillante (cuando el modal está abierto) */
        .red-glow-circle {
          background: radial-gradient(circle, #ff0000, #cc0000);
          box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000;
          animation: pulse-red 2s infinite;
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

        @keyframes pulse-red {
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
          background-color: rgba(255, 255, 255, 0.15); /* CAMBIADO: fondo claro en lugar de oscuro */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px); /* AÑADIDO: efecto de desenfoque */
          animation: modalFadeIn 0.3s ease-out;
        }

        .exit-modal {
          background: linear-gradient(135deg, #ffffff, #b89ef4ff); /* CAMBIADO: fondo más claro */
          border-radius: 20px;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* REDUCIDO: sombra más suave */
          animation: modalSlideIn 0.3s ease-out;
          border: 1px solid rgba(139, 92, 246, 0.2); /* AÑADIDO: borde sutil */
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
          color: #2d2d2d; /* CAMBIADO: texto más oscuro para mejor contraste */
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

        /* Estilos para el nuevo Modal de Información con animaciones de cierre */
        .info-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.15); /* CAMBIADO: fondo claro en lugar de oscuro */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
          backdrop-filter: blur(5px); /* AÑADIDO: efecto de desenfoque */
          animation: modalFadeIn 0.3s ease-out;
        }

        .info-modal-overlay.closing {
          animation: modalFadeOut 0.3s ease-in forwards;
        }

        .info-modal {
          background: linear-gradient(135deg, #ffffff, #d03bf1ff); /* CAMBIADO: fondo más claro */
          border-radius: 20px;
          padding: 2rem;
          max-width: 450px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 10px 50px rgba(139, 92, 246, 0.3); /* REDUCIDO: sombra más suave */
          animation: modalSlideIn 0.3s ease-out;
          border: 1px solid rgba(139, 92, 246, 0.2); /* AÑADIDO: borde sutil */
        }

        .info-modal.closing {
          animation: modalSlideOut 0.3s ease-in forwards;
        }

        @keyframes modalFadeIn {
          from {
            background-color: rgba(255, 255, 255, 0);
          }
          to {
            background-color: rgba(255, 255, 255, 0.15);
          }
        }

        @keyframes modalFadeOut {
          from {
            background-color: rgba(255, 255, 255, 0.15);
          }
          to {
            background-color: rgba(255, 255, 255, 0);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalSlideOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
        }

        .info-modal-image {
          width: 100px;
          height: 100px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .info-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #2d2d2d; /* CAMBIADO: color más oscuro */
          padding: 5px;
          border-radius: 50%;
          transition: background-color 0.3s;
        }

        .info-modal-close:hover {
          background-color: rgba(76, 29, 149, 0.1);
          color: #4C1D95;
        }

        .info-modal-content {
          margin-top: 20px;
          color: #2d2d2d; /* CAMBIADO: texto más oscuro para mejor contraste */
          text-align: left;
          line-height: 1.6;
          font-size: 1rem;
        }

        .info-modal-content h3 {
          color: #4C1D95;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .info-modal-content p {
          margin-bottom: 1rem;
          color: #2d2d2d; /* CAMBIADO: texto más oscuro */
        }

        .info-modal-content strong {
          color: #0e0d0fff;
        }

        .info-modal-examples {
          margin-top: 1.5rem;
        }

        .example {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
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