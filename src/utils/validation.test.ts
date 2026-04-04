import { describe, it, expect } from 'vitest';
import { validateEmail, validateContactForm, isFormValid } from './validation';

describe('validateEmail', () => {
  it('returns true for valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(validateEmail('not-an-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('validateContactForm', () => {
  it('returns no errors for valid data', () => {
    const errors = validateContactForm({
      name: 'Jane',
      email: 'jane@example.com',
      intent: 'freelance',
    });
    expect(errors).toEqual({});
  });

  it('returns errors for empty fields', () => {
    const errors = validateContactForm({
      name: '',
      email: '',
      intent: '',
    });
    expect(errors.name).toBe('This field is required');
    expect(errors.email).toBe('This field is required');
    expect(errors.intent).toBe('Please select an intent');
  });

  it('returns error for invalid email', () => {
    const errors = validateContactForm({
      name: 'Jane',
      email: 'not-an-email',
      intent: 'remote',
    });
    expect(errors.email).toBe('Please enter a valid email address');
  });

  it('trims whitespace-only fields', () => {
    const errors = validateContactForm({
      name: '   ',
      email: '   ',
      intent: '',
    });
    expect(errors.name).toBe('This field is required');
  });
});

describe('isFormValid', () => {
  it('returns true when no errors', () => {
    expect(isFormValid({})).toBe(true);
  });

  it('returns false when any error message exists', () => {
    expect(isFormValid({ name: 'This field is required' })).toBe(false);
  });
});
