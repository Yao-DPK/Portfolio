// src/components/sections/previews/ContactPreview.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GitHubIcon, LinkedinIcon } from '@/components/icons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}



export default function ContactPreview() {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const GitHubIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
</svg>`;

  const LinkedInIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>`;

  const EmailIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
  <polyline points="22,6 12,13 2,6" />
</svg>`;

  const contactItems = [
  {
    icon: <span dangerouslySetInnerHTML={{ __html: EmailIconSVG }} />,
    label: t('info.email'),
    value: t('info.email'),
    href: `mailto:${t('info.email')},`
  },
  {
    icon: <span dangerouslySetInnerHTML={{ __html: GitHubIconSVG }} />,
    label: t('info.github'),
    value: t('info.github'),
    href: t('info.github'),
  },
  {
    icon: <span dangerouslySetInnerHTML={{ __html: LinkedInIconSVG }}/>,
    label: t('info.linkedin'),
    value: t('info.linkedin'),
    href: t('info.linkedin'),
  },
];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const { name, email, subject, message } = formData;

    if (!name.trim()) {
      newErrors.name = t('form.required');
    }
    if (!email.trim()) {
      newErrors.email = t('form.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('form.invalidEmail');
    }
    if (!subject.trim()) {
      newErrors.subject = t('form.required');
    }
    if (!message.trim()) {
      newErrors.message = t('form.required');
    } else if (message.length < 10) {
      newErrors.message = t('form.minLength', { count: 10 });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  

  return (
    <section className="max-w-4xl mx-auto px-6 py-16" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Colonne gauche : Informations */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">
            {t('title')}
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {t('description')}
          </p>

          <div className="space-y-4 pt-4">
            {contactItems.map((item, index) => (
              <ContactInfo key={index} {...item} />
            ))}
          </div>

          <div className="pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-200 dark:border-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t('info.availability')}
            </span>
          </div>
        </div>

        {/* Colonne droite : Formulaire */}
        <div className="bg-[var(--card-background)] rounded-2xl p-6 border border-[var(--card-border)] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                {t('form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.namePlaceholder')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-[var(--card-border)]'
                } bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                {t('form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('form.emailPlaceholder')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-[var(--card-border)]'
                } bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Sujet */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                {t('form.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('form.subjectPlaceholder')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.subject ? 'border-red-500' : 'border-[var(--card-border)]'
                } bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form.messagePlaceholder')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.message ? 'border-red-500' : 'border-[var(--card-border)]'
                } bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            {/* Statut */}
            {submitStatus === 'success' && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm">
                {t('form.success')}
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                {t('form.error')}
              </div>
            )}

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('form.sending') : t('form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Composant utilitaire pour les informations de contact
function ContactInfo({ 
  icon, 
  label, 
  value, 
  href, 
  isSVG = false 
}: { 
  icon: React.ReactNode | string; 
  label: string; 
  value: string; 
  href: string;
  isSVG?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--card-background)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-md group"
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
        {typeof icon === 'string' ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-200 [&>svg]:w-6 [&>svg]:h-6">
            {icon}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-secondary)] truncate">{label}</p>
        <p className="text-sm text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}
