# Implementation Plan: About Section Redesign

## Overview

Rewrite the About section from a simple 2-column grid into an immersive, scroll-driven, dark-themed experience with glassmorphism skill cards, animated stat counters, ambient background, and full accessibility support. Implementation proceeds bottom-up: data layer → utility variants → leaf components → composite wrappers → parent orchestrator → wiring.

## Tasks

- [x] 1. Create data layer and motion variants
  - [x] 1.1 Create `src/data/aboutData.ts` with `SkillDomain`, `StatMetric` interfaces, `SKILL_DOMAINS` array (6 domains from existing `LAYERS` data in `AboutIllustration.tsx`), `STAT_METRICS` array, and `NARRATIVE_PARAGRAPHS` array
    - Export the `calculateTilt(cardWidth, cardHeight, cursorX, cursorY): { rotateX, rotateY }` pure function here (max ±8 degrees, guard clause for zero dimensions)
    - _Requirements: 4.1, 4.2, 4.5, 5.2, 6.1_

  - [x] 1.2 Add `skillCardReveal` and `staggerSkillCards` variants to `src/utils/motionVariants.ts`
    - `skillCardReveal`: hidden → `{ opacity: 0, y: 30, scale: 0.95 }`, visible → `{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }`
    - `staggerSkillCards`: hidden → `{ opacity: 0 }`, visible → `{ opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }`
    - _Requirements: 3.2, 7.2_

  - [ ]* 1.3 Write property test for `calculateTilt` — Property 1: Tilt calculation stays within rotation bounds
    - **Property 1: Tilt calculation stays within [-8, 8] degrees for any cursor position**
    - Generate random `{ width: fc.integer({min:1,max:4000}), height: fc.integer({min:1,max:4000}), cursorX: fc.double({min:0,max:width}), cursorY: fc.double({min:0,max:height}) }`. Assert both `rotateX` and `rotateY` are within [-8, 8] inclusive.
    - Minimum 100 iterations.
    - **Validates: Requirements 4.2**

- [x] 2. Implement leaf components (AmbientBackground, SkillCard, StatCounter, NarrativePanel)
  - [x] 2.1 Create `src/components/about/AmbientBackground.tsx`
    - Accept `scrollProgress: MotionValue<number>` and `reducedMotion: boolean` props
    - Render ≥2 gradient orbs (coral-500, dark-700 palette, 10-20% opacity) as `motion.div` elements with slow floating keyframes
    - Add grain texture overlay via CSS background
    - All elements: `pointer-events: none`, `aria-hidden="true"`
    - When `reducedMotion` is true: static positions, no animation
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 9.3, 10.3_

  - [x] 2.2 Create `src/components/about/SkillCard.tsx`
    - Accept `SkillCardProps` (icon, name, subtitle, description, tags, accentColor, reducedMotion, disableTilt)
    - Glassmorphism: `bg-white/[0.06] backdrop-blur-[20px] border border-white/[0.1] rounded-2xl`
    - 3D tilt via `onPointerMove` using `calculateTilt`, disabled when `disableTilt` is true
    - Glow on hover/focus: `box-shadow` with accent color at 15-25% opacity
    - Tags as accent-colored pill badges
    - `tabIndex={0}`, `role="article"`, `aria-label="{name} skill domain"`
    - Keyboard focus: same glow via focus state
    - When `reducedMotion`: instant state changes, no transitions
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.8, 4.9, 10.2_

  - [ ]* 2.3 Write property test for SkillCard — Property 2: SkillCard renders all required content and accessibility attributes
    - **Property 2: SkillCard renders all required content and accessibility attributes**
    - Generate random `SkillDomain` objects with arbitrary non-empty strings and tag arrays. Render `SkillCard`, assert name, subtitle, all tags present in DOM, `tabIndex=0`, and `aria-label` contains name.
    - Minimum 100 iterations.
    - **Validates: Requirements 4.5, 10.2**

  - [x] 2.4 Create `src/components/about/StatCounter.tsx`
    - Accept `StatCounterProps` (target, suffix, label, reducedMotion)
    - Count-up animation from 0 to target using `useMotionValue` + `useSpring` + `useTransform` + `useInView`
    - Spring config: `stiffness: 50, damping: 20` (~2s duration)
    - Poppins font, font-weight 700+, ≥36px on desktop
    - Label in gray-400, 13-14px
    - `aria-label="{target}{suffix} {label}"`
    - When `reducedMotion`: show final value immediately
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 10.4_

  - [ ]* 2.5 Write property test for StatCounter — Property 3: StatCounter aria-label contains full metric description
    - **Property 3: StatCounter aria-label contains full metric description**
    - Generate random `StatMetric` objects with arbitrary numbers, suffix strings, and label strings. Render `StatCounter` with `reducedMotion=true`, assert `aria-label` contains value, suffix, and label.
    - Minimum 100 iterations.
    - **Validates: Requirements 10.4**

  - [x] 2.6 Create `src/components/about/NarrativePanel.tsx`
    - Accept `reducedMotion: boolean` prop
    - Section label: `<span className="section-label">About</span>`
    - `<h2>` with Poppins, 42px desktop, gradient text (`bg-gradient-to-r from-white to-coral-400 bg-clip-text text-transparent`)
    - 4 paragraphs from `NARRATIVE_PARAGRAPHS` with `text-gray-300`, `leading-[1.75]`, `mb-4`
    - Final paragraph: `text-gray-200 font-medium border-l-2 border-coral-500 pl-4`
    - Semantic HTML: `h2`, `p` elements
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.1_

- [x] 3. Checkpoint — Ensure all leaf components compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement composite wrappers and parent orchestrator
  - [x] 4.1 Create `src/components/about/SkillShowcase.tsx`
    - Accept `reducedMotion: boolean` prop
    - Render 6 `SkillCard` components from `SKILL_DOMAINS` data
    - Bento grid layout: CSS Grid with varied card sizes on desktop, 2-col on tablet (768-1023px), single-col on mobile (<768px)
    - Staggered reveal using `staggerSkillCards` variant
    - Pass `disableTilt={true}` on screens < 1024px (detect via media query or window width)
    - _Requirements: 4.1, 4.7, 7.2, 8.3, 8.4_

  - [x] 4.2 Rewrite `src/components/AboutSection.tsx` as the scroll orchestrator
    - Full rewrite replacing existing content
    - `id="about"`, `bg-dark-900`, full-width dark section
    - `useScroll({ target: sectionRef, offset: ["start end", "end start"] })` + `useTransform` for parallax
    - `useReducedMotion` hook to gate all child animations
    - Compose: `AmbientBackground`, `NarrativePanel`, `SkillShowcase`, `StatCounter` row (3 counters from `STAT_METRICS`)
    - Desktop: CSS Grid with named areas for asymmetric layout. Mobile: single-column stack
    - `max-w-[1400px]` content wrapper
    - Stat counters in horizontal flex row with dividers on desktop
    - When `reducedMotion`: all content visible immediately, no parallax
    - Reserve space for animated elements to prevent CLS
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 3.1, 3.2, 3.3, 3.4, 3.5, 6.1, 7.1, 7.3, 7.4, 8.1, 8.2, 8.5, 8.6, 9.1, 9.2, 9.4, 9.5, 10.1, 10.5, 10.6_

- [x] 5. Final checkpoint — Ensure full integration compiles and all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- `fast-check` is already in devDependencies — property tests use it directly
- The existing `AboutIllustration.tsx` is no longer imported after the rewrite but is not deleted (can be cleaned up separately)
- All components use the existing `useReducedMotion` hook and `motionVariants.ts` utilities
- Property tests validate universal correctness properties; unit tests validate specific examples and edge cases
