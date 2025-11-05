import React, { useState } from 'react';
import HeaderHero from './components/HeaderHero';
import BottomNav from './components/BottomNav';
import ModuleGrid from './components/ModuleGrid';
import WeatherWidget from './components/WeatherWidget';

export default function App() {
  const [active, setActive] = useState('home');

  const renderContent = () => {
    switch (active) {
      case 'market':
        return (
          <section className="px-4 py-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800">Direct Market (P2P)</h2>
            <p className="text-slate-600 text-sm">Create listings, set fair prices, and sell directly to consumers. Search nearby buyers with map-based filters. Payments are secured end-to-end.</p>
            <div className="mt-4 grid gap-3">
              <input type="text" placeholder="Search produce (e.g., tomatoes, wheat)" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
              <button className="rounded-lg bg-emerald-700 text-white px-4 py-2 font-medium hover:bg-emerald-800">Create New Listing</button>
            </div>
          </section>
        );
      case 'doctor':
        return (
          <section className="px-4 py-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800">AI Plant Doctor</h2>
            <p className="text-slate-600 text-sm">Upload a clear photo of an affected leaf or stem. Get instant diagnosis, severity, and treatment recommendations.</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="block text-sm font-medium text-slate-700">Upload Plant Image</label>
              <input type="file" accept="image/*" className="mt-2 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-white hover:file:bg-emerald-800" />
              <div className="mt-3 text-xs text-slate-500">Note: This demo showcases the interface. Connect backend AI to enable live diagnosis.</div>
            </div>
          </section>
        );
      case 'calendar':
        return (
          <section className="px-4 py-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800">Farming Organizer Calendar</h2>
            <p className="text-slate-600 text-sm">Plan pesticide sprays, fertilizer applications, irrigation cycles, and harvests. Reminders keep you on track.</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="text-xs text-slate-500">{`Day ${i + 1}`}</div>
                  <div className="text-sm font-semibold text-slate-800">No events</div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'chatbot':
        return (
          <section className="px-4 py-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800">Farming Q&A Bot</h2>
            <p className="text-slate-600 text-sm">Ask about crop management, pests, irrigation, and best practices. Available 24/7.</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="h-40 rounded-md bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">Conversation will appear here…</div>
              <div className="mt-3 flex gap-2">
                <input type="text" placeholder="Type your question…" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
                <button className="rounded-lg bg-emerald-700 text-white px-4 py-2 font-medium hover:bg-emerald-800">Send</button>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <>
            <WeatherWidget />
            <ModuleGrid onOpen={(key) => setActive(key)} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <HeaderHero />
      {renderContent()}
      <BottomNav active={active} onChange={setActive} />
    </div>
  );
}
