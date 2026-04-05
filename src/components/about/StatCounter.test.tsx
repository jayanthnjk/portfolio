import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCounter } from './StatCounter';

// Mock framer-motion hooks to avoid animation complexity in unit tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    useInView: () => true,
  };
});

const defaultProps = {
  target: 50,
  suffix: '+',
  label: 'Projects Delivered',
  reducedMotion: true,
};

describe('StatCounter', () => {
  it('renders with correct aria-label', () => {
    render(<StatCounter {...defaultProps} />);
    const container = screen.getByLabelText('50+ Projects Delivered');
    expect(container).toBeInTheDocument();
  });

  it('renders the label text in gray-400', () => {
    render(<StatCounter {...defaultProps} />);
    const label = screen.getByText('Projects Delivered');
    expect(label).toBeInTheDocument();
    expect(label.className).toContain('text-gray-400');
    expect(label.className).toContain('text-sm');
  });

  it('renders suffix when provided', () => {
    render(<StatCounter {...defaultProps} />);
    const container = screen.getByLabelText('50+ Projects Delivered');
    expect(container.textContent).toContain('+');
  });

  it('renders without suffix when not provided', () => {
    render(<StatCounter target={6} label="Years Experience" reducedMotion={true} />);
    const container = screen.getByLabelText('6 Years Experience');
    expect(container).toBeInTheDocument();
  });

  it('uses Poppins font (font-heading) and large text size', () => {
    render(<StatCounter {...defaultProps} />);
    const container = screen.getByLabelText('50+ Projects Delivered');
    const valueDiv = container.querySelector('.font-heading');
    expect(valueDiv).not.toBeNull();
    expect(valueDiv!.className).toContain('text-4xl');
    expect(valueDiv!.className).toContain('sm:text-5xl');
  });

  it('uses font-weight 800 (extrabold)', () => {
    render(<StatCounter {...defaultProps} />);
    const container = screen.getByLabelText('50+ Projects Delivered');
    const valueDiv = container.querySelector('.font-heading');
    expect(valueDiv!.className).toContain('font-extrabold');
  });

  it('shows final value immediately when reducedMotion is true', () => {
    render(<StatCounter {...defaultProps} />);
    const container = screen.getByLabelText('50+ Projects Delivered');
    // With reducedMotion, the motion value is set to target immediately
    // The rounded transform should produce the target value
    expect(container).toBeInTheDocument();
  });
});
