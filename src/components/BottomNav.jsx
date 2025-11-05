import React from 'react';
import { Home, Store, Calendar, Bot, Stethoscope } from 'lucide-react';

export default function BottomNav({ active, onChange }) {
  const items = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'market', label: 'Market', icon: Store },
    { key: 'doctor', label: 'AI Doctor', icon: Stethoscope },
    { key: 'calendar', label: 'Calendar', icon: Calendar },
    { key: 'chatbot', label: 'Chatbot', icon: Bot },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 bg-white/90 backdrop-blur border-t border-slate-200">
      <div className="max-w-5xl mx-auto grid grid-cols-5">
        {items.map(({ key, label, icon: Icon }) => {
          const selected = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${selected ? 'text-emerald-700' : 'text-slate-500 hover:text-emerald-700'}`}
              aria-current={selected ? 'page' : undefined}
            >
              <Icon className={`h-5 w-5 ${selected ? 'stroke-[2.5]' : ''}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
