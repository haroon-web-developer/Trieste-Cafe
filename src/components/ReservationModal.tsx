import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '12:00 PM', '1:00 PM', '2:00 PM', '3:30 PM',
  '5:00 PM', '6:30 PM', '7:30 PM', '8:30 PM',
  '9:30 PM', '10:30 PM'
];

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('7:30 PM');
  const [guests, setGuests] = useState('2 Guests');
  const [seatingArea, setSeatingArea] = useState('Cozy Leather Booth');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialOccasion, setSpecialOccasion] = useState('Casual Dining');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const randomId = `TR-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBookingId(randomId);
  };

  const handleReset = () => {
    setConfirmedBookingId(null);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Cafe Trieste! I would like to confirm my table reservation:\n\n` +
    `Ref ID: ${confirmedBookingId}\n` +
    `Name: ${fullName}\n` +
    `Date: ${date}\n` +
    `Time: ${time}\n` +
    `Guests: ${guests}\n` +
    `Seating: ${seatingArea}\n` +
    `Occasion: ${specialOccasion}\n` +
    `Notes: ${specialNotes || 'None'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14151b] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBookingId ? (
          /* Confirmation Success View */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/30">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                Table Reserved
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                We Can&apos;t Wait to Host You!
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Booking reference code: <strong className="text-amber-300 font-mono text-sm">{confirmedBookingId}</strong>
              </p>
            </div>

            <div className="bg-zinc-900/90 rounded-xl p-4 text-left border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-400">Guest Name:</span>
                <span className="text-white font-medium">{fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-400">Date & Time:</span>
                <span className="text-white font-medium">{date} at {time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-zinc-400">Party Size:</span>
                <span className="text-white font-medium">{guests} ({seatingArea})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Location:</span>
                <span className="text-zinc-300 font-medium">Business Bay, DHA Phase 1 Islamabad</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/92515400170?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm via WhatsApp</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors border border-zinc-700"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Restaurant</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-xs text-zinc-400 hover:text-white pt-2 cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="pb-4 border-b border-zinc-800">
              <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Table Reservation
              </p>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-0.5">
                Reserve Your Dining Experience
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Experience Islamabad&apos;s premier steaks & bistro in DHA Phase 1 Business Bay.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Dining Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests (Family/Friends)</option>
                    <option value="5-6 Guests">5–6 Guests</option>
                    <option value="7-10 Guests">7–10 Guests (Large Table)</option>
                    <option value="12+ Guests">12+ Guests (Private Booking)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5">Seating Preference</label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cozy Leather Booth">Cozy Leather Booth</option>
                    <option value="Main Dining Hall">Main Dining Hall</option>
                    <option value="Quiet Window Table">Quiet Window Table</option>
                    <option value="Outdoor Terrace">Outdoor Terrace</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Bilal Qureshi"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1.5">Dining Occasion</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Casual Dining', 'Birthday', 'Anniversary', 'Business Meeting'].map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setSpecialOccasion(occ)}
                      className={`py-2 px-2.5 text-[11px] rounded-lg border transition-all cursor-pointer ${
                        specialOccasion === occ
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1.5">Special Dietary / Seating Requests</label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g., High chair needed, celebrating anniversary..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Table Reservation</span>
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-2">
                  No reservation fee required. Immediate confirmation code provided.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
