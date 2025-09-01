"use client";
import React, { useState } from "react";
import { deleteProxyAction } from "@/actions/proxy";

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

interface DeleteButtonProps {
  proxy: Proxy;
  onDeleteSuccess: (deletedId: string) => void;
}

export default function DeleteButton({
  proxy,
  onDeleteSuccess,
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteProxyAction(proxy.id);

      if (typeof result !== "string" && result.success) {
        onDeleteSuccess(proxy.id);
        setShowDeleteModal(false);
      } else {
        alert(result || "Failed to delete proxy");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(
        `Delete failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors cursor-pointer text-sm"
      >
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>

            <div className="space-y-4">
              <p className="text-gray-300">
                Are you sure you want to delete the proxy server{" "}
                <span className="font-medium">{proxy.serverIp}</span>?
              </p>

              {proxy.subscriptionEndAt &&
                Date.now() < proxy.subscriptionEndAt.getTime() && (
                  <div className="bg-yellow-500/20 border border-yellow-500/50 rounded p-3">
                    <p className="text-yellow-400 text-sm">
                      <strong>Note:</strong> This proxy has an active
                      subscription that will be automatically canceled upon
                      deletion.
                    </p>
                  </div>
                )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center cursor-pointer"
                  disabled={isDeleting}
                >
                  {isDeleting && (
                    <span className="mr-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  )}
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
