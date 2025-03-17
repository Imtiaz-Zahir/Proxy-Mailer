import React from "react";
import { Scale, AlertCircle, ShieldCheck, Gavel, RefreshCw } from "lucide-react";

function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using our service.
          </p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Scale className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fair Usage</h3>
            <p className="text-gray-300">
              Our service must be used in compliance with all applicable laws and regulations.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Prohibited Uses</h3>
            <p className="text-gray-300">
              Any form of spam, harassment, or illegal activities is strictly prohibited.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Account Security</h3>
            <p className="text-gray-300">
              You are responsible for maintaining the security of your account credentials.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Gavel className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Legal Compliance</h3>
            <p className="text-gray-300">
              Users must comply with all relevant email and privacy regulations.
            </p>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Service Usage</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <p>1.1. Our proxy service is designed for legitimate email delivery purposes.</p>
                <p>1.2. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain accurate account information</li>
                  <li>Use the service in compliance with anti-spam laws</li>
                  <li>Protect your account credentials</li>
                  <li>Report any unauthorized access immediately</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Prohibited Activities</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <p>Users are strictly prohibited from:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sending unsolicited bulk emails (spam)</li>
                  <li>Distributing malware or harmful content</li>
                  <li>Engaging in phishing or fraudulent activities</li>
                  <li>Violating any local, state, or federal laws</li>
                  <li>Infringing on intellectual property rights</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Service Limitations</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <p>3.1. Service Availability</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We strive for 99.9% uptime but don&apos;t guarantee uninterrupted service</li>
                  <li>We may perform maintenance with reasonable notice</li>
                  <li>Service may be limited by factors beyond our control</li>
                </ul>
                <p>3.2. Rate Limits</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email sending rates may be limited based on your plan</li>
                  <li>Excessive usage may result in temporary restrictions</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <p>4.1. Subscription fees are billed monthly in advance</p>
                <p>4.2. Payment Terms:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All fees are non-refundable except as specified in our Refund Policy</li>
                  <li>Service may be suspended for non-payment</li>
                  <li>Price changes will be notified 30 days in advance</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4.3. Refund Policy</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-4">We offer a 7-day refund window for your most recent payment:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Refund requests must be submitted within 7 days of your last payment</li>
                      <li>Only your most recent payment is eligible for a refund</li>
                      <li>Refunds will be processed using the original payment method</li>
                      <li>Processing time may take 5-10 business days depending on your payment provider</li>
                      <li>Service access will be terminated upon refund approval</li>
                    </ul>
                    <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                      <p className="text-sm">
                        To request a refund, please contact our support team at{" "}
                        <a href="mailto:support@proxymail.com" className="text-blue-400 hover:text-blue-300">
                          support@proxymail.com
                        </a>
                        {" "}with your account details and reason for the refund.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4 text-gray-300">
                <p>We reserve the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Suspend or terminate accounts for terms violations</li>
                  <li>Modify or discontinue the service with notice</li>
                  <li>Remove any content that violates these terms</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Modifications to Terms</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300">
                We may update these terms from time to time. We will notify you of any material changes via email or through our service. Your continued use of the service after such modifications constitutes acceptance of the updated terms.
              </p>
              <p className="text-gray-400 mt-4">Last Updated: March 15, 2024</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300">
                For any questions regarding these terms, please contact our legal team at:
              </p>
              <a href="mailto:support@proxymail.com" className="text-blue-400 hover:text-blue-300 mt-2 block">
                support@proxymail.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;