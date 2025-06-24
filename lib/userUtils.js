/**
 * Transforms raw user data into a consistent format with default values
 * @param {Object} user - Raw user data from the database
 * @returns {Object} Transformed user data with defaults
 */
export function transformUserData(user) {
  return {
    id: user.id || '',
    email: user.email || 'No email',
    street: user.street || '',
    city: user.city || '',
    state: user.state || '',
    zip: user.zip || '',
    birthdate: user.birthdate 
      ? new Date(user.birthdate).toLocaleDateString() 
      : 'N/A',
    aboutMe: user.aboutMe || 'N/A',
    createdAt: user.createdAt 
      ? new Date(user.createdAt).toLocaleString() 
      : 'N/A'
  };
}

/**
 * Formats an address from user data
 * @param {Object} user - User data object
 * @returns {string} Formatted address string
 */
export function formatAddress(user) {
  return [user.street, user.city, user.state, user.zip]
    .filter(Boolean)
    .join(', ') || 'N/A';
}
