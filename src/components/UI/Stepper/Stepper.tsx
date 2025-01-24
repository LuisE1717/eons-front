import React, { useState } from "react";
import "./Stepper.css";
import Button from "../Button/Button";

interface StepperProps {
  totalSteps: number;
  isLoading: boolean;
  onChange?: () => void;
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  onChange,
  isLoading,
  currentStep,
}) => {


  return (
    <div className=" flex flex-col w-full sm:min-w-[300px] bg-white sm:px-14 px-8 sm:py-8 py-6 rounded-3xl shadow-lg">
      <div className="stepper-progress-bar">
        <div
          className="stepper-progress"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="stepper-step-info">
        Lanzamiento {currentStep} de {totalSteps}
      </div>
      <div className="stepper-buttons">
        <Button
          type="button"
          loading={isLoading}
          onClick={onChange}
          full={true}
          size="base"
        >
          {currentStep === totalSteps ? "Resultado" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
