import { useEffect, useRef } from 'react';
import type { Screenshot } from '../../types';

interface LightboxProps {
  screenshots: Screenshot[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  screenshots,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus close button on open
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onNavigate((currentIndex - 1 + screenshots.length) % screenshots.length);
          break;
        case 'ArrowRight':
          onNavigate((currentIndex + 1) % screenshots.length);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, screenshots.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const current = screenshots[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot gallery"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-coral-500 transition-colors cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      {/* Previous button */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + screenshots.length) % screenshots.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-coral-500 transition-colors cursor-pointer"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      {/* Next button */}
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % screenshots.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-coral-500 transition-colors cursor-pointer"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* Image + caption */}
      <div className="flex flex-col items-center px-16" onClick={(e) => e.stopPropagation()}>
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-4xl max-h-[80vh] object-contain"
        />
        <p className="mt-3 text-white/80 text-sm text-center max-w-2xl">
          {current.alt}
        </p>
      </div>
    </div>
  );
}
