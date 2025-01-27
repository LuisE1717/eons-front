import { useState, useEffect, useRef } from "react";
import Step from "../../shared/components/Step/Step";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";
import "./FirstStep.css";

export default function FirstStep() {
  const { translation } = useTranslation();

  // Textos para rotar
  const texts = [
    translation.Landing.text5,
    translation.Landing.text51,
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0); // Índice del texto actual
  const [visible, setVisible] = useState(true); // Controla la visibilidad
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referencia al intervalo

  // Función para manejar el cambio de texto
  const handleTextChange = () => {
    setVisible(false); // Oculta el texto

    setTimeout(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cambia al siguiente texto
      setVisible(true); // Muestra el texto
    }, 500); // Tiempo para completar la animación
  };

  useEffect(() => {
    // Inicia el intervalo
    intervalRef.current = setInterval(handleTextChange, 7000);

    return () => {
      // Limpia el intervalo al desmontar
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Solo se ejecuta una vez al montar

  return (
    <Step>
      <P bold className={visible ? "fade-in" : "fade-out"}>{texts[currentTextIndex]}</P>
    </Step>
  );
}
