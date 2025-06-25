'use client';

import './index.css';
import { useState, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useFormNavigation } from '@/hooks/useFormNavigation';
import { useFormState } from '@/hooks/useFormState';
import StepsIndicator from '@/components/onboarding/StepsIndicator';
import FormNavigation from '@/components/onboarding/FormNavigation';
import StepContent from '@/components/onboarding/StepContent';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const initialFormData = {
  email: '',
  password: '',
  aboutMe: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  birthdate: '',
};

const TOTAL_STEPS = 4;

function WizardContent() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { validateStep } = useFormValidation();
  
  const {
    formData,
    errors,
    isLoading,
    error,
    updateField,
    setErrors,
    setLoading,
    setError
  } = useFormState(initialFormData);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    updateField(name, value);
  }, [updateField]);

  const handleNext = useCallback(async () => {
    const validationErrors = validateStep(step, formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  }, [step, formData, validateStep, setErrors]);

  const handlePrev = useCallback(() => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      router.push('/data');
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [formData, router, setLoading, setError]);

  const {
    handleNext: onNext,
    handlePrevious: onPrev,
    handleSubmit: onSubmit,
    getStepActions,
    isLastStep
  } = useFormNavigation(step, TOTAL_STEPS, {
    onNext: handleNext,
    onPrev: handlePrev,
    onSubmit: handleSubmit
  });

  const { showBack, showNext, showSubmit, nextLabel, backLabel, submitLabel } = getStepActions();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <>
      <StepsIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
      
      <form onSubmit={isLastStep ? onSubmit : onNext}>
        <div className="form-container">
          <StepContent 
            step={step} 
            formData={formData} 
            errors={errors} 
            onChange={handleChange} 
          />
          
          <FormNavigation
            showBack={showBack}
            showNext={showNext}
            showSubmit={showSubmit}
            backLabel={backLabel}
            nextLabel={nextLabel}
            submitLabel={submitLabel}
            onBack={onPrev}
            onNext={onNext}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </form>
    </>
  );
}

export default function Wizard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WizardContent />
    </Suspense>
  );
}
