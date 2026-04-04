import { useState } from 'react';
import emailjs from '@emailjs/browser';
import type { ContactFormData, ContactFormErrors } from '../types';
import { validateContactForm, isFormValid } from '../utils/validation';

// ⚠️ Replace these with your actual EmailJS credentials
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an email service (Gmail, Outlook, etc.) → get SERVICE_ID
// 3. Create an email template → get TEMPLATE_ID
// 4. Go to Account → API Keys → get PUBLIC_KEY
const EMAILJS_SERVICE_ID = 'service_portfolio'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'template_contact'; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';    // Replace with your public key

const INTENT_LABELS: Record<string, string> = {
  freelance: 'Freelance Opportunity',
  remote: 'Remote Work',
  fulltime: 'Full-Time Opportunity',
  collaboration: 'Project Collaboration',
  general: 'General Connection',
};

const INTENT_MESSAGES: Record<string, (name: string, email: string) => string> = {
  freelance: (name, email) =>
    `Hi Jayanth,\n\nI'm ${name} (${email}) and I have a freelance project that aligns with your expertise in full-stack development and cloud architecture. I'd love to discuss the scope and how we could work together.`,
  remote: (name, email) =>
    `Hi Jayanth,\n\nI'm ${name} (${email}) and I came across your portfolio. We have a remote position that could be a great fit for your skill set. Would you be open to a quick conversation?`,
  fulltime: (name, email) =>
    `Hi Jayanth,\n\nI'm ${name} (${email}) and I'm reaching out regarding a full-time engineering role that matches your background in application development, cloud migration, and scalable system design.`,
  collaboration: (name, email) =>
    `Hi Jayanth,\n\nI'm ${name} (${email}) and I'd love to explore a potential collaboration. Your experience with microservices, AI integration, and cloud-native solutions caught my attention.`,
  general: (name, email) =>
    `Hi Jayanth,\n\nI'm ${name} (${email}) and I came across your portfolio. I'd love to connect and learn more about your work.`,
};

const initialFormData: ContactFormData = { name: '', email: '', intent: '' };

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) return;

    setIsSending(true);

    const intentLabel = INTENT_LABELS[formData.intent] || 'General';
    const message = (INTENT_MESSAGES[formData.intent] || INTENT_MESSAGES.general)(formData.name, formData.email);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          intent: intentLabel,
          message: message,
          to_email: 'jayanthnjk1327@gmail.com',
        },
        EMAILJS_PUBLIC_KEY,
      );
      setIsSubmitted(true);
    } catch {
      // Fallback to mailto if EmailJS fails
      const subject = encodeURIComponent(`${intentLabel} — Let's Connect`);
      const body = encodeURIComponent(message);
      window.open(`mailto:jayanthnjk1327@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setIsSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return { formData, errors, handleChange, handleSubmit, isSubmitted, isSending };
}
