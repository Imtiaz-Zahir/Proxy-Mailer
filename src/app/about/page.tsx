import React from "react";
import {
  Users,
  Globe,
  Award,
  Rocket,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            About ProxyMail
          </h1>
          <p className="text-xl text-gray-300">
            Revolutionizing email delivery for businesses worldwide
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 mb-12">
          <p className="text-gray-300 text-lg leading-relaxed">
            Founded in 2024, ProxyMail emerged from a simple vision: to make
            email delivery reliable and hassle-free for businesses. Our team of
            email delivery experts and software engineers has built a robust
            platform that handles millions of emails daily, ensuring they reach
            their intended recipients without getting caught in spam filters.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400">Active Users</div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Countries Served</div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
            <div className="bg-blue-500/10 p-3 rounded-lg w-fit mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1M+</div>
            <div className="text-gray-400">Emails Delivered Daily</div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
                <Rocket className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mission</h3>
              <p className="text-gray-300">
                To provide businesses with reliable, secure, and efficient email
                delivery solutions that help them reach their audience
                effectively.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Values</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Reliability in every delivery</li>
                <li>• Security as top priority</li>
                <li>• Transparency in operations</li>
                <li>• Customer success focus</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">
                    123 Tech Street, San Francisco, CA 94105
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-3" />
                  <a
                    href="mailto:support@proxymail.com"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    support@proxymail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
