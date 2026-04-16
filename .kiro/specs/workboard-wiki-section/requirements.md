# Requirements Document

## Introduction

Redesign the existing "Recent Case Studies" / ProjectsSection — currently a locked/blurred placeholder with a lock icon overlay — into a wiki-like structured section that showcases the Karnataka State Police AI-Powered Data Management Platform project. The section replaces the blurred project card grid with a rich, navigable, collapsible-panel layout that highlights portfolio-relevant content from `public/WORKBOARD_FINAL_DOCUMENT.md`: the problem solved, technology stack, architecture decisions, security approach, design patterns, and key features. The section curates only content that demonstrates technical depth, architecture thinking, and problem-solving ability — omitting internal police operational data, personnel details, and raw procedural information. The workboard screenshots (`public/workboard/1.png` through `6.png`) are incorporated as visual evidence. The design is consistent with the portfolio's coral/dark-900 theme, uses Tailwind CSS, Framer Motion animations, and the existing `AnimatedSection` component, and is fully responsive.

## Glossary

- **Wiki_Section**: The top-level React component that replaces `ProjectsSection`, rendering the wiki-like structured content area identified by `id="projects"`
- **Wiki_Navigation**: The table-of-contents sidebar or inline navigation component that lists all content panels and allows direct jumping to any panel
- **Content_Panel**: A collapsible/expandable container that holds one thematic group of content (e.g., "Problem & Solution", "System Architecture", "Technology Stack")
- **Panel_Header**: The clickable header area of a Content_Panel that displays the panel title, an icon, and an expand/collapse chevron indicator
- **Screenshot_Gallery**: A component that displays the workboard screenshots (`1.png` through `6.png`) in a browsable format with optional lightbox or carousel behavior
- **Tech_Badge**: A pill-shaped inline element displaying a technology name, styled consistently with the portfolio's existing tag patterns
- **Architecture_Diagram**: A visual representation of the system architecture rendered as a styled static diagram or illustrated block layout (not raw mermaid)
- **Before_After_Table**: A comparison component showing the transformation from manual processes to the AI-powered solution
- **Reduced_Motion_Mode**: The accessible fallback state activated when `prefers-reduced-motion: reduce` is detected, disabling all non-essential animations via the existing `useReducedMotion` hook

## Requirements

### Requirement 1: Replace Locked ProjectsSection with Wiki Section

**User Story:** As a portfolio visitor, I want to see real project content instead of a locked/blurred placeholder, so that I can evaluate the developer's actual work and technical capabilities.

#### Acceptance Criteria

1. THE Wiki_Section SHALL replace the existing `ProjectsSection` component in `App.tsx`, rendering at the same position in the page layout (between SkillsSection and ExperienceSection)
2. THE Wiki_Section SHALL retain the `id="projects"` attribute for scroll-spy navigation compatibility with the existing Navbar component
3. THE Wiki_Section SHALL remove the blur overlay, lock icon, and all "Section Locked" UI elements entirely
4. THE Wiki_Section SHALL display a section heading using the Poppins font family consistent with other section headings on the site
5. THE Wiki_Section SHALL include a brief introductory paragraph summarizing the project (AI-powered data management platform for Karnataka State Police, managing 572+ personnel) before the collapsible content panels
6. THE Wiki_Section SHALL maintain a maximum content width of 1400px centered horizontally, consistent with the rest of the portfolio site

### Requirement 2: Collapsible Content Panels

**User Story:** As a portfolio visitor, I want to expand and collapse content sections independently, so that I can focus on the topics that interest me without being overwhelmed by a wall of text.

#### Acceptance Criteria

1. THE Wiki_Section SHALL organize content into at least six Content_Panel components covering: Problem & Solution, System Architecture, Technology Stack, Security Architecture, Design Patterns, and Key Features
2. WHEN a visitor clicks a Panel_Header, THE Content_Panel SHALL toggle between expanded and collapsed states with a smooth height animation of 300-400ms duration using an ease-out timing function
3. THE Panel_Header SHALL display a chevron icon that rotates 180 degrees when the Content_Panel transitions between collapsed and expanded states
4. THE Panel_Header SHALL display a descriptive icon (relevant to the panel topic) alongside the panel title text
5. WHEN the Wiki_Section first renders, THE Wiki_Section SHALL display the first Content_Panel in an expanded state and all remaining Content_Panels in a collapsed state
6. THE Content_Panel SHALL support an "expand all" and "collapse all" control that toggles all panels simultaneously
7. WHILE Reduced_Motion_Mode is active, THE Content_Panel SHALL toggle between expanded and collapsed states instantly without height animation

### Requirement 3: Wiki Navigation

**User Story:** As a portfolio visitor, I want a table of contents or navigation element that lists all content sections, so that I can quickly jump to the topic I am interested in.

#### Acceptance Criteria

1. THE Wiki_Navigation SHALL list all Content_Panel titles as clickable navigation items
2. WHEN a visitor clicks a Wiki_Navigation item, THE Wiki_Section SHALL scroll to the corresponding Content_Panel and expand it if it is currently collapsed
3. THE Wiki_Navigation SHALL visually highlight the navigation item corresponding to the currently visible or most recently expanded Content_Panel
4. THE Wiki_Navigation SHALL render as a horizontal scrollable tab bar or inline navigation on screens narrower than 1024px (lg breakpoint)
5. THE Wiki_Navigation SHALL render as a sticky sidebar on screens 1024px and wider, remaining visible as the visitor scrolls through the content panels
6. THE Wiki_Navigation SHALL use the coral-500 (#ff6b4a) accent color for the active navigation item indicator

### Requirement 4: Problem and Solution Content Panel

**User Story:** As a portfolio visitor, I want to understand the real-world problem this project solved and the transformation it delivered, so that I can assess the developer's problem-solving ability and impact.

#### Acceptance Criteria

1. THE Problem & Solution Content_Panel SHALL present the core problem statement: managing 572+ personnel across manual paper-based processes for duty rostering, leave management, attendance tracking, and ad-hoc assignments
2. THE Problem & Solution Content_Panel SHALL include a Before_After_Table comparing the manual processes (paper rosters, physical letters, handwritten forms, phone calls) with the AI-powered solution (natural language commands, automated scheduling, OCR document processing, real-time dashboards)
3. THE Before_After_Table SHALL highlight at least six transformation areas: Duty Rostering, Leave Requests, Daily Attendance, Ad-hoc Assignments, Personnel Queries, and Audit Trail
4. THE Problem & Solution Content_Panel SHALL list the key capabilities delivered: Natural Language Chat, Voice Commands, Document Intelligence, AI-Powered Scheduling, Role-Based Access, and Complete Audit Trail
5. THE Problem & Solution Content_Panel SHALL omit internal police operational details (specific officer names, badge numbers, location names) and focus on the technical transformation narrative

### Requirement 5: System Architecture Content Panel

**User Story:** As a technical recruiter or fellow developer, I want to see the system architecture at a glance, so that I can understand the scale, complexity, and architectural thinking behind the project.

#### Acceptance Criteria

1. THE System Architecture Content_Panel SHALL present the high-level architecture as a styled Architecture_Diagram showing the four main layers: User Interface, API Gateway, Backend (Spring Boot), AI Layer, and Data Layer
2. THE Architecture_Diagram SHALL be rendered as a styled HTML/CSS block layout or illustrated component — not as a raw mermaid code block
3. THE System Architecture Content_Panel SHALL describe the frontend architecture highlights: React with lazy-loaded pages, context providers for auth/theme/language, protected routes, and the AI chat panel
4. THE System Architecture Content_Panel SHALL describe the backend service architecture highlights: ChatService facade orchestrating the AI pipeline (language detection, NLU, sanitization, prompt building, tool registry, authorization)
5. THE System Architecture Content_Panel SHALL include at least one workboard screenshot from the Screenshot_Gallery showing the application interface

### Requirement 6: Technology Stack Content Panel

**User Story:** As a portfolio visitor, I want to see the full technology stack organized by category, so that I can quickly assess the breadth of technologies used and the developer's technical range.

#### Acceptance Criteria

1. THE Technology Stack Content_Panel SHALL organize technologies into three categories: Frontend, Backend, and AI/ML
2. THE Technology Stack Content_Panel SHALL display each technology as a Tech_Badge showing the technology name and its purpose in the project
3. THE Technology Stack Content_Panel SHALL include the following frontend technologies: React 18.2, TypeScript 5.2, Tailwind CSS 3.3, React Router 6.20, Recharts, Leaflet, React Hook Form + Zod, and Web Speech API
4. THE Technology Stack Content_Panel SHALL include the following backend technologies: Java 21, Spring Boot 3.4.4, Spring Security 6.x, PostgreSQL 16, pgvector, Resilience4j, Apache Tika + Tesseract, Caffeine, Flyway, and Docker Compose
5. THE Technology Stack Content_Panel SHALL include the following AI/ML technologies: Groq API with Llama 3.3 70B, Ollama with all-minilm for local embeddings, and Web Speech API
6. THE Technology Stack Content_Panel SHALL include a summary of key architecture decisions as a comparison (what was chosen vs what was considered and why), covering at least: LLM provider choice, database choice, embedding strategy, and auth mechanism

### Requirement 7: Security Architecture Content Panel

**User Story:** As a portfolio visitor, I want to understand the security approach, so that I can see the developer's ability to design secure systems, especially around AI/LLM integration.

#### Acceptance Criteria

1. THE Security Architecture Content_Panel SHALL explain the Zero Trust LLM principle: the LLM is treated as an untrusted external service that never sees real data and never executes actions directly
2. THE Security Architecture Content_Panel SHALL describe the PII masking flow: real names and badge numbers are replaced with tokens (PERSON_1, BADGE_1) before reaching the LLM, and query results bypass the LLM entirely
3. THE Security Architecture Content_Panel SHALL present the RBAC hierarchy (DCP > ACP > RPI > RSI > ARSI > AHC > APC) as a visual rank-based access diagram or styled list
4. THE Security Architecture Content_Panel SHALL describe the tool-level authorization flow: every LLM-requested tool call passes through RBAC check, ABAC check, and confirmation gate before execution
5. THE Security Architecture Content_Panel SHALL summarize the security layers in a concise format: TLS 1.3, JWT auth, RBAC + ABAC, PII masking, parameterized queries, confirmation gates, immutable audit logs, AES-256 encryption at rest, and soft delete policy

### Requirement 8: Design Patterns Content Panel

**User Story:** As a fellow developer or technical interviewer, I want to see the design patterns and architecture decisions used, so that I can evaluate the developer's software engineering maturity and decision-making process.

#### Acceptance Criteria

1. THE Design Patterns Content_Panel SHALL list the key design patterns used in the project: Facade, Strategy, Chain of Responsibility, Circuit Breaker, Repository, Observer, Token-Based Sanitization, Confirmation Gate, Soft Delete, Lazy Loading, and Context Pattern
2. THE Design Patterns Content_Panel SHALL describe each pattern with its location in the system and the reason it was chosen (e.g., "Facade Pattern — ChatService orchestrates all AI pipeline services — single entry point simplifies controller and centralizes security")
3. THE Design Patterns Content_Panel SHALL include a section on decisions that changed during development, showing at least three examples of original plan vs final implementation and the reasoning (e.g., "Direct Groq calls from browser → All LLM calls routed through backend — security")
4. THE Design Patterns Content_Panel SHALL present the end-to-end request flow for a chat command as a step-by-step visual sequence showing: user input → authentication → language detection → NLU → sanitization → LLM call → tool authorization → database query → response formatting (bypassing LLM) → audit logging

### Requirement 9: Key Features and Screenshots Content Panel

**User Story:** As a portfolio visitor, I want to see the key features delivered and visual evidence of the working application, so that I can confirm this is a real, functional product and not just a concept.

#### Acceptance Criteria

1. THE Key Features Content_Panel SHALL summarize the five feature domains: Personnel Management (572+ personnel, rank hierarchy, status tracking), Duty Management (15-day platoon rotation, 22 guard locations, shift management), AI-Powered Features (NL chat, voice commands, OCR, AI scheduling), Leave Management (11 leave types, balance tracking, conflict detection), and Security & Compliance (Zero Trust LLM, RBAC, audit trail)
2. THE Key Features Content_Panel SHALL present each feature domain as a compact card or list item with an icon, title, and 1-2 sentence description
3. THE Screenshot_Gallery SHALL display the workboard screenshots (`public/workboard/1.png` through `6.png`) in a browsable format
4. WHEN a visitor clicks a screenshot thumbnail in the Screenshot_Gallery, THE Screenshot_Gallery SHALL display the full-size image in a lightbox overlay with a close button
5. THE Screenshot_Gallery SHALL support keyboard navigation: left/right arrow keys to navigate between images and Escape key to close the lightbox
6. THE Screenshot_Gallery SHALL include `alt` text on each screenshot image describing the application view shown

### Requirement 10: Visual Design Consistency

**User Story:** As a portfolio visitor, I want the wiki section to feel like a natural part of the portfolio, so that the design language is cohesive and professional throughout the site.

#### Acceptance Criteria

1. THE Wiki_Section SHALL use the portfolio's existing color palette: coral-500 (#ff6b4a) as the primary accent, dark-900 (#1a1a2e) for headings, white or light gray backgrounds for the main section area
2. THE Wiki_Section SHALL use the Poppins font family for all headings and the Inter font family for all body text, consistent with the site's typography system
3. THE Panel_Header SHALL use the existing `card-elevated` or a similar elevated card style with hover shadow transitions consistent with other interactive elements on the site
4. THE Tech_Badge components SHALL use a pill-shaped design with rounded-full borders, consistent with the existing technology tag styling used in the portfolio
5. THE Wiki_Section SHALL use the existing `AnimatedSection` component with `fadeUp` variant for scroll-triggered reveal animations on Content_Panel elements
6. THE Wiki_Section SHALL apply coral-500 accent color to interactive elements (active navigation items, expand/collapse icons on hover, lightbox controls) to maintain visual consistency

### Requirement 11: Responsive Design

**User Story:** As a mobile visitor, I want the wiki section to be fully usable on smaller screens, so that I can browse the project documentation comfortably on any device.

#### Acceptance Criteria

1. THE Wiki_Section SHALL stack the Wiki_Navigation above the content panels on screens narrower than 1024px (lg breakpoint), converting the sidebar to a horizontal scrollable tab bar
2. THE Content_Panel components SHALL use full-width layout on all screen sizes, with padding scaling from 16px on mobile to 32px on desktop
3. THE Before_After_Table SHALL switch from a side-by-side column layout to a stacked card layout on screens narrower than 768px (md breakpoint)
4. THE Screenshot_Gallery SHALL display thumbnails in a 2-column grid on mobile (below 640px), 3-column on tablet (640px-1024px), and inline row on desktop (above 1024px)
5. THE Architecture_Diagram SHALL scale down or reflow to a simplified vertical layout on screens narrower than 768px to remain readable
6. THE Wiki_Section SHALL ensure all interactive elements (Panel_Header, navigation items, lightbox controls) have a minimum touch target size of 44x44 pixels on mobile devices

### Requirement 12: Scroll Animations and Micro-Interactions

**User Story:** As a portfolio visitor, I want smooth animations and subtle interactions throughout the wiki section, so that the experience feels polished and engaging.

#### Acceptance Criteria

1. WHEN a Content_Panel enters the viewport during scrolling, THE Content_Panel SHALL animate in using the existing `AnimatedSection` component with the `fadeUp` variant
2. WHEN a visitor hovers over a Panel_Header, THE Panel_Header SHALL apply a subtle elevation increase (shadow transition) and the coral-500 accent color to the chevron icon over a 200-300ms transition
3. WHEN a visitor hovers over a Tech_Badge, THE Tech_Badge SHALL apply a subtle scale transform (1.05) and increased background opacity over a 200ms transition
4. THE Screenshot_Gallery thumbnails SHALL apply a subtle scale transform (1.03) and increased shadow on hover over a 300ms transition
5. WHILE Reduced_Motion_Mode is active, THE Wiki_Section SHALL suppress all hover scale transforms, scroll animations, and panel expand/collapse animations, displaying content changes instantly

### Requirement 13: Accessibility Compliance

**User Story:** As a visitor using assistive technology, I want the wiki section to be fully navigable and understandable, so that the advanced layout does not exclude anyone.

#### Acceptance Criteria

1. THE Wiki_Section SHALL use semantic HTML elements: `section` for the outer container, `h2` for the section heading, `h3` for panel titles, `button` for Panel_Header toggle controls, and `p`/`ul`/`li` for content
2. THE Panel_Header toggle buttons SHALL include `aria-expanded` attributes reflecting the current expanded/collapsed state of the corresponding Content_Panel
3. THE Content_Panel collapsible regions SHALL include `aria-labelledby` attributes referencing the corresponding Panel_Header `id`, and `role="region"` for screen reader context
4. THE Screenshot_Gallery lightbox SHALL trap keyboard focus within the lightbox while it is open and return focus to the triggering thumbnail when closed
5. THE Wiki_Navigation items SHALL be keyboard-navigable using Tab and Enter keys, with visible focus indicators using the coral-500 accent color
6. THE Wiki_Section SHALL ensure all text content meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text) against the section background

### Requirement 14: Performance Optimization

**User Story:** As a portfolio visitor, I want the wiki section to load quickly and animate smoothly, so that the rich content does not degrade the browsing experience.

#### Acceptance Criteria

1. THE Wiki_Section SHALL lazy-load workboard screenshot images using the `loading="lazy"` attribute so that images below the fold do not block initial page rendering
2. THE Content_Panel collapsed regions SHALL not render their full DOM content until first expanded, or SHALL use CSS-based visibility toggling to avoid layout recalculation on toggle
3. THE Wiki_Section SHALL avoid animating CSS properties that trigger layout recalculation (width, height, top, left), using only transform and opacity for hover and scroll animations
4. THE Screenshot_Gallery lightbox component SHALL be loaded lazily (only when a thumbnail is clicked) to avoid adding to the initial bundle size
5. THE Wiki_Section SHALL render without causing Cumulative Layout Shift by reserving appropriate height for the section heading, navigation, and the initially expanded Content_Panel
