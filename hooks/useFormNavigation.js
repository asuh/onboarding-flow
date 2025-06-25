import { useCallback } from 'react';

export const useFormNavigation = (step, totalSteps, { onNext, onPrev, onSubmit }) => {
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;

  const handleNext = useCallback((e) => {
    e?.preventDefault();
    onNext();
  }, [onNext]);

  const handlePrevious = useCallback((e) => {
    e?.preventDefault();
    onPrev();
  }, [onPrev]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    onSubmit();
  }, [onSubmit]);

  const getStepActions = useCallback(() => {
    return {
      showBack: !isFirstStep,
      showNext: !isLastStep,
      showSubmit: isLastStep,
      nextLabel: 'Next',
      backLabel: 'Back',
      submitLabel: 'Submit'
    };
  }, [isFirstStep, isLastStep]);

  return {
    handleNext,
    handlePrevious,
    handleSubmit,
    getStepActions,
    isFirstStep,
    isLastStep
  };
};

export default useFormNavigation;
