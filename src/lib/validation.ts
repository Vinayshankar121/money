/**
 * Form validation utilities for SPARK 2026 event registration.
 * Provides type-safe validation functions with detailed error messages.
 * @module validation
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address format
 * @param email Email address to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  const trimmedEmail = email?.trim?.() ?? '';

  if (!trimmedEmail || trimmedEmail.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
}

/**
 * Validate phone number (Indian format)
 * @param phone Phone number to validate
 * @returns Validation result
 */
export function validatePhone(phone: string): ValidationResult {
  const trimmedPhone = phone?.trim?.() ?? '';

  if (!trimmedPhone || trimmedPhone.length === 0) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove spaces and hyphens
  const cleanPhone = trimmedPhone.replace(/[+\s\-()]/g, '');
  const normalizedPhone =
    cleanPhone.startsWith('91') && cleanPhone.length === 12
      ? cleanPhone.slice(2)
      : cleanPhone;

  // Check if it's a valid Indian phone number (10 digits)
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(normalizedPhone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  return { isValid: true };
}

/**
 * Validate name (alphabetic characters and spaces only)
 * @param name Name to validate
 * @param fieldName Field name for error messages
 * @returns Validation result
 */
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  const trimmedName = name?.trim?.() ?? '';

  if (!trimmedName || trimmedName.length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` };
  }

  const nameRegex = /^[a-zA-Z\s.'-]+$/;

  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: `${fieldName} contains invalid characters` };
  }

  return { isValid: true };
}

/**
 * Validate college name
 * @param college College name to validate
 * @returns Validation result
 */
export function validateCollege(college: string): ValidationResult {
  const trimmedCollege = college?.trim?.() ?? '';

  if (!trimmedCollege || trimmedCollege.length === 0) {
    return { isValid: false, error: 'College name is required' };
  }

  if (trimmedCollege.length < 3) {
    return { isValid: false, error: 'College name must be at least 3 characters' };
  }

  return { isValid: true };
}

/**
 * Validate event selection
 * @param events Array of selected event IDs
 * @returns Validation result
 */
export function validateEventSelection(events: string[]): ValidationResult {
  if (!events || events.length === 0) {
    return { isValid: false, error: 'Please select at least one event' };
  }

  const invalidEvent = events.find(eventId => !eventId || eventId.trim().length === 0);
  if (invalidEvent !== undefined) {
    return { isValid: false, error: 'Selected events contain invalid entries' };
  }

  if (events.length > 5) {
    return { isValid: false, error: 'You can select a maximum of 5 events' };
  }

  return { isValid: true };
}

/**
 * Validate registration form
 * @param formData Form data to validate
 * @returns Object with validation results for each field
 */
export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  events: string[];
}

export interface RegistrationValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    college?: string;
    events?: string;
  };
}

export function validateRegistrationForm(
  formData: RegistrationFormData
): RegistrationValidationResult {
  const errors: RegistrationValidationResult['errors'] = {};

  const nameResult = validateName(formData.name);
  if (!nameResult.isValid) {
    errors.name = nameResult.error;
  }

  const emailResult = validateEmail(formData.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }

  const phoneResult = validatePhone(formData.phone);
  if (!phoneResult.isValid) {
    errors.phone = phoneResult.error;
  }

  const collegeResult = validateCollege(formData.college);
  if (!collegeResult.isValid) {
    errors.college = collegeResult.error;
  }

  const eventsResult = validateEventSelection(formData.events);
  if (!eventsResult.isValid) {
    errors.events = eventsResult.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
