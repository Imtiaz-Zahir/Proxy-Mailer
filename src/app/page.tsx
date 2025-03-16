import React from "react";
import { Shield, RefreshCw, X, CheckCircle } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Facing Issues with <span className="text-blue-400">Nodemailer</span>
            ?
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Get reliable email delivery with our premium proxy service. Switch
            IPs anytime, ensure deliverability, and keep your business running
            smoothly.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 cursor-pointer">
            Start For Just $5/month
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-slate-700">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-gray-300">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">10k+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">1M+</div>
            <div className="text-gray-300">Emails Delivered Daily</div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 py-20">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit">
              <RefreshCw className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-4">
              Change IP Anytime
            </h3>
            <p className="text-gray-400 mt-2">
              Switch your IP address whenever you need, ensuring continuous
              email delivery.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-4">
              Secure & Reliable
            </h3>
            <p className="text-gray-400 mt-2">
              Enterprise-grade security with 99.9% uptime guarantee.
            </p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit">
              <X className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mt-4">
              Cancel Anytime
            </h3>
            <p className="text-gray-400 mt-2">
              No long-term contracts. Cancel your subscription whenever you
              want.
            </p>
          </div>
        </div>

        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Simple Integration
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Just update your Nodemailer configuration to use our proxy
                  server. Keep your existing SMTP credentials.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                    No code changes required
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                    Works with any SMTP provider
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                    Secure and reliable delivery
                  </li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-gray-400 text-sm">nodemailer.js</p>
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
});

// Send email
await transporter.sendMail({
  from: '"Your App" <you@example.com>',
  to: "user@example.com",
  subject: "Hello!",
  text: "This email was sent through ProxyMail",
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 border-t border-slate-700">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sign Up</h3>
              <p className="text-gray-400">
                Create your account and choose your plan
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Configure
              </h3>
              <p className="text-gray-400">
                Set up your SMTP settings with our IPs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Send</h3>
              <p className="text-gray-400">
                Start sending emails with confidence
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="py-20 border-t border-slate-700">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">John Doe</h4>
                  <p className="text-gray-400">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;ProxyMail solved our email delivery issues overnight. The
                ability to switch IPs on demand is a game-changer.&quot;
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex items-start mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Customer"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">Jane Smith</h4>
                  <p className="text-gray-400">Marketing Director, GrowthCo</p>
                </div>
              </div>
              <p className="text-gray-300">
                &quot;The reliability and support we get from ProxyMail is
                exceptional. Our email campaigns have never performed
                better.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="py-20 border-t border-slate-700">
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 max-w-lg mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Simple Pricing
              </h2>
              <div className="flex items-center justify-center mb-6">
                <span className="text-5xl font-bold text-white">$5</span>
                <span className="text-gray-400 ml-2">/month per IP</span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                  Unlimited email sending
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                  Premium IP addresses
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                  24/7 Support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                  IP rotation on demand
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                  Monthly billing, cancel anytime
                </li>
              </ul>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all cursor-pointer">
                Get Started Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}

export default App;
