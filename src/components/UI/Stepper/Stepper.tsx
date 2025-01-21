import React, { useState } from 'react';
import './Stepper.css';

interface StepperProps {
    totalSteps: number;
    onSubmit: () => void;
}

const Stepper: React.FC<StepperProps> = ({ totalSteps, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            onSubmit();
        }
    };

    return (
        <div className="stepper-container">
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
                <button
                    className="stepper-button prev"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                >
                    Anterior
                </button>
                <button className="stepper-button next" onClick={handleNextStep}>
                    {currentStep === totalSteps ? 'Enviar' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
};

export default Stepper;
