import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Share2, Bookmark, Smartphone, ExternalLink, Check, Copy } from 'lucide-react';
import { RESTAURANT_INFO, NEARBY_RESTAURANTS } from '../data/restaurantData';

export const LocationAndHours: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cafe Trieste - DHA Phase 1 Islamabad',
        text: 'Join me for prime steaks and artisan coffee at Cafe Trieste in Business Bay, DHA Phase 1, Islamabad!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  return (
    <section id="location" className="py-24 bg-[#0e0e12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Location & Access
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Find Us in Business Bay
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Conveniently situated in Sector F, DHA Phase 1 Islamabad with dedicated parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Location Card & Quick Interactive Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#121318] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                  Google Maps Verified Address
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                  Shop 16A, Street 26, Business Bay
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  Sector F DHA Phase 1, Islamabad, Federal Territory, Pakistan
                </p>
              </div>

              {/* Plus Code Badge */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-white/5 text-xs">
                <div>
                  <span className="text-[11px] text-zinc-500 block">Google Plus Code</span>
                  <span className="font-mono text-amber-300 font-medium">{RESTAURANT_INFO.plusCode}</span>
                </div>
                <button
                  onClick={handleCopyPlusCode}
                  className="px-2.5 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-800 rounded flex items-center gap-1 cursor-pointer"
                  title="Copy Plus Code"
                >
                  {copiedPlusCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPlusCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone & Contact */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-white/5 text-xs">
                <div>
                  <span className="text-[11px] text-zinc-500 block">Reservations & Takeout Desk</span>
                  <span className="font-mono text-white font-medium">{RESTAURANT_INFO.phone}</span>
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="px-3 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
              </div>

              {/* Action Buttons Row directly matching user prompt buttons: Directions, Save, Nearby, Send to phone, Share */}
              <div className="pt-2 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold flex flex-col items-center justify-center gap-1 text-center transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </a>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleCopyAddress}
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Smartphone className="w-4 h-4" />}
                  <span>{copiedAddress ? 'Address Copied' : 'Send to Phone'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white flex flex-col items-center justify-center gap-1 text-center transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {sharedToast && (
                <div className="text-center text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded p-2">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* People Also Search For from User Prompt */}
            <div className="bg-[#121318] border border-white/5 rounded-2xl p-6 sm:p-8">
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                People Also Search For in Islamabad & Bahria
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {NEARBY_RESTAURANTS.map((place) => (
                  <div
                    key={place.name}
                    className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="font-medium text-white truncate">{place.name}</h5>
                      <span className="text-[11px] text-zinc-500">{place.type}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="text-amber-400 font-medium">★ {place.rating}</span>
                      <span>({place.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Maps Frame & Landmark Guide */}
          <div className="lg:col-span-6 bg-[#121318] border border-white/5 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Interactive Map & Satellite Preview
                </span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map embed styling */}
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <iframe
                  title="Cafe Trieste Google Maps DHA Phase 1 Islamabad"
                  src="https://maps.google.com/maps?q=Cafe+Trieste+DHA+Phase+1+Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter grayscale-[25%] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#0c0d10]/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-[11px] text-zinc-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Cafe Trieste · Sector F Business Bay</span>
                </div>
              </div>
            </div>

            {/* Quick Directions & Transit pointers */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2 text-xs text-zinc-300">
              <h5 className="font-semibold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Nearby Landmarks & Access:
              </h5>
              <ul className="space-y-1 text-zinc-400 list-disc list-inside">
                <li>Accessible directly from GT Road via DHA Phase 1 Main Gate</li>
                <li>Located right within Business Bay commercial boulevard (Shop 16A, Street 26)</li>
                <li>5 minutes from Bahria Town Phase 7 entrance and Fauji Foundation Hospital</li>
                <li>Ample complimentary street parking immediately fronting the cafe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
