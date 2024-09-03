'use client';

import { useState, useReducer } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import './index.css';

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
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'next_step':
      return { 
        ...state,
        step: state.step + 1 
      }
    case 'prev_step':
      return { 
        ...state,
        step: state.step - 1
      }
    case 'change':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.name]: action.value
        }
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export default function Wizard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }

    if (step === 1) {
      if (!formData.street) newErrors.street = 'Street is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'Zip code is required';
      if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    }

    if (step === 2) {
      if (!formData.aboutMe) newErrors.aboutMe = 'About me is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleClick = (event) => {
    event.preventDefault();

    if (validate()) {
      if (step === 2) {
        handleSubmit(event);
      } else {
        handleNext();
      }
    }
  }

  const handleNext = () => {
    dispatch({ type: 'next_step' });
  };

  const handlePrevious = () => {
    dispatch({ type: 'prev_step' });
  };

  const handleChange = (e) => {
    dispatch({ 
      type: 'change',
      name: e.target.name, 
      value: e.target.value, 
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error(error);
    }    
    // dispatch({ type: 'reset' });
  };

  const { step, formData } = state;

  return (
    <>
      <div className="steps">{step === 0 && 'Step 1'}{step === 1 && 'Step 2'}{step === 2 && 'Step 3'}</div>
      <form onSubmit={handleSubmit}>
        {step === 0 && <Step1 onChange={handleChange} errors={errors} formData={state.formData} />}
        {step === 1 && <Step2 onChange={handleChange} errors={errors} formData={state.formData} />}
        {step === 2 && <Step3 onChange={handleChange} errors={errors} formData={state.formData} />}
        <button type="button" onClick={handlePrevious} disabled={step === 0}>Previous</button>
        <button type={step === 2 ? 'submit' : 'button'} onClick={handleClick}>{step === 2 ? 'Submit' : 'Next'}</button>
      </form>
    </>
  );
};
