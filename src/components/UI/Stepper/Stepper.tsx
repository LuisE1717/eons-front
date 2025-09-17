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
      <div className="stepper-progress-bar mb-2">
        <div
          className="stepper-progress"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="stepper-step-info mb-3 text-center">
        Lanzamiento {currentStep} de {totalSteps}
      </div>
      <div className="stepper-buttons">
        <Button
          type="button"
          loading={isLoading}
          onClick={handleClick}
          full={true}
          size="sm"
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-sm py-2"
        >
          {currentStep === totalSteps ? "Ver Resultados" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;