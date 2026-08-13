import { Building2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[81vh] flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

        <div className="absolute text-indigo-600 animate-pulse">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      <p className="mt-4 text-slate-500 font-medium animate-pulse text-sm">
        Loading Next<span className="text-indigo-600 font-bold">Estate</span>...
      </p>
    </div>
  );
}
