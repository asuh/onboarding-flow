'use client';

import { useState, useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AboutMe from '@/components/AboutMe';
import Address from '@/components/Address';
import Birthdate from '@/components/Birthdate';
import Login from '@/components/Login';
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
}

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
  const [pageConfig, setPageConfig] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { step, formData } = state;

  // const isValid = () => {
  //   const newErrors = {};
  //   if (!formData.email) newErrors.email = 'Email is required';
  //   if (!formData.password) newErrors.password = 'Password is required';
  //   if (!formData.street) newErrors.street = 'Street is required';
  //   if (!formData.city) newErrors.city = 'City is required';
  //   if (!formData.state) newErrors.state = 'State is required';
  //   if (!formData.zip) newErrors.zip = 'Zip code is required';
  //   if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
  //   if (!formData.aboutMe) newErrors.aboutMe = 'About me is required';

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // }

  useEffect(() => {
    let ignore = false;

    const fetchConfig = async () => {
      setLoading(true)
      setErrors({})

      const response = await fetch(`/api/admin?pageNumber=${step}`);
      console.log({ response });
      const config = await response.json();

      if (ignore) {
        return
      } else {
        setPageConfig(config)
      }

      setLoading(false)
    }

    fetchConfig();

    return () => { ignore = true };
  }, [step]);
  
  const handleNext = (e) => {
    // if (isValid()) {
      if (step === 2) {
        handleSubmit(e)
        return
      }

      dispatch({ type: 'next_step' });
    // }
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
      router.push('/data')
    } catch (error) {
      console.error(error);
    }
    // dispatch({ type: 'reset' });
  };

  return (
    <>
      <div className="steps">
        {`Step ${step + 1} of 3`}
      </div>
      {loading && <p>'Loading...'</p>}
      <form onSubmit={handleSubmit}>
        {step === 0 && (<Login onChange={handleChange} errors={errors} formData={state.formData} />)}
        {step > 0 && pageConfig.map(config => {
          if (config.component === 'aboutMe') {
            return <AboutMe key={config.component} onChange={handleChange} errors={errors} formData={state.formData} />
          }
          if (config.component === 'address') {
            return <Address key={config.component} onChange={handleChange} errors={errors} formData={state.formData} />
          }
          if (config.component === 'birthdate') {
            return <Birthdate key={config.component} onChange={handleChange} errors={errors} formData={state.formData} />
          }
        })}
        <button type="button" onClick={handlePrevious} disabled={step === 0}>Previous</button>
        <button className="next" type="button" onClick={handleNext}>{step === 2 ? 'Submit' : 'Next'}</button>
      </form>
    </>
  );
};
