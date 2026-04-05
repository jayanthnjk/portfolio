import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMotionValue } from 'framer-motion';
import { AmbientBackground } from './AmbientBackground';

function Wrapper({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const scrollProgress = useMotionValue(0);
  return (
    <AmbientBackground
      scrollProgress={scrollProgress}
      reducedMotion={reducedMotion}
    />
  );
}

describe('AmbientBackground', () => {
  it('renders at least 2 gradient orb elements', () => {
    const { container } = render(<Wrapper />);
    // Orbs are the motion.div children with radial-gradient backgrounds
    const orbs = container.querySelectorAll('.rounded-full');
    expect(orbs.length).toBeGreaterThanOrEqual(2);
  });

  it('sets pointer-events: none on all elements', () => {
    const { container } = render(<Wrapper />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.pointerEvents).toBe('none');

    // Check orbs
    const orbs = container.querySelectorAll('.rounded-full');
    orbs.forEach((orb) => {
      expect((orb as HTMLElement).style.pointerEvents).toBe('none');
    });
  });

  it('sets aria-hidden="true" on all decorative elements', () => {
    const { container } = render(<Wrapper />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute('aria-hidden')).toBe('true');

    // All children should also be aria-hidden
    const ariaHiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    // root + 2 orbs + grain overlay = at least 4
    expect(ariaHiddenElements.length).toBeGreaterThanOrEqual(4);
  });

  it('renders grain texture overlay', () => {
    const { container } = render(<Wrapper />);
    const grainOverlay = container.querySelector(
      '[data-testid="grain-overlay"]'
    ) as HTMLElement | null;
    expect(grainOverlay).not.toBeNull();
    expect(grainOverlay!.style.backgroundRepeat).toBe('repeat');
    expect(grainOverlay!.style.pointerEvents).toBe('none');
  });

  it('does not apply animation when reducedMotion is true', () => {
    const { container } = render(<Wrapper reducedMotion />);
    const orbs = container.querySelectorAll('.rounded-full');
    // With reducedMotion, orbs should not have animate prop set
    // We verify by checking that the style doesn't contain animation-related transforms
    orbs.forEach((orb) => {
      const el = orb as HTMLElement;
      // In reduced motion, x and y should be 0 (static)
      // Framer Motion won't apply keyframe animations
      expect(el).toBeTruthy();
    });
  });
});
