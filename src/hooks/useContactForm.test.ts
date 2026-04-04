import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from './useContactForm';

describe('useContactForm', () => {
  it('initializes with empty form data', () => {
    const { result } = renderHook(() => useContactForm());
    expect(result.current.formData).toEqual({
      name: '',
      email: '',
      intent: '',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitted).toBe(false);
  });

  it('updates form data on change', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Alice' } } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formData.name).toBe('Alice');
  });

  it('shows errors on empty submit', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    });
    expect(result.current.errors.name).toBe('This field is required');
    expect(result.current.errors.email).toBe('This field is required');
    expect(result.current.errors.intent).toBe('Please select an intent');
    expect(result.current.isSubmitted).toBe(false);
  });

  it('opens mailto on valid submit', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Alice' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({ target: { name: 'email', value: 'alice@example.com' } } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({ target: { name: 'intent', value: 'freelance' } } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    });
    expect(result.current.isSubmitted).toBe(true);
    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('mailto:'), '_blank');
    openSpy.mockRestore();
  });
});
