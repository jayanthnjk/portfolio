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
