"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Auth() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (session) {
    return (
      <div className="relative group">
        <div onClick={toggleDropdown} className="cursor-pointer">
          {session.user?.image ? (
            <Image
              src={session.user?.image}
              className="hover:opacity-90 transition-opacity"
              style={{ borderRadius: "100%" }}
              height={28}
              width={28}
              priority={true}
              alt={session.user?.name ?? "User"}
              unoptimized={true}
            />
          ) : (
            <div className="w-7 h-7 bg-gray-300 rounded-full" />
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 bg-slate-800 shadow-md rounded mt-1 right-0 w-48 py-2">
            <div className="px-4 py-2 border-b">
              <p className="font-medium text-sm">
                {session.user?.name ?? "User"}
              </p>
              <p className="text-xs text-gray-500">
                {session.user?.email ?? ""}
              </p>
            </div>
            <div className="pt-1">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm hover:bg-slate-700"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ redirectTo: "/" })}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
        onClick={() => signIn("google", { redirectTo: "/dashboard" })}
      >
        Get Started
      </button>
    );
  }
}
