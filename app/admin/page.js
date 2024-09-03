'use client';

import { useState } from 'react';
import './admin.css'

const initialState = {
  fieldset1: {
    aboutMe: false,
    address: false,
    birthdate: false
  },
  fieldset2: {
    aboutMe: false,
    address: false,
    birthdate: false
  }
};

const fields = ['aboutMe', 'address', 'birthdate'];

export default function Page() {
  const [state, setState] = useState(initialState);

  // Handler for checkbox change
  const handleCheckboxChange = (fieldset, key) => {
    setState(prevState => {
      const newState = {
        ...prevState,
        [fieldset]: {
          ...prevState[fieldset],
          [key]: !prevState[fieldset][key]
        }
      };

      // Disable corresponding checkbox in the other fieldset if checked
      if (newState[fieldset][key]) {
        const otherFieldset = fieldset === 'fieldset1' ? 'fieldset2' : 'fieldset1';
        newState[otherFieldset] = {
          ...newState[otherFieldset],
          [key]: false
        };
      }

      return newState;
    });
  };

  return (
    <>
      <h1>Admin Page</h1>
      <p>Modify which step each component appears on. For example, select Birthdate and About Me for the 2nd step, then just address on the 3rd step.</p>
      <form>
        <fieldset>
          <legend>Step 2</legend>
          {fields.map(field => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                type="checkbox"
                checked={state.fieldset1[field]}
                onChange={() => handleCheckboxChange('fieldset1', field)}
                disabled={state.fieldset2[field]}
              />
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Step 3</legend>
          {fields.map(field => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                type="checkbox"
                checked={state.fieldset2[field]}
                onChange={() => handleCheckboxChange('fieldset2', field)}
                disabled={state.fieldset1[field]}
              />
            </label>
          ))}
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}