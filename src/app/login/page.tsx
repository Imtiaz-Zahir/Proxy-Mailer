"use client";
import React from "react";
import { LogIn } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="bg-blue-500/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <LogIn className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to ProxyMail
          </h1>
          <p className="text-gray-300">
            Sign in to manage your email proxy settings
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
          <button
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center cursor-pointer"
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Need help?{" "}
            <a href="/contact" className="text-blue-400 hover:text-blue-300">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
