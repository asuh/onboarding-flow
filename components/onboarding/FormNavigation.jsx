import React from 'react';

const FormNavigation = ({
  showBack,
  showNext,
  showSubmit,
  backLabel,
  nextLabel,
  submitLabel,
  onBack,
  onNext,
  onSubmit,
  isLoading
}) => (
  <div className="button-group">
    {showBack && (
      <button 
        type="button" 
        onClick={onBack} 
        className="btn btn-secondary"
        disabled={isLoading}
      >
        {backLabel}
      </button>
    )}
    {showNext && (
      <button 
        type="button" 
        onClick={onNext} 
        className="btn btn-primary"
        disabled={isLoading}
      >
        {nextLabel}
      </button>
    )}
    {showSubmit && (
      <button 
        type="button" 
        onClick={onSubmit} 
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : submitLabel}
      </button>
    )}
  </div>
);

export default FormNavigation;
