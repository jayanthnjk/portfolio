import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NarrativePanel from './NarrativePanel';
import { NARRATIVE_PARAGRAPHS } from '../../data/aboutData';

describe('NarrativePanel', () => {
  it('renders the section label with text "About"', () => {
    render(<NarrativePanel reducedMotion={false} />);
    const label = screen.getByText('About');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('SPAN');
    expect(label.className).toContain('section-label');
  });

  it('renders an h2 heading with "About Me" and gradient text classes', () => {
    render(<NarrativePanel reducedMotion={false} />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Me' });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('font-heading');
    expect(heading.className).toContain('bg-gradient-to-r');
    expect(heading.className).toContain('bg-clip-text');
    expect(heading.className).toContain('text-transparent');
  });

  it('renders all 4 narrative paragraphs', () => {
    render(<NarrativePanel reducedMotion={false} />);
    NARRATIVE_PARAGRAPHS.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('styles the final paragraph distinctly with border-l and font-medium', () => {
    render(<NarrativePanel reducedMotion={false} />);
    const lastParagraph = screen.getByText(NARRATIVE_PARAGRAPHS[NARRATIVE_PARAGRAPHS.length - 1]);
    expect(lastParagraph.className).toContain('border-l-2');
    expect(lastParagraph.className).toContain('border-coral-500');
    expect(lastParagraph.className).toContain('font-medium');
    expect(lastParagraph.className).toContain('text-gray-200');
    expect(lastParagraph.className).toContain('pl-4');
  });

  it('styles non-final paragraphs with text-gray-300', () => {
    render(<NarrativePanel reducedMotion={false} />);
    const firstParagraph = screen.getByText(NARRATIVE_PARAGRAPHS[0]);
    expect(firstParagraph.className).toContain('text-gray-300');
    expect(firstParagraph.className).toContain('leading-[1.75]');
    expect(firstParagraph.className).toContain('mb-4');
  });

  it('uses semantic p elements for all paragraphs', () => {
    render(<NarrativePanel reducedMotion={false} />);
    NARRATIVE_PARAGRAPHS.forEach((text) => {
      const el = screen.getByText(text);
      expect(el.tagName).toBe('P');
    });
  });
});
