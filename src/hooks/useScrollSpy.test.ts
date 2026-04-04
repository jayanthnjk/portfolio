import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollSpy } from './useScrollSpy';

describe('useScrollSpy', () => {
  let observeCallback: IntersectionObserverCallback;
  const observeMock = vi.fn();
  const disconnectMock = vi.fn();

  beforeEach(() => {
    observeMock.mockClear();
    disconnectMock.mockClear();

    // Mock IntersectionObserver
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((callback: IntersectionObserverCallback) => {
        observeCallback = callback;
        return {
          observe: observeMock,
          disconnect: disconnectMock,
          unobserve: vi.fn(),
        };
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up DOM elements
    document.body.innerHTML = '';
  });

  function createSections(ids: string[]) {
    for (const id of ids) {
      const el = document.createElement('section');
      el.id = id;
      document.body.appendChild(el);
    }
  }

  it('returns the first section ID as default active', () => {
    const sectionIds = ['hero', 'about', 'skills'];
    createSections(sectionIds);

    const { result } = renderHook(() => useScrollSpy(sectionIds));
    expect(result.current).toBe('hero');
  });

  it('returns empty string when no section IDs are provided', () => {
    const { result } = renderHook(() => useScrollSpy([]));
    expect(result.current).toBe('');
  });

  it('observes all section elements', () => {
    const sectionIds = ['hero', 'about', 'skills'];
    createSections(sectionIds);

    renderHook(() => useScrollSpy(sectionIds));

    expect(observeMock).toHaveBeenCalledTimes(3);
  });

  it('updates active ID when a section becomes visible', () => {
    const sectionIds = ['hero', 'about', 'skills'];
    createSections(sectionIds);

    const { result } = renderHook(() => useScrollSpy(sectionIds));

    const aboutEl = document.getElementById('about')!;
    act(() => {
      observeCallback(
        [
          {
            target: aboutEl,
            isIntersecting: true,
            intersectionRatio: 0.5,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('about');
  });

  it('picks the section with the highest intersection ratio', () => {
    const sectionIds = ['hero', 'about', 'skills'];
    createSections(sectionIds);

    const { result } = renderHook(() => useScrollSpy(sectionIds));

    const heroEl = document.getElementById('hero')!;
    const aboutEl = document.getElementById('about')!;

    act(() => {
      observeCallback(
        [
          {
            target: heroEl,
            isIntersecting: true,
            intersectionRatio: 0.2,
          } as unknown as IntersectionObserverEntry,
          {
            target: aboutEl,
            isIntersecting: true,
            intersectionRatio: 0.8,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe('about');
  });

  it('ignores non-intersecting entries', () => {
    const sectionIds = ['hero', 'about'];
    createSections(sectionIds);

    const { result } = renderHook(() => useScrollSpy(sectionIds));

    const aboutEl = document.getElementById('about')!;
    act(() => {
      observeCallback(
        [
          {
            target: aboutEl,
            isIntersecting: false,
            intersectionRatio: 0,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    // Should remain the default
    expect(result.current).toBe('hero');
  });

  it('disconnects observer on unmount', () => {
    const sectionIds = ['hero', 'about'];
    createSections(sectionIds);

    const { unmount } = renderHook(() => useScrollSpy(sectionIds));
    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });

  it('reconnects observer when sectionIds change', () => {
    const sectionIds1 = ['hero', 'about'];
    const sectionIds2 = ['hero', 'about', 'skills'];
    createSections(sectionIds2);

    const { rerender } = renderHook(({ ids }) => useScrollSpy(ids), {
      initialProps: { ids: sectionIds1 },
    });

    expect(observeMock).toHaveBeenCalledTimes(2);

    rerender({ ids: sectionIds2 });

    expect(disconnectMock).toHaveBeenCalled();
    // 2 from first render + 3 from second render
    expect(observeMock).toHaveBeenCalledTimes(5);
  });
});
