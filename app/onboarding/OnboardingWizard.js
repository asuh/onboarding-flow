'use client';

import { useState } from 'react';

const OnboardingWizard = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (event) => {
    const formData = new FormData(document.querySelector('form'));
    event.preventDefault();
  };

  return (
    <div>
      <form>
        <legend>User Onboarding</legend>
        {steps[currentStep].component}
        <button type="button" onClick={handlePrevious} disabled={currentStep === 0}>Previous</button>
        {currentStep === steps.length - 1 ? (
          <button type="submit" onClick={handleSubmit}>Submit</button>
        ) : (
          <button type="button" onClick={handleNext}>Next</button>
        )}
      </form>
    </div>
  );
};

export default OnboardingWizard;