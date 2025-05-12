"use client";
import React, { useEffect, useState } from "react";
import {
  createProxyAction,
  getProxiesAction,
  updateProxyAction,
} from "@/actions/proxy";
import Link from "next/link";
import { Check, Shield } from "lucide-react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

type Proxy = {
  id: string;
  serverIp: string;
  domain: string;
  port: number;
  userEmail: string;
  subscriptionEndAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

interface FormData {
  serverIp: string;
  mailServerDomain: string;
  mailServerPort: string;
}

interface FormErrors {
  serverIp?: string;
  mailServerDomain?: string;
  mailServerPort?: string;
}

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [proxyServers, setProxyServers] = useState<Proxy[]>([]);
  const [formData, setFormData] = useState<FormData>({
    serverIp: "",
    mailServerDomain: "",
    mailServerPort: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentProxyId, setCurrentProxyId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [paddleError, setPaddleError] = useState("");
  const [paddleLoading, setPaddleLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchProxies = async () => {
      try {
        const proxies = await getProxiesAction();
        if (proxies) {
          setProxyServers(proxies);
          if (proxies.length > 0) {
            setUserEmail(proxies[0].userEmail);
          }
        }
      } catch (error) {
        console.error("Failed to fetch proxies:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchProxies();

    // Initialize Paddle
    try {
      const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (!clientToken) {
        throw new Error(
          "Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN environment variable"
        );
      }

      const paddleEnvironment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT;
      if (!paddleEnvironment) {
        throw new Error(
          "Missing NEXT_PUBLIC_PADDLE_ENVIRONMENT environment variable"
        );
      }

      setPaddleLoading(true);
      initializePaddle({
        token: clientToken,
        environment:
          paddleEnvironment === "production" ? "production" : "sandbox",
      }).then((paddleInstance) => {
        if (!paddleInstance) {
          throw new Error(
            "Failed to initialize Paddle. Please try again later."
          );
        }

        setPaddle(paddleInstance);
        setPaddleLoading(false);
      });
    } catch (error) {
      console.error(error);
      setPaddleError("Failed to initialize payment system. Please try again later.");
      setPaddleLoading(false);
    }

    // Check for success parameter in URL
    const currentUrl = window.location.href;
    if (currentUrl.includes("success=true")) {
      setPaymentSuccess(true);
      setTimeout(() => window.location.reload(), 5000);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.serverIp) {
      errors.serverIp = "Server IP is required";
    } else {
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipPattern.test(formData.serverIp)) {
        errors.serverIp = "Invalid IP address format";
      }
    }

    if (!formData.mailServerDomain) {
      errors.mailServerDomain = "Mail server domain is required";
    } else {
      const domainPattern =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
      if (!domainPattern.test(formData.mailServerDomain)) {
        errors.mailServerDomain = "Invalid domain format";
      }
    }

    if (!formData.mailServerPort) {
      errors.mailServerPort = "Mail server port is required";
    } else {
      const port = parseInt(formData.mailServerPort, 10);
      if (isNaN(port) || port < 1 || port > 65535) {
        errors.mailServerPort = "Port must be a number between 1 and 65535";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handlePayment(proxyId: string) {
    if (paddleLoading) return;
    
    setCurrentProxyId(proxyId);
    setShowPaymentModal(true);
  }

  const processPayment = async () => {
    try {
      setPaddleLoading(true);

      if (!paddle) {
        setPaddleError("Payment system is not ready. Please try again.");
        setPaddleLoading(false);
        return;
      }

      const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
      if (!priceId) {
        setPaddleError("Missing payment configuration. Please contact support.");
        setPaddleLoading(false);
        return;
      }

      paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
        customData: {
          proxyId: currentProxyId,
        },
        customer: {
          email: userEmail,
        },
        settings: {
          successUrl: `${window.location.origin}?success=true`,
          theme: "dark",
        },
      });
    } catch (error) {
      console.error(error);
      setPaddleError("Failed to open payment form. Please try again later.");
      setPaddleLoading(false);
    }
  };

  const handleAddOrUpdateProxy = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (editingId) {
        const newProxy = await updateProxyAction(editingId, {
          domain: formData.mailServerDomain,
          port: parseInt(formData.mailServerPort, 10) || 0,
          serverIp: formData.serverIp,
        });

        if (typeof newProxy === "string") {
          alert(newProxy);
          return;
        }

        setProxyServers(
          proxyServers.map((proxy) =>
            proxy.id === editingId ? newProxy : proxy
          )
        );
      } else {
        const newProxy = await createProxyAction({
          domain: formData.mailServerDomain,
          port: parseInt(formData.mailServerPort, 10) || 0,
          serverIp: formData.serverIp,
        });

        if (typeof newProxy === "string") {
          alert(newProxy);
          return;
        }

        setProxyServers([...proxyServers, newProxy]);
        await handlePayment(newProxy.id);
      }

      setFormData({ serverIp: "", mailServerDomain: "", mailServerPort: "" });
      setShowModal(false);
      setEditingId(null);
    } catch (error) {
      console.error("Operation failed:", error);
      alert(
        `Operation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (proxy: Proxy) => {
    setFormData({
      serverIp: proxy.serverIp,
      mailServerDomain: proxy.domain,
      mailServerPort: proxy.port.toString(),
    });
    setEditingId(proxy.id);
    setFormErrors({});
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setEditingId(null);
    setFormData({ serverIp: "", mailServerDomain: "", mailServerPort: "" });
    setFormErrors({});
    setShowModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaddleError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-0">
            List of your proxy
          </h2>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Add New Proxy
          </button>
        </div>

        {paymentSuccess && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <div>
                <h3 className="font-medium text-green-400">Payment Successful!</h3>
                <p className="text-sm text-green-300">
                  Your proxy server will be activated shortly. This page will reload in a few seconds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Proxy Servers Table */}
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {isInitialLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3">Loading proxies...</span>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Server IP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Mail Server Domain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Mail Server Port
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {proxyServers.length > 0 ? (
                    proxyServers.map((proxy) => (
                      <tr key={proxy.id} className="hover:bg-slate-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.serverIp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.domain}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.port}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          {proxy.subscriptionEndAt ? (
                            <button
                              onClick={() => handleEdit(proxy)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors cursor-pointer text-sm"
                            >
                              Edit
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePayment(proxy.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors cursor-pointer text-sm"
                              disabled={paddleLoading && currentProxyId === proxy.id}
                            >
                              {paddleLoading && currentProxyId === proxy.id
                                ? "Processing..."
                                : "Complete Payment"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-400"
                      >
                        No proxy servers found. Click &quot;Add New Proxy&quot; to add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-slate-800 rounded-lg shadow-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-300">
                Need help setting up?
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Check our{" "}
                <Link
                  href="/docs"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  documentation page
                </Link>{" "}
                for detailed instructions on setting up Nodemailer with our
                proxy service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Proxy Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Proxy Server" : "Add New Proxy Server"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your Server or Droplet IP
                </label>
                <input
                  type="text"
                  name="serverIp"
                  value={formData.serverIp}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-white border ${
                    formErrors.serverIp ? "border-red-500" : "border-slate-600"
                  } focus:border-blue-500 focus:outline-none`}
                  placeholder="192.168.1.1"
                  disabled={isLoading}
                />
                {formErrors.serverIp && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.serverIp}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mail Server Domain
                </label>
                <input
                  type="text"
                  name="mailServerDomain"
                  value={formData.mailServerDomain}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-white border ${
                    formErrors.mailServerDomain
                      ? "border-red-500"
                      : "border-slate-600"
                  } focus:border-blue-500 focus:outline-none`}
                  placeholder="smtp.gmail.com"
                  disabled={isLoading}
                />
                {formErrors.mailServerDomain && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.mailServerDomain}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mail Server Port
                </label>
                <input
                  type="text"
                  name="mailServerPort"
                  value={formData.mailServerPort}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded bg-slate-700 text-white border ${
                    formErrors.mailServerPort
                      ? "border-red-500"
                      : "border-slate-600"
                  } focus:border-blue-500 focus:outline-none`}
                  placeholder="465"
                  disabled={isLoading}
                />
                {formErrors.mailServerPort && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.mailServerPort}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrUpdateProxy}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="mr-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  )}
                  {isLoading
                    ? "Processing..."
                    : editingId
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-medium text-white">
                Complete Your Payment
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Subscription required to activate your proxy
              </p>
            </div>

            <div className="border border-gray-800 bg-gray-900/50 rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-center pb-2">
                <div>
                  <h3 className="text-white text-lg font-medium">Proxy Plan</h3>
                  <p className="text-gray-400 text-sm">$10/month</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 md:col-span-1">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Unlimited tunnels</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Custom subdomains</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Free SSL certificates</span>
                    </li>
                  </ul>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Multi-port support</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Web dashboard</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-cyan-400" />
                      <span className="text-gray-300">Priority support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {paddleError ? (
                <div className="mb-4">
                  <p className="text-red-400 text-sm mb-2">{paddleError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              ) : !paddle ? (
                <div className="flex justify-center py-4">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-cyan-400 border-r-transparent"></div>
                </div>
              ) : (
                <button
                  onClick={processPayment}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded cursor-pointer flex items-center justify-center"
                  disabled={paddleLoading}
                >
                  {paddleLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              )}

              <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-400">
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-cyan-400" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={closePaymentModal}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-4">
              Need help? Contact us at support@proxymailer.online
            </p>
          </div>
        </div>
      )}
    </div>
  );
}