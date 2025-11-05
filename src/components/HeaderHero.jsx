import React from 'react';
import { Leaf, MapPin } from 'lucide-react';

export default function HeaderHero() {
  return (
    <header className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-blue-800 text-white">
        <div className="px-4 pt-10 pb-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-200" aria-hidden="true" />
            <span className="tracking-wide uppercase text-emerald-200 text-xs font-semibold">KisanMitr Super App</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            Empowering Farmers with Markets, Finance, and Smart Agronomy
          </h1>
          <p className="mt-2 text-emerald-100/90 text-sm sm:text-base">
            One home for selling produce, finding storage, getting inputs, checking weather, and more.
          </p>

          <div className="mt-4 flex items-center gap-3 text-emerald-100/90 text-sm">
            <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> Your Location</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">Auto-detected</span>
          </div>
        </div>
      </div>

      {/* Decorative backdrop */}
      <div className="absolute inset-0 -z-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="w-[120%] h-40 -rotate-6 bg-gradient-to-r from-emerald-300 to-blue-400 blur-3xl translate-y-6" />
      </div>
    </header>
  );
}
