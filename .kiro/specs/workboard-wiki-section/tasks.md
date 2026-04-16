# Implementation Plan: Workboard Wiki Section

## Overview

Replace the locked/blurred `ProjectsSection` with a rich, wiki-like navigable section showcasing the Karnataka State Police AI-Powered Data Management Platform. Implementation proceeds bottom-up: data layer → leaf components → composite components → parent section → App integration → testing → cleanup.

## Tasks

- [x] 1. Create data layer and type definitions
  - [x] 1.1 Add workboard types to `src/types/index.ts`
    - Add interfaces: `PanelConfig`, `BeforeAfterRow`, `TechItem`, `TechCategory`, `ArchDecision`, `DesignPattern`, `DevChange`, `Screenshot`, `FeatureDomain`
    - _Requirements: 2.1, 4.2, 6.1, 6.2, 7.3, 8.1, 9.1, 9.3_

  - [x] 1.2 Create `src/data/workboardData.ts` with all static content
    - Export `PANELS`, `BEFORE_AFTER_DATA`, `TECH_STACK`, `ARCH_DECISIONS`, `DESIGN_PATTERNS`, `DEV_CHANGES`, `SCREENSHOTS`, `FEATURE_DOMAINS`, `SECURITY_LAYERS`, `RBAC_HIERARCHY`
    - All data curated from `public/WORKBOARD_FINAL_DOCUMENT.md`, omitting internal police operational details
    - _Requirements: 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.3, 5.4, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 9.1, 9.3, 9.6_

- [x] 2. Implement leaf display components
  - [x] 2.1 Create `src/components/workboard/TechBadge.tsx`
    - Pill-shaped badge with `rounded-full px-3 py-1.5 text-sm font-medium bg-gray-100 text-dark-900`
    - Hover: `scale(1.05)` + darker background, 200ms transition; suppressed when `reducedMotion`
    - Optional `purpose` shown as inline text or tooltip
    - _Requirements: 6.2, 10.4, 12.3, 12.5_

  - [x] 2.2 Create `src/components/workboard/DesignPatternCard.tsx`
    - Compact card: pattern name (bold), location (gray), reason (body text)
    - Subtle left border accent in coral-500
    - _Requirements: 8.1, 8.2_

  - [x] 2.3 Create `src/components/workboard/FeatureDomainCard.tsx`
    - Icon + title + 1-2 sentence description
    - Card style consistent with `card-elevated` pattern
    - _Requirements: 9.1, 9.2_

  - [ ]* 2.4 Write property tests for leaf display components
    - **Property 5: TechBadge renders category headings and all technology names**
    - **Property 6: DesignPatternCard renders name, location, and reason**
    - **Property 7: FeatureDomainCard renders icon, title, and description**
    - **Validates: Requirements 6.1, 6.2, 8.1, 8.2, 9.1, 9.2**

- [x] 3. Implement data presentation components
  - [x] 3.1 Create `src/components/workboard/BeforeAfterTable.tsx`
    - Desktop (md+): two-column table with "Before" (red-tinted `bg-red-50`) and "After" (green-tinted `bg-green-50`) columns
    - Mobile (<md): stacked card layout per row
    - Semantic `<table>` on desktop, `<div>` card list on mobile
    - _Requirements: 4.2, 4.3, 11.3_

  - [x] 3.2 Create `src/components/workboard/ArchitectureDiagram.tsx`
    - 5 horizontal layers: User Interface → API Gateway → Backend (Spring Boot) → AI Layer → Data Layer
    - Styled HTML/CSS block layout with Tailwind classes, not mermaid
    - Coral accent for AI layer, dark-900 for backend
    - Desktop: full horizontal layout; Mobile (<md): simplified vertical stack
    - Decorative elements have `aria-hidden="true"`; `sr-only` text description for screen readers
    - _Requirements: 5.1, 5.2, 11.5_

  - [x] 3.3 Create `src/components/workboard/SecurityFlowDiagram.tsx`
    - Zero Trust LLM data flow as styled step sequence
    - Steps: Officer Input → Sanitization → LLM (tokens only) → Tool Authorization → Database Query → Results bypass LLM → Officer
    - Color-coded: red for "LLM never sees", green for "secure path"
    - Horizontal on desktop, vertical on mobile
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 3.4 Create `src/components/workboard/RequestFlowSteps.tsx`
    - Numbered step sequence: User Input → Authentication → Language Detection → NLU → Sanitization → LLM Call → Tool Authorization → Database Query → Response Formatting → Audit Logging
    - Horizontal scrollable on desktop, vertical timeline on mobile
    - _Requirements: 8.4_

  - [ ]* 3.5 Write property test for BeforeAfterTable
    - **Property 4: BeforeAfterTable renders all row data**
    - **Validates: Requirements 4.2, 4.3**

- [x] 4. Implement screenshot gallery and lightbox
  - [x] 4.1 Create `src/components/workboard/ScreenshotGallery.tsx`
    - Grid: `grid-cols-2` (<640px), `grid-cols-3` (640-1024px), `flex flex-row` (>1024px)
    - Each thumbnail: `<button>` wrapping `<img loading="lazy" alt={alt}>`, `rounded-xl overflow-hidden`
    - Hover: `scale(1.03)` + increased shadow, 300ms transition
    - Min touch target: `min-h-[44px] min-w-[44px]`
    - _Requirements: 9.3, 9.6, 11.4, 11.6, 12.4, 14.1_

  - [x] 4.2 Create `src/components/workboard/Lightbox.tsx`
    - Fixed overlay: `fixed inset-0 z-50 bg-black/80 backdrop-blur-sm`
    - Close button, prev/next buttons with aria-labels
    - Keyboard: Escape → close, ArrowLeft → prev, ArrowRight → next
    - Focus trap: focus to close button on open, return focus to triggering thumbnail on close
    - `role="dialog"`, `aria-modal="true"`, `aria-label="Screenshot gallery"`
    - _Requirements: 9.4, 9.5, 13.4_

  - [ ]* 4.3 Write property tests for screenshot gallery and lightbox
    - **Property 8: ScreenshotGallery renders all images with src, alt, and lazy loading**
    - **Property 9: Thumbnail click triggers lightbox with correct index**
    - **Property 10: Lightbox keyboard navigation**
    - **Validates: Requirements 9.3, 9.4, 9.5, 9.6, 14.1**

- [x] 5. Checkpoint
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement ContentPanel and WikiNavigation
  - [x] 6.1 Create `src/components/workboard/ContentPanel.tsx`
    - PanelHeader as `<button>` with `aria-expanded`, `aria-controls`, icon + `<h3>` title + chevron
    - Chevron rotates 180° via Framer Motion on expand
    - Hover: shadow increase + coral chevron, 200-300ms transition
    - Collapsible region: `<motion.div>` with `role="region"`, `aria-labelledby`, height animation (350ms ease-out)
    - `reducedMotion` prop: `transition={{ duration: 0 }}` when active
    - Wrapped in `<AnimatedSection variant="fadeUp">` for scroll reveal
    - Uses `card-elevated` styling
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.7, 10.3, 10.5, 12.1, 12.2, 12.5, 13.1, 13.2, 13.3, 14.2, 14.3_

  - [x] 6.2 Create `src/components/workboard/WikiNavigation.tsx`
    - Desktop (lg+): `position: sticky; top: 6rem`, `w-64`, vertical list
    - Mobile (<lg): horizontal scrollable tab bar with `overflow-x: auto`, `scrollbar-hide`
    - Active item: coral-500 accent (`border-l-2` desktop, `border-b-2` mobile)
    - Each item is a `<button>` with `aria-current` when active
    - Keyboard navigable via Tab, visible focus ring `focus-visible:ring-2 focus-visible:ring-coral-500`
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.6, 10.6, 11.1, 13.5_

  - [ ]* 6.3 Write property tests for ContentPanel and WikiNavigation
    - **Property 1: Expand all / collapse all toggles every panel**
    - **Property 2: WikiNavigation renders all panel titles and highlights the active one**
    - **Property 3: Navigation click expands a collapsed panel**
    - **Property 11: ContentPanel accessibility attributes match expanded state**
    - **Validates: Requirements 2.6, 3.1, 3.2, 3.3, 3.6, 13.2, 13.3**

- [x] 7. Implement WorkboardWikiSection parent component
  - [x] 7.1 Create `src/components/workboard/WorkboardWikiSection.tsx`
    - `<section id="projects">` with `py-16 sm:py-28 px-5 sm:px-6 bg-white`
    - `max-w-[1400px] mx-auto` wrapper
    - Section heading with `font-heading` (Poppins), intro paragraph mentioning "Karnataka State Police" and "572+ personnel"
    - State: `expandedPanels: Set<string>` initialized with `new Set(["problem-solution"])`
    - State: `lightbox: { isOpen: boolean; currentIndex: number }`
    - Active panel tracking via `IntersectionObserver`
    - `togglePanel(id)`, `expandAll()`, `collapseAll()` handlers
    - Nav click: add panel to expanded set if not present, scroll to panel
    - Expand All / Collapse All control buttons
    - Responsive layout: sidebar + content on lg+, stacked on <lg
    - Compose all child components: WikiNavigation, 6 ContentPanels with their respective content components, Lightbox
    - Wire `useReducedMotion` hook and pass to children
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 3.2, 5.5, 10.1, 10.2, 10.5, 10.6, 11.1, 11.2, 14.5_

  - [ ]* 7.2 Write unit tests for WorkboardWikiSection
    - Verify `id="projects"`, `section` element, `h2` heading, intro paragraph, `max-w-[1400px]` wrapper
    - Verify no blur overlay, no lock icon, no "Section Locked" text
    - Verify first panel expanded, remaining 5 collapsed on initial render
    - Verify panel toggle on PanelHeader click
    - Verify expand all / collapse all functionality
    - Verify semantic HTML: `section`, `h2`, `h3`, `button` elements
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.5, 2.6, 13.1_

- [x] 8. Integrate into App and clean up
  - [x] 8.1 Update `src/App.tsx` to replace `ProjectsSection` with `WorkboardWikiSection`
    - Change import from `./components/ProjectsSection` to `./components/workboard/WorkboardWikiSection`
    - Replace `<ProjectsSection />` with `<WorkboardWikiSection />` in JSX
    - _Requirements: 1.1_

  - [x] 8.2 Verify build compiles without errors
    - Run `tsc -b` and `vite build` to confirm no type errors or build failures
    - _Requirements: 1.1, 14.5_

- [x] 9. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using `fast-check`
- Unit tests validate specific rendering, accessibility, and responsive behavior
- All components use TypeScript with the existing Tailwind CSS v4 + Framer Motion v12 stack
