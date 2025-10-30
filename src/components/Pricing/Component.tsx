"use client";

import React, { useState } from "react";

type Plan = {
  id: string;
  title: string;
  subtitle?: string;
  monthly: number | null;
  features: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "free",
    title: "Free",
    subtitle: "Get started with a free personal card",
    monthly: 0,
    features: [
      "Create a contact card",
      "Add photo, details, logo & links",
      "Share via QR, Apple Wallet, Widgets",
      "Email signature generator",
    ],
  },
];

export default function PricingComponent() {
  const [annual, setAnnual] = useState(false);

  const priceFor = (monthly: number | null) => {
    if (monthly === null) return "Contact";
    if (annual) return `$${Math.round(monthly * 0.75 * 100) / 100}`;
    return `$${monthly}`;
  };

  const handlePrimaryAction = (planId: string) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) return;
    if (plan.monthly === null) alert("Contact sales");
    else if (plan.monthly === 0) alert("Creating your free personal card...");
    else alert(`Starting checkout for ${plan.title} (${annual ? "Annual" : "Monthly"})`);
  };

  return (
    <section className="section" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="sectionHeader">
          <h2 id="pricing-heading" className="heading-2">Pricing Plans for Everyone</h2>
          <p className="description subHeader">Choose the plan that is right for you or your organization. All prices are in U.S. Dollars (USD).</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="toggleWrap">
              <span className="caption">Billed monthly</span>
              <div role="switch" aria-checked={annual} tabIndex={0} className="switch" onClick={() => setAnnual(s => !s)}>
                <div className={`knob ${annual ? "checked" : ""}`} />
              </div>
              <span className="caption">Annually</span>
            </div>
          </div>
        </div>

        <div
          className="pricingGrid"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}
        >
          {PLANS.map(plan => (
            <article key={plan.id} className={`planCard ${plan.featured ? "featured" : ""}`}>
              <div>
                <header className="planHeader">
                  <div>
                    <div className="planTitle">{plan.title}</div>
                    <div className="planSubtitle">{plan.subtitle}</div>
                  </div>
                  {plan.id === "premium" && <span className="badge">Includes 5 users</span>}
                </header>

                <div>
                  <div className="price">{priceFor(plan.monthly)} <span className="priceSmall">/ mo</span></div>
                  <div className="priceSmall">{annual ? "(billed annually — save up to 25%)" : ""}</div>
                </div>

                <div className="features">
                  {plan.features.map((f, i) => (
                    <div key={i} className="featureItem">
                      <svg className="featureIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M7 12.5l2.5 2.5L17 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>{f}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="planFooter">
                <button className="btn btn-primary btn-large" onClick={() => handlePrimaryAction(plan.id)}>
                  {plan.monthly === 0 ? "Create a free card" : "Sign Up"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
