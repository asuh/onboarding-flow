import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: null
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors || {}
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export const useFormState = (initialFormData) => {
  const [state, dispatch] = useReducer(formReducer, {
    formData: initialFormData,
    errors: {},
    isLoading: false,
    error: null
  });

  const updateField = useCallback((field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value
    });
  }, []);

  const setErrors = useCallback((errors) => {
    dispatch({
      type: 'SET_ERRORS',
      errors
    });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({
      type: 'SET_LOADING',
      isLoading
    });
  }, []);

  const setError = useCallback((error) => {
    dispatch({
      type: 'SET_ERROR',
      error
    });
  }, []);

  return {
    formData: state.formData,
    errors: state.errors,
    isLoading: state.isLoading,
    error: state.error,
    updateField,
    setErrors,
    setLoading,
    setError
  };
};

export default useFormState;
