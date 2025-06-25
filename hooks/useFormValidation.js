import { useCallback } from 'react';

export const useFormValidation = () => {
  const validateEmail = useCallback((email) => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return null;
  }, []);

  const validatePassword = useCallback((password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  }, []);

  const validateAboutMe = useCallback((aboutMe) => {
    if (!aboutMe?.trim()) return 'Please tell us about yourself';
    return null;
  }, []);

  const validateAddress = useCallback(({ street, city, state, zip }) => {
    const errors = {};
    if (!street?.trim()) errors.street = 'Street is required';
    if (!city?.trim()) errors.city = 'City is required';
    if (!state?.trim()) errors.state = 'State is required';
    if (!zip?.trim()) {
      errors.zip = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      errors.zip = 'Invalid ZIP code format';
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }, []);

  const validateBirthdate = useCallback((birthdate) => {
    if (!birthdate) return 'Birthdate is required';
    
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) return 'You must be at least 18 years old';
    if (age > 120) return 'Please enter a valid birthdate';
    
    return null;
  }, []);

  const validateStep = useCallback((step, formData) => {
    const errors = {};
    
    switch (step) {
      case 0: // Login
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        if (emailError) errors.email = emailError;
        if (passwordError) errors.password = passwordError;
        break;
        
      case 1: // About Me
        const aboutMeError = validateAboutMe(formData.aboutMe);
        if (aboutMeError) errors.aboutMe = aboutMeError;
        break;
        
      case 2: // Address
        const addressErrors = validateAddress(formData);
        if (addressErrors) Object.assign(errors, addressErrors);
        break;
        
      case 3: // Birthdate
        const birthdateError = validateBirthdate(formData.birthdate);
        if (birthdateError) errors.birthdate = birthdateError;
        break;
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }, [validateEmail, validatePassword, validateAboutMe, validateAddress, validateBirthdate]);

  return {
    validateStep,
    validateEmail,
    validatePassword,
    validateAboutMe,
    validateAddress,
    validateBirthdate
  };
};

export default useFormValidation;
