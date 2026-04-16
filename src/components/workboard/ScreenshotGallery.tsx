import type { Screenshot } from '../../types';

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  onOpenLightbox: (index: number) => void;
}

export default function ScreenshotGallery({ screenshots, onOpenLightbox }: ScreenshotGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:flex-row lg:gap-4">
      {screenshots.map((screenshot, index) => (
        <button
          key={screenshot.src}
          type="button"
          onClick={() => onOpenLightbox(index)}
          className="min-h-[44px] min-w-[44px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:outline-none"
        >
          <img
            src={screenshot.src}
            alt={screenshot.alt}
            loading="lazy"
            className="aspect-video w-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
