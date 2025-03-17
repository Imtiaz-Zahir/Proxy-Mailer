import React from "react";
import { Shield, Lock, Key, Server, Eye, Database, RefreshCw, Bell } from "lucide-react";

function Security() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Security Measures</h1>
          <p className="text-xl text-gray-300">
            Your data security is our top priority. Learn about our comprehensive security practices.
          </p>
        </div>

        {/* Key Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise-Grade Security</h3>
            <p className="text-gray-300">
              Military-grade encryption and security protocols protect your data at rest and in transit.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Access Control</h3>
            <p className="text-gray-300">
              Strict authentication and authorization mechanisms ensure only authorized access.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <RefreshCw className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Regular Updates</h3>
            <p className="text-gray-300">
              Continuous security updates and patch management keep your data protected.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
              <Bell className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">24/7 Monitoring</h3>
            <p className="text-gray-300">
              Round-the-clock surveillance and threat detection systems.
            </p>
          </div>
        </div>

        {/* Detailed Security Information */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Infrastructure Security</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start mb-6">
                <Server className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                <div className="space-y-4 text-gray-300">
                  <p>Our infrastructure is built on enterprise-grade security principles:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Redundant data centers with physical security</li>
                    <li>DDoS protection and mitigation</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Automated backup systems with encryption</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start mb-6">
                <Database className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                <div className="space-y-4 text-gray-300">
                  <p>Your data is protected by multiple security layers:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AES-256 encryption for data at rest</li>
                    <li>TLS 1.3 for data in transit</li>
                    <li>Regular data backups with secure storage</li>
                    <li>Strict data access controls and logging</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Access Security</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start mb-6">
                <Key className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                <div className="space-y-4 text-gray-300">
                  <p>We implement strict access control measures:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Multi-factor authentication (MFA)</li>
                    <li>Role-based access control (RBAC)</li>
                    <li>Session management and automatic timeouts</li>
                    <li>IP-based access restrictions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Privacy Protection</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start mb-6">
                <Eye className="w-6 h-6 text-blue-400 mr-4 mt-1" />
                <div className="space-y-4 text-gray-300">
                  <p>Your privacy is protected through:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Data minimization practices</li>
                    <li>Regular privacy impact assessments</li>
                    <li>Compliance with GDPR and other privacy regulations</li>
                    <li>Transparent data handling policies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Security Certifications</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300 mb-4">
                Our service maintains compliance with industry-standard security certifications:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>ISO 27001 certified</li>
                <li>SOC 2 Type II compliant</li>
                <li>GDPR compliant</li>
                <li>Regular third-party security audits</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Report Security Issues</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300">
                If you discover a security vulnerability, please report it immediately to our security team:
              </p>
              <a href="mailto:support@proxymailer.online" className="text-blue-400 hover:text-blue-300 mt-2 block">
                support@proxymailer.online
              </a>
              <p className="text-gray-400 mt-4">
                We take all security reports seriously and will respond within 24 hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Security;