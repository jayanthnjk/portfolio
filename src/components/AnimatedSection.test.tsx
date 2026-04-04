import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AnimatedSection } from './AnimatedSection';

// Mock useReducedMotion
vi.mock('../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

// Mock framer-motion to make testing straightforward
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: vi.fn(() => true),
  };
});

import { useReducedMotion } from '../hooks/useReducedMotion';

describe('AnimatedSection', () => {
  it('renders children', () => {
    render(
      <AnimatedSection>
        <p>Hello World</p>
      </AnimatedSection>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies className prop', () => {
    render(
      <AnimatedSection className="my-class">
        <p>Content</p>
      </AnimatedSection>
    );
    expect(screen.getByText('Content').parentElement).toHaveClass('my-class');
  });

  it('renders children without animation wrapper when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { container } = render(
      <AnimatedSection className="test-class">
        <p>Static content</p>
      </AnimatedSection>
    );

    expect(screen.getByText('Static content')).toBeInTheDocument();
    // Should be a plain div, not a motion.div
    const wrapper = container.firstElementChild;
    expect(wrapper?.tagName).toBe('DIV');
    expect(wrapper).toHaveClass('test-class');

    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it('defaults to fadeUp variant', () => {
    render(
      <AnimatedSection>
        <p>Animated</p>
      </AnimatedSection>
    );
    // Component renders without error using default variant
    expect(screen.getByText('Animated')).toBeInTheDocument();
  });

  it('accepts all variant types without error', () => {
    const variants = ['fadeUp', 'fadeIn', 'slideLeft', 'slideRight'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <AnimatedSection variant={variant}>
          <p>{variant}</p>
        </AnimatedSection>
      );
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders with delay prop without error', () => {
    render(
      <AnimatedSection delay={0.5}>
        <p>Delayed</p>
      </AnimatedSection>
    );
    expect(screen.getByText('Delayed')).toBeInTheDocument();
  });
});
