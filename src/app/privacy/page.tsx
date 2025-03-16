import React from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Your privacy is our top priority. Learn how we protect your data.
          </p>
        </div>

        {/* Key Privacy Points */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Data Security
            </h3>
            <p className="text-gray-300">
              We employ industry-standard encryption and security measures to
              protect your data and email communications.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Data Sharing
            </h3>
            <p className="text-gray-300">
              We never sell, rent, or share your personal information with third
              parties for marketing purposes.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Data Transparency
            </h3>
            <p className="text-gray-300">
              You have full visibility into what data we collect and how it&apos;s
              used to provide our services.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your Rights
            </h3>
            <p className="text-gray-300">
              Access, modify, or delete your personal data at any time through
              your account settings.
            </p>
          </div>
        </div>

        {/* Detailed Privacy Information */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Information We Collect
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <ul className="space-y-4 text-gray-300">
                <li>• Account information (email address, password hash)</li>
                <li>• Proxy server configurations and settings</li>
                <li>• Usage statistics and performance metrics</li>
                <li>
                  • Payment information (processed securely by our payment
                  provider)
                </li>
                <li>
                  • Technical data (IP addresses, browser type, device
                  information)
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              How We Use Your Information
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <ul className="space-y-4 text-gray-300">
                <li>• Providing and maintaining our proxy service</li>
                <li>• Processing your transactions</li>
                <li>• Sending service updates and administrative messages</li>
                <li>• Improving our services and user experience</li>
                <li>• Detecting and preventing fraud or abuse</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Data Retention
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300 mb-4">
                We retain your personal information only for as long as
                necessary to:
              </p>
              <ul className="space-y-4 text-gray-300">
                <li>• Provide our services to you</li>
                <li>• Comply with legal obligations</li>
                <li>• Resolve disputes</li>
                <li>• Enforce our agreements</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300">
                If you have any questions about our Privacy Policy or how we
                handle your data, please contact our Data Protection Officer at:
              </p>
              <a
                href="mailto:privacy@proxymail.com"
                className="text-blue-400 hover:text-blue-300 mt-2 block"
              >
                privacy@proxymail.com
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Updates to This Policy
            </h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date below.
              </p>
              <p className="text-gray-400 mt-4">Last Updated: March 15, 2024</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
