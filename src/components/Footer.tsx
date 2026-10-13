import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Star, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="bg-[#08080a] border-t border-white/5 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="font-cinzel text-xl font-bold tracking-wider text-amber-400 block">
              CAFE TRIESTE
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed">
              DHA Phase 1 Islamabad&apos;s premier steakhouse & continental bistro. Masterfully seared prime beef cuts, artisan coffee, and welcoming hospitality in Business Bay.
            </p>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <strong className="text-white font-semibold">4.2 / 5.0</strong>
              <span className="text-zinc-500">· 1,883 Google reviews</span>
            </div>
            <p className="text-[11px] text-zinc-500 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400" />
              Proudly women-owned and community cherished
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-white tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-amber-400 transition-colors">Restaurant Overview</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">A La Carte Menu</a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-amber-400 transition-colors">Mushroom & Italian Steaks</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">Google Diner Reviews</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-amber-400 transition-colors">Popular Times & Schedule</a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  Book a Table Online
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-white tracking-wide">
              Address & Hours
            </h4>
            <div className="space-y-2 text-xs leading-relaxed text-zinc-400">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Shop 16A, Street 26, Business Bay, Sector F, DHA Phase 1, Islamabad</span>
              </p>
              <p className="text-[11px] text-zinc-500 font-mono">Plus Code: G3CV+VH</p>
              <div className="pt-1">
                <span className="text-zinc-300 block font-medium">Daily Service Hours:</span>
                <span className="text-zinc-400">Monday – Sunday: 11:00 AM – 12:00 AM</span>
              </div>
            </div>
          </div>

          {/* Contact & Orders */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-white tracking-wide">
              Connect & Order
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
              <div className="pt-2 space-y-1.5">
                <a
                  href={RESTAURANT_INFO.foodpandaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-pink-400 hover:underline"
                >
                  Order on Foodpanda.pk
                </a>
                <a
                  href={RESTAURANT_INFO.facebookMenuUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-400 hover:text-white"
                >
                  Official Facebook Page & Updates
                </a>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-amber-400/80 hover:text-amber-300"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Cafe Trieste Islamabad. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Dine-in · Curbside pickup · No-contact delivery</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">Vercel Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
