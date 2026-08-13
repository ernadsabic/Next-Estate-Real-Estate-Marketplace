"use client";

import { usePathname } from "next/navigation";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHomepage
          ? "container mx-auto absolute top-5 left-0 right-0 backdrop-blur-md bg-slate-900/40 rounded-3xl border border-white/10 text-white"
          : "sticky top-0 left-0 w-full py-2 bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs"
      }`}
    >
      {children}
    </header>
  );
}