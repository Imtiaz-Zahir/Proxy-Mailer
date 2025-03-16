import React from "react";
import {
  Code,
  CheckCircle,
  AlertTriangle,
  Terminal,
  Laptop,
  Server,
  ArrowRight,
} from "lucide-react";

function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-300">
            Learn how to use ProxyMail with Nodemailer
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <p className="text-gray-300 mb-4">
            ProxyMail helps you bypass DigitalOcean&#39;s SMTP port restrictions by
            routing your email traffic through our secure proxy servers. This
            guide will show you how to integrate ProxyMail with your Nodemailer
            configuration.
          </p>
          <div className="flex items-center space-x-2 text-blue-400">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">
              DigitalOcean has restricted outbound SMTP ports, but our proxy
              service provides a solution.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-gray-300">
              <Server className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <p>Your application connects to our proxy server on port 2525</p>
            </div>
            <div className="flex items-center justify-center my-4">
              <ArrowRight className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-4 text-gray-300">
              <Laptop className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <p>Our proxy forwards your requests to the actual SMTP server</p>
            </div>
            <div className="flex items-center justify-center my-4">
              <ArrowRight className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-4 text-gray-300">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <p>Emails are delivered successfully through the SMTP server</p>
            </div>
          </div>
        </div>

        {/* Integration Steps */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Integration Steps
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                1. Install Nodemailer
              </h3>
              <div className="bg-slate-900 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <p className="text-gray-300 font-mono text-sm">
                    Run this command in your project directory:
                  </p>
                </div>
                <code className="text-blue-400 font-mono text-sm">
                  npm install nodemailer
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                2. Default Nodemailer Configuration
              </h3>
              <p className="text-gray-300 mb-2">
                This is how a typical Nodemailer configuration looks:
              </p>
              <div className="bg-slate-900 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  <p className="text-gray-300 font-mono text-sm">
                    Default configuration:
                  </p>
                </div>
                <pre className="text-blue-400 font-mono text-sm whitespace-pre-wrap">
                  {`const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 465,
  secure: true,
  auth: {
    user: "Your SMTP Username",
    pass: "Your SMTP Password",
  },
});`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                3. ProxyMail Configuration
              </h3>
              <p className="text-gray-300 mb-2">
                Update your configuration to use ProxyMail:
              </p>
              <div className="bg-slate-900 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  <p className="text-gray-300 font-mono text-sm">
                    Modified configuration with ProxyMail:
                  </p>
                </div>
                <pre className="text-blue-400 font-mono text-sm whitespace-pre-wrap">
                  {`const transporter = nodemailer.createTransport({
  host: "proxy-smtp.imtiaz-zahir.com",
  port: 2525,
  secure: true,
  auth: {
    user: "Your SMTP Username",
    pass: "Your SMTP Password",
  },
});`}
                </pre>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">
                Key Changes:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>
                  Change <span className="text-blue-400 font-mono">host</span>{" "}
                  to our proxy domain
                </li>
                <li>
                  Update <span className="text-blue-400 font-mono">port</span>{" "}
                  to 2525
                </li>
                <li>Keep your original SMTP credentials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testing */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Testing Your Integration
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>To test your integration, send a test email:</p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <pre className="text-blue-400 font-mono text-sm whitespace-pre-wrap">
                {`// Send test email
await transporter.sendMail({
  from: '&#39;Your Name&#39; <your@email.com>',
  to: "recipient@email.com",
  subject: "Test Email",
  text: "If you receive this, the proxy is working!",
});`}
              </pre>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Troubleshooting
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Connection Issues
                </h3>
                <p className="text-gray-300">
                  If you can&#39;t connect, verify your firewall allows outbound
                  connections to port 2525.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Authentication Errors
                </h3>
                <p className="text-gray-300">
                  Double-check your SMTP credentials and ensure they&#39;re
                  correctly configured.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-300">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@proxymail.com"
                className="text-blue-400 hover:text-blue-300"
              >
                support@proxymail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Docs;
