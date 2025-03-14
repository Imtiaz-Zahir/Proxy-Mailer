"use client";
import React, { useEffect, useState } from "react";
import {
  createProxyAction,
  getProxiesAction,
  updateProxyAction,
} from "@/actions/proxy";
import { getPaymentURL } from "@/actions/stripe";

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

// Define a separate interface for the form data to match the actual fields used
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

  useEffect(() => {
    const fetchProxies = async () => {
      try {
        const proxies = await getProxiesAction();
        if (proxies) setProxyServers(proxies);
      } catch (error) {
        console.error("Failed to fetch proxies:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchProxies();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Validate Server IP (basic IPv4 validation)
    if (!formData.serverIp) {
      errors.serverIp = "Server IP is required";
    } else {
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!ipPattern.test(formData.serverIp)) {
        errors.serverIp = "Invalid IP address format";
      }
    }

    // Validate Mail Server Domain
    if (!formData.mailServerDomain) {
      errors.mailServerDomain = "Mail server domain is required";
    } else {
      const domainPattern =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
      if (!domainPattern.test(formData.mailServerDomain)) {
        errors.mailServerDomain = "Invalid domain format";
      }
    }

    // Validate Mail Server Port
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

  async function handelPayment(proxyId: string) {
    const paymentLink = await getPaymentURL({
      proxyId,
      cancelUrl: window.location.href,
      successUrl: window.location.href,
    });

    if (paymentLink) {
      window.location.href = paymentLink;
    }
  }

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

        if (!newProxy) {
          alert("Failed to create proxy");
          return;
        }

        setProxyServers([...proxyServers, newProxy]);

        await handelPayment(newProxy.id);
      }

      // Reset form and close modal
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

  const handleDelete = (id: string) => {
    // Consider adding confirmation dialog and loading state for delete as well
    setProxyServers(proxyServers.filter((proxy) => proxy.id !== id));
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

        {/* Table of proxy servers */}
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
                      <tr key={proxy.id} className="hover:bg-slate-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.serverIp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.domain}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.port}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {proxy.subscriptionEndAt ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(proxy)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(proxy.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handelPayment(proxy.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors cursor-pointer"
                            >
                              Complete Payment
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
                        No proxy servers found. Click &quot;Add New Proxy&quot;
                        to add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal for adding/editing proxy servers */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingId !== null
                ? "Edit Proxy Server"
                : "Add New Proxy Server"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Server IP
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
                  placeholder="mail.example.com"
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
                  placeholder="587"
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
                    : editingId !== null
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
