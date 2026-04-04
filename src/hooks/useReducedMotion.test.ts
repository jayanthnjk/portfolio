import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  let listeners: Map<string, (event: MediaQueryListEvent) => void>;
  let matchesValue: boolean;

  beforeEach(() => {
    listeners = new Map();
    matchesValue = false;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn((query: string) => ({
        matches: matchesValue,
        media: query,
        addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
          listeners.set(event, handler);
        }),
        removeEventListener: vi.fn((event: string) => {
          listeners.delete(event);
        }),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when prefers-reduced-motion is not set', () => {
    matchesValue = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('returns true when prefers-reduced-motion: reduce is set', () => {
    matchesValue = true;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    matchesValue = false;
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      const handler = listeners.get('change');
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });
});
