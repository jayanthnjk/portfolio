// Navigation
export interface NavLink {
  label: string;
  sectionId: string;
}

// Projects
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  intent: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  intent?: string;
}

// Workboard Wiki Section
export interface PanelConfig {
  id: string;
  title: string;
  icon: string;
}

export interface BeforeAfterRow {
  area: string;
  before: string;
  after: string;
}

export interface TechItem {
  name: string;
  version?: string;
  purpose: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export interface ArchDecision {
  decision: string;
  chosen: string;
  considered: string;
  reasoning: string;
}

export interface DesignPattern {
  name: string;
  location: string;
  reason: string;
}

export interface DevChange {
  original: string;
  changedTo: string;
  reason: string;
}

export interface Screenshot {
  src: string;
  alt: string;
}

export interface FeatureDomain {
  icon: string;
  title: string;
  description: string;
}
