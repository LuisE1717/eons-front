import ImageSection from "../../shared/components/ImageSection/ImageSection";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";
import AlertEmergency from "../../shared/AlertEmergency/AlertEmergency";

export default function First() {
  const { translation } = useTranslation();

  return (
    <ImageSection reverse={true} image="/manos.webp">
      <P bold className="text-4xl mb-4">{translation.Landing.title}</P>

      {/* Contenedor del marco y video */}
      <div className="relative w-full max-w-4xl mx-auto my-8">
        {/* Marco SVG como fondo */}
        <img 
          src="/marco_horizontal.svg" 
          alt="Marco decorativo" 
          className="w-full h-auto block"
        />
        
        {/* Contenedor del video — más grande, pero aún dentro del marco */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-1 sm:p-2 md:p-3 lg:p-4 box-border">
          <div className="relative w-full h-full max-w-full max-h-full rounded-md overflow-hidden
                          before:content-[''] before:absolute before:inset-0 before:rounded-md before:shadow-inner before:pointer-events-none
                          after:content-[''] after:absolute after:inset-0 after:rounded-md after:shadow-glow after:animate-pulse-glow after:pointer-events-none">
            <video 
              src="/Videos/1758511330848.mp4" 
              controls
              playsInline
              className="w-full h-full object-contain rounded-md
                         transition-transform duration-500 ease-out hover:scale-103 hover:rotate-0.5
                         filter brightness-105 contrast-110"
              style={{ 
                aspectRatio: '16 / 9',
                transform: 'scale(1.02)', // ¡Agrandado visual "un tilín"!
              }}
            >
              Tu navegador no soporta el elemento de video.
            </video>
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