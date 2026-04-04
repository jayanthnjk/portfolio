# Implementation Plan: Portfolio Site

## Overview

Build a single-page portfolio application using React 18+, TypeScript, Vite, Tailwind CSS, and Framer Motion. Implementation proceeds bottom-up: types and data first, then hooks and utilities, then individual section components, and finally wiring everything together in the app shell.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - [x] 1.1 Initialize Vite project with React + TypeScript template, install dependencies (tailwindcss, framer-motion, fast-check, vitest, @testing-library/react, jsdom)
    - Configure `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`
    - Set up `vitest.config.ts` with jsdom environment and setup file
    - Create `src/test/setup.ts` with Testing Library cleanup and fast-check global config
    - _Requirements: 8.1, 9.1, 11.1_

  - [x] 1.2 Create TypeScript types and data files
    - Create `src/types/index.ts` with all interfaces: `NavLink`, `Skill`, `SkillCategory`, `Project`, `Experience`, `ContactFormData`, `ContactFormErrors`, `Theme`, `ThemeContextValue`
    - Create `src/data/skills.ts`, `src/data/projects.ts`, `src/data/experience.ts` with sample typed data
    - _Requirements: 4.1, 5.1, 6.1_

  - [x] 1.3 Create global styles with CSS custom properties and Tailwind directives
    - Create `src/index.css` with Tailwind directives, CSS custom properties for light/dark themes, color palette, font imports
    - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [x] 2. Implement utility modules and custom hooks
  - [x] 2.1 Implement motion variants (`src/utils/motionVariants.ts`)
    - Export `fadeUp`, `fadeIn`, `slideLeft`, `slideRight`, `staggerContainer`, `scaleOnHover` variant objects
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 2.2 Implement form validation (`src/utils/validation.ts`)
    - Implement `validateEmail`, `validateContactForm`, `isFormValid` functions
    - _Requirements: 7.2, 7.3, 7.4_

  - [ ]* 2.3 Write property test for form validation
    - **Property 9: Contact form validation correctness**
    - **Validates: Requirements 7.2, 7.3, 7.4**

  - [x] 2.4 Implement `useReducedMotion` hook (`src/hooks/useReducedMotion.ts`)
    - Detect `prefers-reduced-motion: reduce` media query
    - _Requirements: 8.5_

  - [ ]* 2.5 Write property test for reduced motion hook
    - **Property 11: Reduced motion preference is respected**
    - **Validates: Requirements 8.5**

  - [x] 2.6 Implement `useTheme` hook and ThemeProvider (`src/hooks/useTheme.ts`)
    - Manage dark/light state, persist to localStorage, fall back to `prefers-color-scheme`, apply class to `<html>`
    - _Requirements: 9.3, 9.4_

  - [ ]* 2.7 Write property test for theme toggle
    - **Property 12: Theme toggle round-trip**
    - **Validates: Requirements 9.3**

  - [x] 2.8 Implement `useScrollSpy` hook (`src/hooks/useScrollSpy.ts`)
    - Use IntersectionObserver to track which section is currently visible
    - _Requirements: 1.3_

  - [ ]* 2.9 Write property test for scroll spy
    - **Property 2: ScrollSpy returns the visible section**
    - **Validates: Requirements 1.3**

  - [x] 2.10 Implement `useContactForm` hook (`src/hooks/useContactForm.ts`)
    - Manage form state, run validation on submit, track `isSubmitted`
    - _Requirements: 7.1, 7.2, 7.3, 7.5_

  - [ ]* 2.11 Write property test for valid form submission
    - **Property 10: Valid form submission produces success state**
    - **Validates: Requirements 7.5**

- [x] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement reusable UI components
  - [x] 4.1 Implement `AnimatedSection` component (`src/components/AnimatedSection.tsx`)
    - Wrap children in `motion.div` with `useInView` (amount: 0.2), apply configurable variant, respect `useReducedMotion`
    - _Requirements: 8.2, 8.5_

  - [x] 4.2 Implement `ThemeToggle` component (`src/components/ThemeToggle.tsx`)
    - Render sun/moon icon button, call `useTheme().toggle()`, include `aria-label`
    - _Requirements: 9.3, 11.4_

  - [x] 4.3 Implement `Navbar` component (`src/components/Navbar.tsx`)
    - Fixed top navbar with section links, scroll spy active highlighting, hamburger menu at < 768px, smooth scroll on click, embed `ThemeToggle`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ]* 4.4 Write property tests for Navbar
    - **Property 1: Navbar renders a link for every section**
    - **Property 3: Mobile menu toggle flips state**
    - **Validates: Requirements 1.1, 1.6**

- [x] 5. Implement section components
  - [x] 5.1 Implement `HeroSection` component (`src/components/HeroSection.tsx`)
    - Full-viewport height, name/title/tagline with staggered fade-in, CTA button to Contact, animated gradient background
    - Use semantic `<section>` element with id
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 8.3, 11.2_

  - [x] 5.2 Implement `AboutSection` component (`src/components/AboutSection.tsx`)
    - Two-column layout (photo + text) on desktop, single-column on mobile, slide-in/fade-in animations, lazy-loaded image with alt text and error fallback
    - _Requirements: 3.1, 3.2, 3.3, 10.2, 11.3, 11.6_

  - [x] 5.3 Implement `SkillBar` component (`src/components/SkillBar.tsx`)
    - Render skill name, optional icon, animated progress bar from 0 to target level
    - _Requirements: 4.2, 4.3, 4.4_

  - [x] 5.4 Implement `SkillsSection` component (`src/components/SkillsSection.tsx`)
    - Group skills by category from data, render `SkillBar` per skill, animate on scroll
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 5.5 Write property test for skills rendering
    - **Property 4: Skills are rendered grouped with full detail**
    - **Validates: Requirements 4.1, 4.2, 4.4**

  - [x] 5.6 Implement `ProjectCard` component (`src/components/ProjectCard.tsx`)
    - Display thumbnail, title, description, tech tags, demo/repo links, hover scale+shadow effect, image error fallback
    - _Requirements: 5.1, 5.2, 11.3, 11.6_

  - [ ]* 5.7 Write property test for ProjectCard
    - **Property 5: ProjectCard displays all required fields**
    - **Validates: Requirements 5.1**

  - [x] 5.8 Implement `ProjectsSection` component (`src/components/ProjectsSection.tsx`)
    - Render filter buttons from unique tech categories, responsive grid of `ProjectCard`, `AnimatePresence` layout animation on filter, staggered fade-up on scroll
    - _Requirements: 5.1, 5.3, 5.4, 5.5_

  - [ ]* 5.9 Write property tests for project filtering
    - **Property 6: Filter buttons match unique technologies**
    - **Property 7: Project filtering shows only matching projects**
    - **Validates: Requirements 5.4, 5.5**

  - [x] 5.10 Implement `TimelineEntry` component (`src/components/TimelineEntry.tsx`)
    - Display company, role, date range, description with alternating slide-in animation
    - _Requirements: 6.1, 6.2_

  - [ ]* 5.11 Write property test for experience entry
    - **Property 8: Experience entry displays all required fields**
    - **Validates: Requirements 6.1**

  - [x] 5.12 Implement `ExperienceSection` component (`src/components/ExperienceSection.tsx`)
    - Vertical timeline with center line on desktop, left-aligned on mobile, render `TimelineEntry` per entry, sequential reveal animation
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 5.13 Implement `ContactSection` component (`src/components/ContactSection.tsx`)
    - Form with name/email/subject/message fields, use `useContactForm` hook, inline errors, success message, social media icon links
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [x] 5.14 Implement `Footer` component (`src/components/Footer.tsx`)
    - Navigation links with smooth scroll, social media icons, copyright with dynamic year
    - Use semantic `<footer>` element
    - _Requirements: 12.1, 12.2, 11.2_

  - [ ]* 5.15 Write property tests for Footer and semantic HTML
    - **Property 13: Semantic HTML elements for sections**
    - **Property 16: Footer displays current year**
    - **Validates: Requirements 11.2, 12.1**

  - [ ]* 5.16 Write property tests for image alt text and error fallback
    - **Property 14: All images have alt text**
    - **Property 15: Image error fallback**
    - **Validates: Requirements 11.3, 11.6**

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Wire everything together in App shell
  - [x] 7.1 Implement `App.tsx` with ThemeProvider, Navbar, all sections in order, and Footer
    - Wrap app in ThemeProvider context
    - Render sections in order: Hero, About, Skills, Projects, Experience, Contact
    - Use semantic `<main>` wrapper around section content
    - _Requirements: 1.1, 10.1, 10.2, 10.3, 10.4, 11.2, 11.4, 11.5_

  - [x] 7.2 Update `src/main.tsx` entry point to render App with Google Fonts link in `index.html`
    - Add font link to `index.html`, ensure Tailwind config references the font family
    - _Requirements: 9.5_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All components use semantic HTML and include accessibility attributes (alt text, aria-labels, keyboard navigation)
