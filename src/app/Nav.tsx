import React from "react";
import Auth from "./Auth";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/logo.png" alt="Proxy Mailer" width={120} height={36} />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/docs" className="text-lg font-medium">
              Docs
            </Link>
            <Auth />
          </div>
        </div>
      </div>
    </nav>
  );
}
