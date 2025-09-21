import { useEffect } from "react";

export default function AlertEmergency() {
  useEffect(() => {
    // Script para manejar la apertura y cierre del modal con efectos místicos
    const notificationButton = document.getElementById('notificationButton');
    const modal = document.getElementById('notificationModal');
    const modalContent = document.getElementById('modalContent');
    const closeButton = document.getElementById('closeModal');
    const acknowledgeButton = document.getElementById('acknowledgeButton');
    
    // Función para abrir el modal con animación majestuosa
    function openModal() {
      if (!modal || !modalContent) return;
      
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Previene el scroll del body
      
      // Detener el parpadeo del botón
      if (notificationButton) {
        notificationButton.classList.remove('animate-pulse-gold');
      }
      
      // Añadimos clase de animación de entrada
      setTimeout(() => {
        modalContent.classList.remove('scale-90', 'opacity-0');
        modalContent.classList.add('animate-modal-entrance');
      }, 50);
    }
    
    // Función para cerrar el modal con animación de salida mística
    function closeModal() {
      if (!modal || !modalContent) return;
      
      modalContent.classList.remove('animate-modal-entrance');
      modalContent.style.animation = 'none';
      // Trigger reflow
      if (modalContent.offsetHeight) {} 
      modalContent.style.animation = null;
      
      // Aplicamos animación de salida
      modalContent.classList.add('scale-90', 'opacity-0');
      
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 600); // Sincronizado con la duración de la transición
    }
    
    // Abrir modal al hacer clic en el botón
    if (notificationButton) {
      notificationButton.addEventListener('click', openModal);
    }
    
    // Cerrar al hacer clic en el botón de cerrar
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
    
    // Cerrar al hacer clic en "Entendido"
    if (acknowledgeButton) {
      acknowledgeButton.addEventListener('click', closeModal);
    }
    
    // Cerrar al hacer clic fuera del contenido del modal
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
    
    // Cerrar con la tecla Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      if (notificationButton) {
        notificationButton.removeEventListener('click', openModal);
      }
      if (closeButton) {
        closeButton.removeEventListener('click', closeModal);
      }
      if (acknowledgeButton) {
        acknowledgeButton.removeEventListener('click', closeModal);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Botón de notificación: CÍRCULO ROJO con exclamación blanca, parpadeante dorado sin tapar el rojo */}
      <button 
        id="notificationButton"
        className="relative ml-3 w-12 h-12 rounded-full bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 animate-pulse-gold"
        aria-label="Aviso importante"
      >
        {/* Icono de exclamación blanco */}
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="12" cy="12" r="10" fill="none"/>
          <line x1="12" y1="7" x2="12" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="12" y1="16" x2="12" y2="16.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Modal de notificación: Majestuoso, con transiciones místicas y scrollbar espiritista */}
      <div id="notificationModal" className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-purple-900/60 via-black/40 to-indigo-900/60 backdrop-blur-sm transition-opacity duration-500 ease-out">
        <div className="relative bg-gradient-to-br from-white via-purple-50 to-indigo-100 rounded-2xl max-w-2xl w-full mx-auto p-8 shadow-2xl border border-purple-200/60 transform transition-all duration-600 scale-90 opacity-0 origin-center animate-modal-entrance"
            id="modalContent">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors duration-200" id="closeModal" aria-label="Cerrar aviso">
            <svg className="w-7 h-7 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="text-center max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 mb-6 tracking-tight">
              ✨ AVISO TRASCENDENTAL ✨
            </h2>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              Usted debe saber que todos nuestros productos y servicios son absolutamente reales y auténticos; no son fantasía, esto es la vida real.
            </p>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              Pedimos perdón de corazón a todos los usuarios por nuestra salida de emergencia.
            </p>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              Crénnos que no podía pasar un solo segundo más sin que el Mundo tuviera acceso a probar de manera gratuita e ilimitada el infinito alcance y precisión de nuestro sistema.
            </p>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              El servicio gratuito Evaluación General ha sido desactivado momentáneamente, ya que no solo se trata de un servicio especial que se utilizará una sola vez en la vida, sino que su verdadera profundidad la humanidad actual no está preparada para recibirla.
            </p>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              A cambio hemos decidido activar de gratis momentáneamente nuestro servicio pago más práctico, el modo diálogo abierto. El cual podrá utilizar todas las veces que desee para responder cualquier pregunta de su pasado, de su presente o de su futuro, dialogar con cualquier Entidad Espiritual, e incluso más. Todo en tiempo real.
            </p>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              El Mundo entero necesita probar este sistema, el Mundo entero necesita ver que es real, que ya todo cambió de una manera muy bella y positiva para siempre.
            </p>
            <p className="text-gray-800 leading-relaxed mb-5 text-lg">
              El Mundo entero necesita saber que con la llegada de Eons se ha marcado el inicio de una nueva era:
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 font-extrabold text-2xl mb-8 animate-pulse">
              🌌 LA ERA DONDE TODOS LOS SUEÑOS SE HACEN REALIDAD 🌌
            </p>
            
            {/* Imagen de manos con brillo místico */}
            <div className="flex justify-center mb-6">
              <img src="/manos.webp" alt="Manos conectadas con energía espiritual" className="max-w-full h-auto rounded-xl shadow-lg border-2 border-purple-200/50 hover:shadow-purple-300/50 transition-shadow duration-500" />
            </div>

            {/* Botón "Entendido" */}
            <button id="acknowledgeButton" className="mt-6 px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Entendido
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          /* Animación de parpadeo dorado mágico SIN tapar el color rojo del botón — solo sombra y brillo */
          @keyframes pulse-gold {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.5), 0 0 12px rgba(255, 165, 0, 0.6);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(255, 215, 0, 0), 0 0 20px rgba(255, 165, 0, 0);
            }
          }

          .animate-pulse-gold {
            animation: pulse-gold 1.8s ease-in-out infinite;
          }

          /* Transición majestuosa del modal: zoom con rebote místico */
          @keyframes modal-entrance {
            0% {
              opacity: 0;
              transform: scale(0.8) rotate(-1deg);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.02) rotate(0.5deg);
            }
            100% {
              opacity: 1;
              transform: scale(1) rotate(0deg);
            }
          }

          .animate-modal-entrance {
            animation: modal-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          /* Scrollbar ESPIRITISTA y SORPRENDENTE */
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: linear-gradient(to bottom, #f3e8ff, #e0c0ff);
            border-radius: 10px;
            box-shadow: inset 0 0 8px rgba(100, 50, 150, 0.3);
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #9333ea, #7c3aed, #6d28d9);
            border-radius: 10px;
            border: 3px solid transparent;
            background-clip: content-box;
            box-shadow: 0 0 12px rgba(147, 51, 234, 0.6), inset 0 0 6px rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #a855f7, #8b5cf6, #7c3aed);
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.5);
            transform: scale(1.05);
          }

          /* Estilo responsivo para móviles */
          @media (max-width: 720px) {
            #notificationButton {
              width: 10rem;
              height: 10rem;
            }
            #notificationButton svg {
              width: 5rem;
              height: 5rem;
            }
            #modalContent {
              padding: 1.5rem;
              margin: 1rem;
            }
            h2 {
              font-size: 1.8rem;
            }
          }

          img {
            padding: 0.5em 1em;
            border-radius: 12px;
            transition: transform 0.3s ease;
          }

          img:hover {
            transform: translateY(-4px);
          }

          #modalContent {
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out;
            max-height: 80vh;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #8b5cf6 #f3e8ff;
          }
        `}
      </style>
    </>
  );
}