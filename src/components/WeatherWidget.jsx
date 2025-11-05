import React, { useEffect, useState } from 'react';
import { CloudRain, Thermometer, Wind, MapPin } from 'lucide-react';

export default function WeatherWidget() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude.toFixed(2), lon: pos.coords.longitude.toFixed(2) });
        setLoading(false);
      },
      () => setLoading(false),
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, []);

  return (
    <section className="px-4 -mt-6">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
            <div className="flex items-center gap-2"><CloudRain className="w-5 h-5" /><span className="font-semibold">Climate Monitor</span></div>
            <div className="text-xs flex items-center gap-1 opacity-90">
              <MapPin className="w-4 h-4" />
              {coords ? `${coords.lat}, ${coords.lon}` : 'Location'}
            </div>
          </div>
          <div className="p-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <Thermometer className="w-5 h-5 mx-auto text-emerald-600" />
              <div className="text-2xl font-bold text-slate-800">29°C</div>
              <div className="text-xs text-slate-500">Feels like 31°C</div>
            </div>
            <div>
              <Wind className="w-5 h-5 mx-auto text-emerald-600" />
              <div className="text-2xl font-bold text-slate-800">12 km/h</div>
              <div className="text-xs text-slate-500">Winds</div>
            </div>
            <div>
              <CloudRain className="w-5 h-5 mx-auto text-emerald-600" />
              <div className="text-2xl font-bold text-slate-800">35%</div>
              <div className="text-xs text-slate-500">Rain chance</div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => (
                <div key={d} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <div className="text-xs text-slate-500">{d}</div>
                  <div className="text-sm font-semibold text-slate-800">{26 + (i%3)}°C</div>
                </div>
              ))}
            </div>
          </div>
          {loading && (
            <div className="p-3 text-center text-xs text-slate-500">Fetching your location for hyper-local forecasts…</div>
          )}
        </div>
      </div>
    </section>
  );
}
