import React, { useEffect, useState } from 'react';
import HeaderHero from './components/HeaderHero';
import BottomNav from './components/BottomNav';
import ModuleGrid from './components/ModuleGrid';
import WeatherWidget from './components/WeatherWidget';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [active, setActive] = useState('home');

  // Shared helpers
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // AI Doctor state
  const [diagnosis, setDiagnosis] = useState(null);

  // Chatbot state
  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Calendar state
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ title: '', date: '', category: 'other', notes: '' });

  useEffect(() => {
    if (active === 'calendar') {
      fetch(`${API_BASE}/calendar/events`).then(r => r.json()).then(d => {
        setEvents(d.items || []);
      }).catch(() => {});
    }
  }, [active]);

  const handleUpload = async (file) => {
    setLoading(true); setError(''); setDiagnosis(null);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${API_BASE}/ai/diagnose`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setDiagnosis(data);
    } catch (e) {
      setError('Unable to diagnose right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    setChat((c) => [...c, userMsg]);
    setChatInput('');
    try {
      const res = await fetch(`${API_BASE}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg.text }) });
      const data = await res.json();
      setChat((c) => [...c, { role: 'bot', text: data.reply || '…' }]);
    } catch {
      setChat((c) => [...c, { role: 'bot', text: 'Network issue. Please try again.' }]);
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...eventForm, date: new Date(eventForm.date).toISOString() };
      const res = await fetch(`${API_BASE}/calendar/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Failed');
      // refresh
      const list = await fetch(`${API_BASE}/calendar/events`).then(r => r.json());
      setEvents(list.items || []);
      setEventForm({ title: '', date: '', category: 'other', notes: '' });
    } catch (err) {
      setError('Could not save event.');
    }
  };

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
              <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-white hover:file:bg-emerald-800"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
              {loading && <div className="mt-3 text-sm text-slate-600">Analyzing image…</div>}
              {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
              {diagnosis && (
                <div className="mt-4 grid gap-2 text-sm">
                  <div><span className="font-semibold text-slate-800">Disease:</span> {diagnosis.disease}</div>
                  <div><span className="font-semibold text-slate-800">Severity:</span> {diagnosis.severity}</div>
                  <div><span className="font-semibold text-slate-800">Organic:</span> {diagnosis.organic_treatment}</div>
                  <div><span className="font-semibold text-slate-800">Chemical:</span> {diagnosis.chemical_treatment}</div>
                </div>
              )}
            </div>
          </section>
        );
      case 'calendar':
        return (
          <section className="px-4 py-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800">Farming Organizer Calendar</h2>
            <p className="text-slate-600 text-sm">Plan pesticide sprays, fertilizer applications, irrigation cycles, and harvests. Reminders keep you on track.</p>

            <form onSubmit={addEvent} className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid sm:grid-cols-4 gap-3">
                <input value={eventForm.title} onChange={(e)=>setEventForm({...eventForm, title: e.target.value})} required type="text" placeholder="Event title" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
                <input value={eventForm.date} onChange={(e)=>setEventForm({...eventForm, date: e.target.value})} required type="datetime-local" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
                <select value={eventForm.category} onChange={(e)=>setEventForm({...eventForm, category: e.target.value})} className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                  <option value="spray">Spray</option>
                  <option value="fertilizer">Fertilizer</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="harvest">Harvest</option>
                  <option value="other">Other</option>
                </select>
                <input value={eventForm.notes} onChange={(e)=>setEventForm({...eventForm, notes: e.target.value})} type="text" placeholder="Notes (optional)" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-lg bg-emerald-700 text-white px-4 py-2 font-medium hover:bg-emerald-800">Add Event</button>
                {error && <span className="text-sm text-red-600">{error}</span>}
              </div>
            </form>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {events.map((ev) => (
                <div key={ev.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="text-xs text-slate-500">{new Date(ev.date).toLocaleString()}</div>
                  <div className="text-sm font-semibold text-slate-800">{ev.title}</div>
                  <div className="text-xs text-emerald-700 font-medium">{ev.category}</div>
                  {ev.notes && <div className="text-xs text-slate-600 mt-1">{ev.notes}</div>}
                </div>
              ))}
              {events.length === 0 && (
                <div className="text-sm text-slate-500">No events yet. Add your first schedule above.</div>
              )}
            </div>
          </section>
        );
      case 'chatbot':
        return (
          <section className="px-4 py-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-slate-800">Farming Q&A Bot</h2>
            <p className="text-slate-600 text-sm">Ask about crop management, pests, irrigation, and best practices. Available 24/7.</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="h-48 rounded-md bg-slate-50 border border-dashed border-slate-200 p-3 overflow-y-auto text-sm">
                {chat.length === 0 && <div className="text-slate-400">Conversation will appear here…</div>}
                {chat.map((m, i) => (
                  <div key={i} className={`mt-2 ${m.role === 'user' ? 'text-slate-800' : 'text-emerald-700'}`}>
                    <span className="font-semibold mr-1">{m.role === 'user' ? 'You' : 'KisanMitr'}:</span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <input value={chatInput} onChange={(e)=>setChatInput(e.target.value)} type="text" placeholder="Type your question…" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
                <button onClick={sendMessage} className="rounded-lg bg-emerald-700 text-white px-4 py-2 font-medium hover:bg-emerald-800">Send</button>
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
