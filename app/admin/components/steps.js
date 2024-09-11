'use client';

import { useState } from 'react';

const Steps = ({ initialFields }) => {
  const computeInitialState = (fields) => {
    const initialState = {};
    for (const field of fields) {
      initialState[field.component] = false; 
    }
    return {
      fieldset1: Object.assign({}, initialState),
      fieldset2: Object.assign({}, initialState),
    };
  };

  const [state, setState] = useState(() => computeInitialState(initialFields));

  const handleCheckboxChange = (fieldset, component) => {
    setState(prevState => {
      const newFieldset1 = Object.assign({}, prevState.fieldset1);
      const newFieldset2 = Object.assign({}, prevState.fieldset2);

      // Toggle the checked state
      if (fieldset === 'fieldset1') {
        newFieldset1[component] = !prevState.fieldset1[component];
        // Disable the corresponding checkbox in fieldset2
        newFieldset2[component] = false;
      } else {
        newFieldset2[component] = !prevState.fieldset2[component];
        // Disable the corresponding checkbox in fieldset1
        newFieldset1[component] = false;
      }

      return {
        fieldset1: newFieldset1,
        fieldset2: newFieldset2,
      };
    });
  };

  return (
    <>
      <fieldset>
        <legend>Step 2</legend>
        {initialFields.map(field => (
          console.log(state.fieldset1),
          console.log(field.pageNumber),
          <label key={field.component}>
            {field.component}
            <input
              type="checkbox"
              name={`fieldset1[${field.component}]`}
              checked={state.fieldset1[field.component]}
              onChange={() => handleCheckboxChange('fieldset1', field.component)}
              disabled={state.fieldset2[field.component]}
            />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Step 3</legend>
        {initialFields.map(field => (
          <label key={field.component}>
            {field.component}
            <input
              type="checkbox"
              name={`fieldset2[${field.component}]`}
              checked={state.fieldset2[field.component]}
              onChange={() => handleCheckboxChange('fieldset2', field.component)}
              disabled={state.fieldset1[field.component]}
            />
          </label>
        ))}
      </fieldset>
    </>
  );
};

export default Steps;