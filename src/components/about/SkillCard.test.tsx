import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkillCard } from './SkillCard';

const defaultProps = {
  icon: <svg data-testid="skill-icon" />,
  name: 'UI Development',
  subtitle: 'React • TypeScript',
  description: 'Building responsive interfaces.',
  tags: ['React', 'TypeScript', 'Tailwind CSS'],
  accentColor: '#38bdf8',
  reducedMotion: false,
  disableTilt: false,
};

describe('SkillCard', () => {
  it('renders name, subtitle, description, and all tags', () => {
    render(<SkillCard {...defaultProps} />);
    expect(screen.getByText('UI Development')).toBeInTheDocument();
    expect(screen.getByText('React • TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Building responsive interfaces.')).toBeInTheDocument();
    for (const tag of defaultProps.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it('renders the icon', () => {
    render(<SkillCard {...defaultProps} />);
    expect(screen.getByTestId('skill-icon')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<SkillCard {...defaultProps} />);
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'UI Development skill domain');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('applies glassmorphism styling', () => {
    render(<SkillCard {...defaultProps} />);
    const card = screen.getByRole('article');
    expect(card.className).toContain('backdrop-blur-[20px]');
    expect(card.className).toContain('border');
    expect(card.className).toContain('rounded-2xl');
  });

  it('applies glow on keyboard focus and removes on blur', () => {
    render(<SkillCard {...defaultProps} />);
    const card = screen.getByRole('article');
    fireEvent.focus(card);
    expect(card.style.boxShadow).toBe('0 0 40px #38bdf840');
    fireEvent.blur(card);
    expect(card.style.boxShadow).toBe('none');
  });

  it('does not apply tilt when disableTilt is true', () => {
    render(<SkillCard {...defaultProps} disableTilt={true} />);
    const card = screen.getByRole('article');
    fireEvent.pointerMove(card, { clientX: 100, clientY: 50 });
    expect(card.style.transform).toContain('rotateX(0deg)');
    expect(card.style.transform).toContain('rotateY(0deg)');
  });

  it('disables transitions when reducedMotion is true', () => {
    render(<SkillCard {...defaultProps} reducedMotion={true} />);
    const card = screen.getByRole('article');
    expect(card.style.transition).toBe('none');
  });

  it('renders tags with accent color styling', () => {
    render(<SkillCard {...defaultProps} />);
    const tag = screen.getByText('React');
    // jsdom normalizes hex to rgb for color, but keeps non-standard values as-is
    expect(tag.style.color).toBe('rgb(56, 189, 248)');
    expect(tag.style.backgroundColor).toBe('rgba(56, 189, 248, 0.082)');
  });
});
