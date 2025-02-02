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

    const handleAnimationEnd = () => {
        setIsFlipping(false);
    };

    useEffect(() => {
        if (isOuterCircleFilled) {
            setIsFlipping(true);
        }
    }, [isOuterCircleFilled]);

    return (
        <div
            className={`money-circle ${className} ${isFlipping ? "flipping" : ""}`}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px solid #475569",
                perspective: "1000px",
                boxShadow: "0px 3px 6px rgba(240,171,252, 0.9)",
            }}
            onAnimationEnd={handleAnimationEnd}
        >
            {coin ? (
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: isOuterCircleFilled ? "transparent" : "#0e0e0d" ,
                        border: "2px solid #0e0e0d",
                        width: "60px",
                        height: "60px",
                        transition: "background-color 0.6s ease-in-out",
                    }}
                ></div>
            ) : (
                <div
                    style={{
                        borderRadius: "50%",
                        backgroundColor: isOuterCircleFilled ? "transparent" : "#0e0e0d" ,
                        border: "2px solid #0e0e0d",
                        width: "30px",
                        height: "30px",
                        transition: "background-color 0.6s ease-in-out",
                    }}
                ></div>
            )}
            
        </div>
    );
};

export default MoneyCircle;
