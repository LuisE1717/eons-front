import React, {useEffect, useState} from "react";
import './MoneyCircle.css';

interface MoneyCircleProps {
  className?: string;
  isOuterCircleFilled: boolean;
  coin?: boolean;
  isConfirmed?: boolean;
  isFaceUp?: boolean;
}

const MoneyCircle: React.FC<MoneyCircleProps> = ({
                                                   className = "",
                                                   isOuterCircleFilled,
                                                   coin = true,
                                                   isConfirmed = false,
                                                   isFaceUp = true,
                                                 }) => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [isFloating, setIsFloating] = useState(false);
    const [showBlackFace, setShowBlackFace] = useState(!isFaceUp);

    const handleAnimationEnd = () => {
        setIsFlipping(false);
    };

    useEffect(() => {
        if (isOuterCircleFilled) {
            setIsFlipping(true);
            // Si la cara actual es negra, mantenerla visible durante la animación
            if (!isFaceUp) {
                setShowBlackFace(true);
                // Después de la animación de brillo, girar a la cara blanca
                setTimeout(() => {
                    setShowBlackFace(false);
                }, 800); // Tiempo suficiente para mostrar el brillo
            }
            // Activar animación de flotación después de un breve retraso
            setTimeout(() => setIsFloating(true), 300);
        } else {
            setIsFloating(false);
            // Resetear al estado original cuando no está confirmado
            setShowBlackFace(!isFaceUp);
        }
    }, [isOuterCircleFilled, isFaceUp]);

    // Determinar si mostrar cara blanca o negra
    const shouldShowWhiteFace = isFaceUp || !showBlackFace;

    return (
        <div
            className={`money-circle ${className} ${isFlipping ? "flipping" : ""} ${isFloating ? "floating" : ""} ${isConfirmed ? "confirmed" : ""}`}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: isConfirmed ? "3px solid #FFD700" : "3px solid #8B5CF6",
                perspective: "1000px",
                boxShadow: isConfirmed ? 
                  "0 0 20px rgba(255, 215, 0, 0.8), 0 0 35px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.4)" :
                  "0 0 15px rgba(139, 92, 246, 0.7), 0 0 25px rgba(139, 92, 246, 0.5), inset 0 0 15px rgba(139, 92, 246, 0.3)",
                background: isConfirmed ? 
                  "radial-gradient(circle at 30% 30%, #FFD700, #DAA520)" :
                  "radial-gradient(circle at 30% 30%, #4C1D95, #1F2937)",
                transition: "all 0.5s ease",
            }}
            onAnimationEnd={handleAnimationEnd}
        >
            {coin ? (
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: shouldShowWhiteFace ? "transparent" : "#0e0e0d",
                        border: isConfirmed ? "3px solid #FFD700" : "3px solid #fcfaf5ff",
                        width: "60px",
                        height: "60px",
                        transition: "background-color 0.6s ease-in-out, box-shadow 0.6s ease-in-out",
                        boxShadow: shouldShowWhiteFace ? 
                          (isConfirmed ? 
                            "0 0 15px #FFD700, inset 0 0 15px #FFEF00" : 
                            "0 0 10px #fbf9f3ff, inset 0 0 10px #edece9ff") : 
                          (isConfirmed ? 
                            "0 0 15px #FFD700, inset 0 0 15px #333333" : 
                            "0 0 10px #333333, inset 0 0 10px #1a1a1a"),
                        background: shouldShowWhiteFace ? 
                          (isConfirmed ? 
                            "radial-gradient(circle at 40% 40%, #FFF9C4, #FFEB3B)" : 
                            "radial-gradient(circle at 40% 40%, #faf8f5ff, #f1ebe6ff)") : 
                          (isConfirmed ? 
                            "radial-gradient(circle at 40% 40%, #555555, #333333)" : 
                            "#0e0e0d"),
                    }}
                ></div>
            ) : (
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: shouldShowWhiteFace ? "transparent" : "#0e0e0d",
                        border: isConfirmed ? "2px solid #FFD700" : "2px solid #f6f5f1ff",
                        width: "30px",
                        height: "30px",
                        transition: "background-color 0.6s ease-in-out, box-shadow 0.6s ease-in-out",
                        boxShadow: shouldShowWhiteFace ? 
                          (isConfirmed ? 
                            "0 0 12px #FFD700, inset 0 0 12px #FFEF00" : 
                            "0 0 8px #f6f5f2ff, inset 0 0 8px #f6f4f0ff") : 
                          (isConfirmed ? 
                            "0 0 12px #FFD700, inset 0 0 12px #333333" : 
                            "0 0 8px #333333, inset 0 0 8px #1a1a1a"),
                        background: shouldShowWhiteFace ? 
                          (isConfirmed ? 
                            "radial-gradient(circle at 40% 40%, #FFF9C4, #FFEB3B)" : 
                            "radial-gradient(circle at 40% 40%, #fbf9f6ff, #f9f6f3ff)") : 
                          (isConfirmed ? 
                            "radial-gradient(circle at 40% 40%, #555555, #333333)" : 
                            "#0e0e0d"),
                    }}
                ></div>
            )}
            
        </div>
    );
};

export default MoneyCircle;