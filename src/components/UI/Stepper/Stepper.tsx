import React from "react";
import "./Stepper.css";
import Button from "../Button/Button";

interface StepperProps {
  totalSteps: number;
  isLoading: boolean;
  onChange?: (e: React.MouseEvent) => void;
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({
  totalSteps = 3,
  onChange,
  isLoading,
  currentStep,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="">
      <div className="stepper-buttons">
        <Button
          type="button"
          loading={isLoading}
          onClick={handleClick}
          full={true}
          size="sm"
          className="spiritual-button bg-white text-purple-700 hover:bg-gray-100 transition-colors text-sm py-3 spiritual-glow wave-effect"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Stepper;