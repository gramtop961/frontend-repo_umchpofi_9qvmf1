import React from 'react';
import { Store, Package, ShoppingCart, Banknote, Stethoscope, Bot, CloudSun, ToggleRight, BadgeInfo, FlaskConical, CalendarDays } from 'lucide-react';

const modules = [
  { key: 'market', title: 'Direct Market (P2P)', desc: 'List produce and sell directly to consumers.', icon: Store, color: 'from-emerald-500 to-emerald-600' },
  { key: 'warehouse', title: 'Warehouse Logistics', desc: 'Find and book storage spaces nearby.', icon: Package, color: 'from-blue-500 to-blue-600' },
  { key: 'inputs', title: 'Input Marketplace', desc: 'Buy tools, fertilizers, and pesticides.', icon: ShoppingCart, color: 'from-emerald-500 to-teal-600' },
  { key: 'finance', title: 'Agri-Finance Hub', desc: 'Discover low-interest loans and apply.', icon: Banknote, color: 'from-blue-600 to-indigo-600' },
  { key: 'doctor', title: 'AI Plant Doctor', desc: 'Detect diseases from plant photos.', icon: Stethoscope, color: 'from-emerald-600 to-green-700' },
  { key: 'chatbot', title: 'Farming Q&A Bot', desc: 'Ask questions anytime, anywhere.', icon: Bot, color: 'from-indigo-600 to-blue-700' },
  { key: 'climate', title: 'Climate Monitor', desc: '7-day forecast with alerts.', icon: CloudSun, color: 'from-sky-500 to-blue-600' },
  { key: 'iot', title: 'Irrigation Control', desc: 'Toggle water flow on/off securely.', icon: ToggleRight, color: 'from-teal-600 to-emerald-600' },
  { key: 'schemes', title: 'Govt. Schemes', desc: 'Find relevant subsidies and programs.', icon: BadgeInfo, color: 'from-blue-700 to-cyan-600' },
  { key: 'soil', title: 'Soil Health', desc: 'Visualize pH and nutrients from devices.', icon: FlaskConical, color: 'from-amber-500 to-orange-500' },
  { key: 'calendar', title: 'Organizer Calendar', desc: 'Plan sprays, irrigation, and harvests.', icon: CalendarDays, color: 'from-emerald-700 to-green-700' },
];

export default function ModuleGrid({ onOpen }) {
  return (
    <section className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold text-slate-800">Explore Modules</h2>
      <p className="text-slate-500 text-sm">Tap any card to open the dedicated workspace.</p>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {modules.map(({ key, title, desc, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => onOpen?.(key)}
            className="group text-left rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow transition-shadow"
          >
            <div className={`h-16 w-full bg-gradient-to-r ${color}`}>
              <div className="h-full w-full flex items-center justify-center">
                <Icon className="w-7 h-7 text-white drop-shadow" />
              </div>
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold text-slate-800 line-clamp-1">{title}</div>
              <div className="mt-1 text-xs text-slate-500 line-clamp-2">{desc}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
