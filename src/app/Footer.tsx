import { Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-700 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 text-blue-400" />
            <span className="ml-2 text-lg font-bold text-white">ProxyMail</span>
          </div>
          <p className="text-gray-400">
            Reliable email delivery for your business
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/#features"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/#pricing"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/#testimonials"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/security"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Security
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-slate-700 text-center text-gray-400">
        <p>&copy; 2025 ProxyMail. All rights reserved.</p>
      </div>
    </footer>
  );
}
