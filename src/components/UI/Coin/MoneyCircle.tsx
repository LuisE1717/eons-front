import React, {useEffect, useState} from "react";
import './MoneyCircle.css';

interface MoneyCircleProps {
  className?: string;
  isOuterCircleFilled: boolean;
  coin?: boolean;
}

const MoneyCircle: React.FC<MoneyCircleProps> = ({
                                                   className = "",
                                                   isOuterCircleFilled,
                                                   coin = true,
                                                 }) => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [isFloating, setIsFloating] = useState(false);

    const handleAnimationEnd = () => {
        setIsFlipping(false);
    };

    useEffect(() => {
        if (isOuterCircleFilled) {
            setIsFlipping(true);
            // Activar animación de flotación después de un breve retraso
            setTimeout(() => setIsFloating(true), 300);
        } else {
            setIsFloating(false);
        }
    }, [isOuterCircleFilled]);

    return (
        <div
            className={`money-circle ${className} ${isFlipping ? "flipping" : ""} ${isFloating ? "floating" : ""}`}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "3px solid #8B5CF6",
                perspective: "1000px",
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.7), 0 0 25px rgba(139, 92, 246, 0.5), inset 0 0 15px rgba(139, 92, 246, 0.3)",
                background: "radial-gradient(circle at 30% 30%, #4C1D95, #1F2937)",
                transition: "all 0.5s ease",
            }}
            onAnimationEnd={handleAnimationEnd}
        >
            {coin ? (
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: isOuterCircleFilled ? "transparent" : "#0e0e0d",
                        border: "3px solid #fcfaf5ff",
                        width: "60px",
                        height: "60px",
                        transition: "background-color 0.6s ease-in-out, box-shadow 0.6s ease-in-out",
                        boxShadow: isOuterCircleFilled ? "0 0 10px #fbf9f3ff, inset 0 0 10px #edece9ff" : "none",
                        background: isOuterCircleFilled ? "radial-gradient(circle at 40% 40%, #faf8f5ff, #f1ebe6ff)" : "#0e0e0d",
                    }}
                ></div>
            ) : (
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: isOuterCircleFilled ? "transparent" : "#0e0e0d",
                        border: "2px solid #f6f5f1ff",
                        width: "30px",
                        height: "30px",
                        transition: "background-color 0.6s ease-in-out, box-shadow 0.6s ease-in-out",
                        boxShadow: isOuterCircleFilled ? "0 0 8px #f6f5f2ff, inset 0 0 8px #f6f4f0ff" : "none",
                        background: isOuterCircleFilled ? "radial-gradient(circle at 40% 40%, #fbf9f6ff, #f9f6f3ff)" : "#0e0e0d",
                    }}
                ></div>
            )}
            
        </div>
    );
};

export default MoneyCircle;