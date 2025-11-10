import React from "react";
import PricingPage from "../../components/Pricing/Component";

export const metadata = {
  title: "Pricing — MyKard",
  description: "Choose a plan that fits you or your organization.",
};

export default function Page() {
  return (
    <main>
      <PricingPage />
    </main>
  );
}
