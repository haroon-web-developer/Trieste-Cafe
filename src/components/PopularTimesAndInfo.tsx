import React, { useState } from 'react';
import { Clock, Users, ShieldCheck, Heart, Car, Utensils, Bike } from 'lucide-react';
import { POPULAR_HOURS_DATA, RESTAURANT_INFO } from '../data/restaurantData';

export const PopularTimesAndInfo: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wednesdays');
  const days = ['Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];

  return (
    <section id="hours" className="py-24 bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Popular Times Chart */}
          <div className="lg:col-span-7 bg-[#121318] border border-white/5 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  Google Maps Live Data
                </p>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Popular Dining Times
                </h3>
              </div>

              {/* Day Selector */}
              <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-white/5">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      selectedDay === day
                        ? 'bg-amber-400 text-zinc-950 font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {day.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular times bar histogram */}
            <div className="mt-8">
              <div className="flex items-end justify-between gap-2 h-44 pb-2 border-b border-zinc-800">
                {POPULAR_HOURS_DATA.map((item, index) => {
                  // highlight evening peak (8-9pm)
                  const isPeak = item.time === '8 PM' || item.time === '9 PM';
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-amber-300 font-mono whitespace-nowrap">
                        {item.percentage}%
                      </div>
                      <div
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          isPeak
                            ? 'bg-amber-400 group-hover:bg-amber-300'
                            : 'bg-zinc-700/80 group-hover:bg-zinc-600'
                        }`}
                        style={{ height: `${item.percentage}%` }}
                      />
                      <span className="text-[11px] text-zinc-400 mt-1 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-amber-400" />
                  <span>Peak Hours (8:00 PM – 10:00 PM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-xs bg-zinc-700" />
                  <span>Standard Seating</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-3 text-xs text-zinc-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-white">Diner Tip:</strong> For quiet romantic dining or business lunches, visit between 12:00 PM – 5:00 PM. For vibrant steakhouse energy, visit around 8:00 PM.
              </p>
            </div>
          </div>

          {/* Right Column: Weekly Schedule & Service Accreditations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Opening Hours Schedule */}
            <div className="bg-[#121318] border border-white/5 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-amber-400" />
                <h4 className="font-cinzel text-lg font-bold text-white">Opening Hours</h4>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { day: 'Monday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Tuesday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Wednesday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Thursday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Friday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Saturday', hours: '11:00 AM – 12:00 AM' },
                  { day: 'Sunday', hours: '11:00 AM – 12:00 AM' },
                ].map((schedule, i) => (
                  <div
                    key={schedule.day}
                    className={`flex items-center justify-between py-1.5 px-2 rounded ${
                      i === 2 ? 'bg-amber-400/10 text-amber-200' : 'text-zinc-300'
                    }`}
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className="tabular-nums font-mono text-zinc-400">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services & Women-Owned Badge */}
            <div className="bg-[#121318] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Women-Owned Establishment</h4>
                  <p className="text-xs text-zinc-400">
                    Proudly led and curated with warmth, quality ingredients, and meticulous kitchen standards.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 flex flex-col items-center text-center">
                  <Utensils className="w-4 h-4 text-amber-400 mb-1" />
                  <span className="font-medium text-white">Dine-in</span>
                  <span className="text-[10px] text-zinc-500">Fine seating</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 flex flex-col items-center text-center">
                  <Car className="w-4 h-4 text-amber-400 mb-1" />
                  <span className="font-medium text-white">Curbside</span>
                  <span className="text-[10px] text-zinc-500">Fast car pickup</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/5 flex flex-col items-center text-center">
                  <Bike className="w-4 h-4 text-amber-400 mb-1" />
                  <span className="font-medium text-white">No-Contact</span>
                  <span className="text-[10px] text-zinc-500">Safe delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
