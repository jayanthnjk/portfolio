import { useState, useEffect, useRef } from 'react';

/**
 * Tracks which section is currently visible in the viewport using IntersectionObserver.
 * Returns the ID of the most recently intersecting section.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // Clean up previous observer
    observerRef.current?.disconnect();

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio that is intersecting
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '0px 0px -60% 0px',
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current.observe(element);
      }
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
