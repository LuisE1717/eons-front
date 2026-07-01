// First.tsx
import ImageSection from "@modules/Shared/components/ImageSection/ImageSection";
import P from "../../shared/components/P/P";
import useTranslation from "@modules/Shared/hooks/useTranslation";

export default function First() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={true} image="/manos.webp">
      <P bold className="text-4xl mb-4">{translation.Landing.title}</P>
      
      {/* Modal de advertencia debajo del título */}
      <div className="mb-6 bg-gradient-to-r from-white via-red-50 to-white border-2 border-red-300 rounded-2xl shadow-lg p-6 relative overflow-hidden">
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-30% to-transparent opacity-20 animate-pulse"></div>
        
        {/* Contenido */}
        <div className="relative z-5 flex items-start gap-4">
          {/* Icono de advertencia */}
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Texto */}
          <div className="flex-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
              ADVERTENCIA:
            </h3>

            <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
              <p>
                Si presenta dificultades a la hora de crear usuario o no le deja acceder, no se preocupe.
              </p>
              
              <p>
                Manténgase entrando.
              </p>

              <p>
                Pues a lo largo de la madrugada o al amanecer ya estará todo activo, y estará disponible de manera gratuita el servicio "Modo diálogo abierto" para todos.
              </p>

              <p className="font-semibold text-red-600 mt-2">
                Una vez más:
              </p>
              
              <p className="font-bold text-red-700 text-base">
                "Bienvenido a la Nueva Era" 😅❤
              </p>
            </div>
          </div>
        </div>
      </div>

      <P>{translation.Landing.text1}</P>
      <P>{translation.Landing.text2}</P>
      <P>{translation.Landing.text3}</P>
      <P>{translation.Landing.text4}</P>
    </ImageSection>
  );
}