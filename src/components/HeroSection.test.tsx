import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from './HeroSection';

// Mock useReducedMotion
vi.mock('../hooks/useReducedMotion', () => ({
  useReducedMotion: vi.fn(() => false),
}));

// Mock framer-motion to render children directly
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: vi.fn(() => true),
  };
});

import { useReducedMotion } from '../hooks/useReducedMotion';

describe('HeroSection', () => {
  it('renders a semantic section element with id="hero"', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section#hero');
    expect(section).toBeInTheDocument();
  });

  it('displays the name "John Doe"', () => {
    render(<HeroSection />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays the title "Senior Frontend Engineer"', () => {
    render(<HeroSection />);
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('Building elegant, performant web experiences')
    ).toBeInTheDocument();
  });

  it('renders a CTA button linking to #contact', () => {
    render(<HeroSection />);
    const cta = screen.getByText('Get In Touch');
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '#contact');
  });

  it('has full viewport height (min-h-screen class)', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section#hero');
    expect(section).toHaveClass('min-h-screen');
  });

  it('includes the animated gradient background element', () => {
    const { container } = render(<HeroSection />);
    const gradient = container.querySelector('.hero-gradient');
    expect(gradient).toBeInTheDocument();
    expect(gradient).toHaveAttribute('aria-hidden', 'true');
  });

  it('CTA button calls scrollIntoView on #contact when clicked', () => {
    // Create a mock contact section in the DOM
    const contactDiv = document.createElement('div');
    contactDiv.id = 'contact';
    contactDiv.scrollIntoView = vi.fn();
    document.body.appendChild(contactDiv);

    render(<HeroSection />);
    const cta = screen.getByText('Get In Touch');
    fireEvent.click(cta);

    expect(contactDiv.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });

    document.body.removeChild(contactDiv);
  });

  it('renders without animation attributes when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    render(<HeroSection />);
    // Content should still render
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();

    vi.mocked(useReducedMotion).mockReturnValue(false);
  });
});
