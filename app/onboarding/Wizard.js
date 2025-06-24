'use client';

import { useState, useReducer, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AboutMe from '@/components/AboutMe';
import Address from '@/components/Address';
import Birthdate from '@/components/Birthdate';
import Login from '@/components/Login';
import styles from './index.css';

const fetchPageConfig = async (step) => {
  try {
    const res = await fetch(`/api/admin?page=${step}`);
    if (!res.ok) throw new Error('Failed to fetch page config');
    return await res.json();
  } catch (error) {
    console.error('Error fetching page config:', error);
    return { components: [] };
  }
};

const initialState = {
  step: 0,
  formData: {
    email: '',
    password: '',
    aboutMe: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    birthdate: '',
  },
  config: { components: [] },
  isLoading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case 'SET_CONFIG':
      return { ...state, config: action.payload, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

function WizardContent({ initialStep = 0 }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    step: initialStep,
  });
  const { step, formData, config, isLoading, error } = state;
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const loadConfig = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const config = await fetchPageConfig(step);
        dispatch({ type: 'SET_CONFIG', payload: config });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      }
    };

    loadConfig();
  }, [step]);

  const nextStep = () => {
    dispatch({ type: 'SET_STEP', payload: step + 1 });
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    dispatch({ type: 'SET_STEP', payload: step - 1 });
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FORM_DATA', payload: { [name]: value } });
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Login step validation
    if (step === 0) {
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      }
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    }
    
    // About Me step validation
    if (step === 1 && !formData.aboutMe?.trim()) {
      errors.aboutMe = 'Please tell us about yourself';
    }
    
    // Address step validation
    if (step === 2) {
      if (!formData.street?.trim()) errors.street = 'Street is required';
      if (!formData.city?.trim()) errors.city = 'City is required';
      if (!formData.state?.trim()) errors.state = 'State is required';
      if (!formData.zip?.trim()) {
        errors.zip = 'ZIP code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
        errors.zip = 'Invalid ZIP code format';
      }
    }
    
    // Birthdate step validation
    if (step === 3) {
      if (!formData.birthdate) {
        errors.birthdate = 'Birthdate is required';
      } else {
        const birthDate = new Date(formData.birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) {
          errors.birthdate = 'You must be at least 18 years old';
        } else if (age > 120) {
          errors.birthdate = 'Please enter a valid birthdate';
        }
      }
    }
    
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form before submission
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
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
      alert(`Error submitting form: ${error.message}`);
    }
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    nextStep();
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      onChange: handleChange,
      errors: validationErrors
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading form: {error}</div>;
  }

  return (
    <>
      <div className="steps">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`step ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}>
            {i + 1}
          </div>
        ))}
      </div>

      <form onSubmit={step === 3 ? handleSubmit : handleNext}>
        <div className="form-container">
          {renderStep()}
          <div className="button-group">
            {step > 0 && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                Back
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {step === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

export default function Wizard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WizardContent />
    </Suspense>
  );
}
