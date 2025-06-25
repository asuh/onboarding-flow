import React from 'react';
import Login from '@/components/Login';
import AboutMe from '@/components/AboutMe';
import Address from '@/components/Address';
import Birthdate from '@/components/Birthdate';

const StepContent = ({ step, formData, errors, onChange }) => {
  const commonProps = {
    formData,
    onChange,
    errors
  };

  switch (step) {
    case 0:
      return <Login {...commonProps} />;
    case 1:
      return <AboutMe {...commonProps} />;
    case 2:
      return <Address {...commonProps} />;
    case 3:
      return <Birthdate {...commonProps} />;
    default:
      return null;
  }
};

export default StepContent;
