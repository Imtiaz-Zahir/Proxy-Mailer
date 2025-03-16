"use client";
import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  User,
  Building2,
  Send,
  AlertCircle,
} from "lucide-react";

type FormData = {
  name: string;
  company: string;
  email: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", company: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Get in touch with our team for any questions or support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>
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
                    href="mailto:contact@proxymail.com"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    contact@proxymail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                Support Hours
              </h2>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                Emergency Support
              </h2>
              <p className="text-gray-300">
                For urgent issues outside business hours, please email:
                <a
                  href="mailto:urgent@proxymail.com"
                  className="block text-blue-400 hover:text-blue-300 mt-2"
                >
                  urgent@proxymail.com
                </a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-2 border ${
                      formErrors.name ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="Your name"
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-2 border ${
                      formErrors.email ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="your@email.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-2 border ${
                      formErrors.message ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-blue-500 min-h-[120px]`}
                    placeholder="Your message"
                  />
                </div>
                {formErrors.message && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded-lg flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Message sent successfully!
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Failed to send message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
