// Barrel file for common scripts TypeScript exports
// Export the handleApiRequest function and types for making API calls

// Export the handleApiRequest function and types for making API calls
export { handleApiRequest } from './apiConnector';
export type { ApiRequestConfig, HttpMethod } from './apiConnector';

// Export validation utility functions for form and field validation
export {
  validateFormFields,
  isValidPattern,
  isAlphabetNoSpace,
  isAlphabetSpace,
  isAlphabetNumericNoSpace,
  isAlphabetNumericSpace,
  isValidUUIDFormat,
  isValidPassword,
  isvalidOtpNumber,
  isvalidMobileNumber,
  isNumeric,
  isDecimal,
  isEmpty,
  isValidZipCode,
  isValidDate,
  isValidGeoLocation,
  isValidEmail,
  isValidUrl,
  isValidDescription,
  isValidSpecialChars,
  stripTags,
  prepareJsonObject
} from './validationsService';

// Export utility functions for data mapping and route handling
export {
  mapFormData,
  replaceRouteParams,
  getKeyValuePairs,
  getVisibleFields,
  transformKey
} from './utils';

// Export all session storage and cookie utilities
export * from './SessionLibrary';

// Export ActivityLibrary utilities
export { default as AddActivity } from './ActivityLibrary';
export * from './ActivityLibrary';

// Export dependency handler utilities
export * from './DependecyHandler';
