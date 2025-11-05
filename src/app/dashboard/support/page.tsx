"use client";

import { useCallback, useMemo, useState } from "react";
import { Mail, Phone, MessageSquare, HelpCircle } from "lucide-react";

type ContactAction = {
  type: "link" | "button";
  label: string;
  href?: string;
};

type ContactOption = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
  cardVariant?: "highlight";
  action: ContactAction;
};

type Faq = {
  q: string;
  a: string;
};

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showChatModal, setShowChatModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const contactOptions = useMemo<ContactOption[]>(
    () => [
      {
        title: "Email Support",
        description:
          "Drop us a note and our customer success team will respond within one business day.",
        icon: Mail,
        accentClass: "text-[#4F46E5]",
        cardVariant: "highlight",
        action: {
          type: "link",
          label: "support@credlink.com",
          href: "mailto:support@credlink.com",
        },
      },
      {
        title: "Schedule a Call",
        description:
          "Speak with a CredLink specialist about onboarding, billing, or enterprise access.",
        icon: Phone,
        accentClass: "text-[#FF6B35]",
        action: {
          type: "link",
          label: "+1 (415) 555-0134",
          href: "tel:+14155550134",
        },
      },
    ],
    []
  );

  const faqs = useMemo<Faq[]>(
    () => [
      {
        q: "How do I verify my profile on CredLink?",
        a: "From your dashboard, open Profile Settings and upload the required documents. Our team reviews submissions within 24 hours and you’ll receive an email once verification is complete.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Use the Forgot Password link on the sign-in page. If you no longer have access to your email, contact support with a valid government-issued ID for manual verification.",
      },
      {
        q: "Can I downgrade or upgrade my subscription?",
        a: "Yes. Navigate to Billing & Plans in your account settings, choose the desired plan, and confirm. Changes take effect at the next billing cycle and prorated credits are applied automatically.",
      },
      {
        q: "How can I export my digital business card analytics?",
        a: "Go to Analytics, pick a timeframe, and click Export Report. You’ll receive a CSV download and a copy will also be emailed to the address linked to your account.",
      },
      {
        q: "Where can I report suspicious activity?",
        a: "Head to Security Center in your settings and select Report Issue. Provide the details you have, and our trust & safety team will reach out within a few hours.",
      },
    ],
    []
  );

  const handleFaqToggle = useCallback((index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  }, []);

  const handleAction = useCallback((action: ContactAction) => {
    if (action.type === "button") {
      if (action.label === "Start Chat") {
        setShowChatModal(true);
      } else {
        document.getElementById("support-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, []);

  const handleFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus('idle');

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const { name, email, topic, message } = formData;
        const subject = encodeURIComponent(`Support request${topic ? `: ${topic}` : ""}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);

        // Open email client as fallback
        window.location.href = `mailto:support@credlink.com?subject=${subject}&body=${body}`;
        
        setSubmitStatus('success');
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: "", email: "", topic: "", message: "" });
          setSubmitStatus('idle');
        }, 3000);
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const handleChatStart = useCallback(() => {
    // Simulate chat initialization with better UX
    setShowChatModal(false);
    
    // Show a more professional message
    setTimeout(() => {
      const confirmed = confirm(
        '🚀 Live Chat Feature\n\n' +
        'Our live chat system is currently being upgraded for a better experience!\n\n' +
        'In the meantime, you can:\n' +
        '• Use the contact form below\n' +
        '• Email us directly at support@credlink.com\n' +
        '• Call us at +1 (415) 555-0134\n\n' +
        'Would you like to scroll to the contact form?'
      );
      
      if (confirmed) {
        document.getElementById("support-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  }, []);

  const handleKnowledgeBase = useCallback(() => {
    // Simulate knowledge base redirect
    alert('Knowledge base coming soon! For now, check our FAQ section above.');
  }, []);

  return (
    <section className="min-h-screen bg-[var(--background)] py-20 px-6 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 text-center items-center justify-center">
        {/* Hero */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#4F46E5] shadow-sm">
            We're here to help
          </div>
          <h1 className="gradient-text text-4xl font-bold md:text-5xl">
            CredLink Support & Help Centre
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-[var(--text-secondary)]">
            Whether you’re building a digital identity, managing team memberships, or monitoring engagement analytics, the CredLink support team is ready around the clock to keep you moving forward.
          </p>
        </header>

        {/* Contact Options */}
        <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mx-auto">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.title}
                className={`card flex h-full flex-col items-center gap-4 text-center ${
                  option.cardVariant === "highlight" ? "light-beam floating" : ""
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                  <Icon className={`h-8 w-8 ${option.accentClass}`} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {option.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{option.description}</p>
                {option.action.type === "link" && option.action.href ? (
                  <a
                    className="btn btn-primary mt-auto w-full md:w-auto"
                    href={option.action.href}
                  >
                    {option.action.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAction(option.action)}
                  >
                    {option.action.label}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-4xl text-left flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Quick answers to the most common questions about your CredLink workspace and profile.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="card">
                <button
                  className="flex w-full items-center justify-between text-left text-lg font-medium text-[var(--text-primary)]"
                  onClick={() => handleFaqToggle(index)}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#4F46E5]" />
                    {faq.q}
                  </span>
                  <span
                    className={`text-2xl leading-none transition-transform ${
                      activeFaq === index ? "rotate-45 text-[#4F46E5]" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`mt-4 overflow-hidden text-[var(--text-secondary)] transition-all duration-200 ${
                    activeFaq === index ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-4 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Form */}
        <section id="support-form" className="mx-auto w-full max-w-4xl text-left flex flex-col items-center">
          <div className="card space-y-8">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-[var(--text-primary)]">
                Submit a support request
              </h2>
              <p className="text-[var(--text-secondary)]">
                Share a few details and we’ll reach back by email with the next steps. Attachments can be added after we reply.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-primary)]" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:ring-offset-2"
                    placeholder="Jane Matthews"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-primary)]" htmlFor="email">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:ring-offset-2"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]" htmlFor="topic">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  required
                  value={formData.topic}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:ring-offset-2"
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="Account access">Account access</option>
                  <option value="Verification">Verification</option>
                  <option value="Billing & invoicing">Billing & invoicing</option>
                  <option value="Team management">Team management</option>
                  <option value="Analytics & reporting">Analytics & reporting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]" htmlFor="message">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleFormChange}
                  minLength={20}
                  className="min-h-[140px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                  placeholder="Describe the issue, include relevant account links, and any deadlines."
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 text-left md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                  By submitting, you consent to CredLink contacting you at the email provided.
                </p>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send request'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-4xl flex flex-col items-center">
          <div className="card light-beam text-center">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
              Still looking for something else?
            </h3>
            <p className="mt-3 text-[var(--text-secondary)]">
              Explore the CredLink knowledge base for tutorials, product announcements, and best-practice guides curated for your role.
            </p>
            <button
              className="btn btn-primary glow mt-6"
              onClick={handleKnowledgeBase}
            >
              Visit the knowledge base
            </button>
          </div>
        </section>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="fixed top-4 right-4 bg-[#10B981] text-white px-6 py-3 rounded-lg shadow-lg z-50">
            ✅ Support request sent successfully!
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="fixed top-4 right-4 bg-[#EF4444] text-white px-6 py-3 rounded-lg shadow-lg z-50">
            ❌ Failed to send request. Please try again.
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowChatModal(false);
              }
            }}
          >
            <div className="card max-w-md w-full space-y-6 bg-white border shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  💬 Start Live Chat
                </h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl leading-none p-1 hover:bg-gray-100 rounded"
                >
                  ×
                </button>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Connect with our support team for instant help with your CredLink account, billing questions, or technical issues.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  📞 <strong>Average response time:</strong> Under 2 minutes<br/>
                  🕐 <strong>Available:</strong> Monday-Friday, 9 AM - 6 PM PST
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleChatStart}
                  className="btn btn-primary flex-1 font-medium"
                >
                  🚀 Start Chat Now
                </button>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
