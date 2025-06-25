import React from 'react';

const StepsIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="steps">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div 
          key={i} 
          className={`step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;
