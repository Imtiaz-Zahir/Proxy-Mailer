import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: 5,
      description: "Perfect for small businesses and startups",
      features: [
        "1 IP Address",
        "Unlimited email sending",
        "Basic support",
        "IP rotation (manual)",
        "Basic analytics",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple, transparent pricing that grows with your business. All plans
            include unlimited email sending.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-slate-800/50 rounded-xl border "border-slate-700 p-8`}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h2>
                <p className="text-gray-400 mb-6">{tier.description}</p>
                <div className="flex items-center justify-center mb-6">
                  <span className="text-5xl font-bold text-white">
                    ${tier.price}
                  </span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <Link href="/login">
                  <button
                    className={`w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-all`}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
              <div className="space-y-4">
                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Can I switch plans later?
                </h4>
                <p className="text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-400">
                  We accept all major credit cards and PayPal. We do not accept
                  Bitcoin or other cryptocurrencies.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Is there a long-term contract?
                </h4>
                <p className="text-gray-400">
                  No, all plans are month-to-month and you can cancel at any
                  time without penalty.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Do you offer a free trial?
                </h4>
                <p className="text-gray-400">
                  No, we do not offer a free trial. However, you can cancel your
                  subscription at any time within the first 7 days for a full
                  refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
