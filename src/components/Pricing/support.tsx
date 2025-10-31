"use client";

import React, { useState, useEffect } from 'react';

// Add custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export default function PricingSupport() {
  const [issue, setIssue] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [faqsOpen, setFaqsOpen] = useState<number | null>(null);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.id = "pricing-support-scrollbar";
    styleElement.innerHTML = scrollbarStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal and bank transfers.",
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your subscription plan at any time. Changes take effect immediately, and we'll prorate any payments.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us within 30 days of purchase for a full refund.",
    },
    {
      question: "Is there a contract or minimum commitment?",
      answer: "No, there's no long-term contract. You can cancel your subscription at any time without penalty.",
    },
    {
      question: "Do you offer enterprise pricing?",
      answer: "Yes, we offer custom enterprise plans with additional features and dedicated support. Contact our sales team for details.",
    },
    {
      question: "What happens after my trial ends?",
      answer: "After your trial period, you can choose to subscribe to any of our plans. We'll send you reminders before the trial expires.",
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual submission logic
    alert("Support request submitted!");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-5xl space-y-16">
        {/* Simple Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            How Can We Help?
          </h1>
          <p className="text-[var(--text-secondary)] max-w-3xl mx-auto">
            Reach out with any questions about pricing, billing, or subscriptions and our team will be happy to assist.
          </p>
        </div>

        {/* Top Cards with Clean Design */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="card h-full p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[var(--text-primary)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div className="space-y-5">
                <h3 className="text-lg font-semibold">Have pricing questions?</h3>
                <p className="text-[var(--text-secondary)]">
                  Explore our detailed pricing guide and find the perfect plan for your needs.
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center text-[var(--primary-purple)] hover:opacity-80 transition-opacity"
                >
                  View Pricing Guide
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="card h-full p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-[var(--text-primary)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Want to discuss enterprise options?</h3>
                <p className="text-[var(--text-secondary)]">
                  Schedule a personalized call with our enterprise team for custom solutions.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-[var(--primary-purple)] hover:opacity-80 transition-opacity"
                >
                  Book a Call
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Request Support Section */}
        <div className="card mx-auto w-full max-w-3xl overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[var(--primary-purple)] to-[#6B7BFF] px-8 py-6 text-white">
            <h2 className="text-2xl font-semibold">Request Support</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/80">
              Share a few details about what you need and our team will follow up within one business day.
            </p>
          </div>

          <div className="space-y-8 px-6 py-8 md:px-10">
            {/* Info Section */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 md:flex-row md:items-center md:gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <svg className="h-6 w-6 text-[var(--primary-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-[var(--text-primary)]">Need help with billing or subscriptions?</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  For pricing inquiries, billing issues, or subscription changes. We typically respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  Describe your issue or question
                </label>
                <textarea
                  className="w-full min-h-[160px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:ring-offset-2"
                  placeholder="Please provide as much detail as possible..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  Attachments (optional)
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-[var(--text-primary)] transition-all hover:border-[var(--primary-purple)] hover:bg-white cursor-pointer">
                    <svg className="h-5 w-5 text-[var(--primary-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setAttachment(e.target.files ? e.target.files[0] : null)
                      }
                    />
                    <span>Upload Files</span>
                  </label>
                  {attachment && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-[var(--text-secondary)]">
                      {attachment.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                  By submitting, you agree to our support team reaching out via email.
                </p>
                <button
                  type="submit"
                  className="btn btn-primary px-8 py-3"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <p className="text-[var(--text-secondary)]">
              Browse the most common questions from our community.
            </p>
          </div>
          
          {/* FAQ Categories */}
          <div className="card custom-scrollbar max-h-[600px] overflow-y-auto p-8">
            <section className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">General Information</h3>
                <div className="h-[2px] w-16 bg-[var(--primary-purple)]"></div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Frequently asked questions about billing, subscriptions, and account management.
              </p>

              <div className="space-y-4">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-100 bg-white transition-all hover:shadow-sm"
                  >
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-[var(--text-primary)] transition-colors hover:text-[var(--primary-purple)]"
                      onClick={() => setFaqsOpen(faqsOpen === index ? null : index)}
                    >
                      <span className="text-xl font-normal">{faq.question}</span>
                      <span
                        className={`text-xl font-normal leading-none transition-transform ${
                          faqsOpen === index ? 'rotate-45 text-[var(--primary-purple)]' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden px-4 transition-all duration-200 ${
                        faqsOpen === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 border-t border-gray-100 pt-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Account & Security</h3>
                <div className="h-[2px] w-16 bg-[var(--primary-purple)]"></div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Questions about account settings, security, and privacy.
              </p>

              <div className="space-y-4">
                {faqs.slice(3, 6).map((faq, index) => (
                  <div
                    key={index + 3}
                    className="rounded-xl border border-gray-100 bg-white transition-all hover:shadow-sm"
                  >
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-[var(--text-primary)] transition-colors hover:text-[var(--primary-purple)]"
                      onClick={() => setFaqsOpen(faqsOpen === index + 3 ? null : index + 3)}
                    >
                      <span className="text-lg font-semibold">{faq.question}</span>
                      <span
                        className={`text-xl font-semibold leading-none transition-transform ${
                          faqsOpen === index + 3 ? 'rotate-45 text-[var(--primary-purple)]' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden px-4 transition-all duration-200 ${
                        faqsOpen === index + 3 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 border-t border-gray-100 pt-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">Billing & Subscriptions</h3>
                <div className="h-[2px] w-16 bg-[var(--primary-purple)]"></div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Information about payments, plans, and subscription management.
              </p>

              <div className="space-y-4">
                {faqs.slice(6).map((faq, index) => (
                  <div
                    key={index + 6}
                    className="rounded-xl border border-gray-100 bg-white transition-all hover:shadow-sm"
                  >
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-[var(--text-primary)] transition-colors hover:text-[var(--primary-purple)]"
                      onClick={() => setFaqsOpen(faqsOpen === index + 6 ? null : index + 6)}
                    >
                      <span className="text-lg font-semibold">{faq.question}</span>
                      <span
                        className={`text-xl font-semibold leading-none transition-transform ${
                          faqsOpen === index + 6 ? 'rotate-45 text-[var(--primary-purple)]' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden px-4 transition-all duration-200 ${
                        faqsOpen === index + 6 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="card p-8 text-center">
            <p className="text-[var(--text-secondary)]">
              Can't find what you're looking for?{' '}
              <a href="#" className="text-[var(--primary-purple)] hover:opacity-80 transition-opacity">
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}