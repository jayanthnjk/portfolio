import type { ContactFormData, ContactFormErrors } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'This field is required';
  }

  if (!data.email.trim()) {
    errors.email = 'This field is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.intent) {
    errors.intent = 'Please select an intent';
  }

  return errors;
}

export function isFormValid(errors: ContactFormErrors): boolean {
  return Object.values(errors).every((msg) => !msg);
}
