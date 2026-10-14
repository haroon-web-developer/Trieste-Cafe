import React from 'react';
import { Phone, ExternalLink, Calendar, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import storefrontImg from '../assets/images/image_7daa5fe7.jpg';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  return (
    <section
      id="overview"
      className="relative min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-end overflow-hidden"
    >
      {/* Real Cafe Trieste Storefront Photo with Full Height & Clear Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={storefrontImg}
          alt="Cafe Trieste Restaurant & Artisan Bistro Exterior Storefront in DHA Phase 1 Islamabad"
          className="w-full h-full object-cover object-center lg:object-[center_18%] lg:translate-y-6 lg:scale-105 filter brightness-[0.92] contrast-[1.03] saturate-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Soft, low-opacity scrims to keep the entire building storefront crisp and visible */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-black/20 to-transparent" />
      </div>

      {/* Hero Content positioned elegantly in the lower zone to leave the T TRIESTE facade clear */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pb-16 lg:pb-20 text-center flex flex-col items-center w-full">
        {/* Descriptive Prose with backdrop blur & shadow for crisp readability */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-100 max-w-2xl font-medium leading-relaxed text-balance drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          Islamabad&apos;s premier destination for prime sizzling mushroom steaks, authentic Italian tenderloin cuts, handcrafted burgers, and specialty roasted espresso.
        </p>

        {/* Action CTAs */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          <button
            onClick={onOpenReservation}
            className="px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-xl hover:shadow-amber-400/30 flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>

          <a
            href="#menu"
            className="px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg"
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Explore Menu</span>
          </a>

          <a
            href={RESTAURANT_INFO.foodpandaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-3 text-xs sm:text-sm font-semibold text-pink-200 bg-pink-950/70 hover:bg-pink-900/80 backdrop-blur-md border border-pink-500/40 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg"
          >
            <span>Order on foodpanda</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={`tel:${RESTAURANT_INFO.phoneClean}`}
            className="px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-medium text-zinc-100 hover:text-white bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-md transition-colors flex items-center gap-2 whitespace-nowrap border border-white/15 shadow-lg"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{RESTAURANT_INFO.phone}</span>
          </a>
        </div>

        {/* Clean Service Strip with translucent glass cards */}
        <div className="mt-10 sm:mt-12 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-7 border-t border-white/15 text-left">
          <div className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-xs text-zinc-300">Atmosphere</p>
            <p className="text-sm font-semibold text-zinc-100 mt-0.5">Dine-in & Booths</p>
            <span className="text-[11px] text-zinc-400">Cozy lighting & leather</span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-xs text-zinc-300">Convenience</p>
            <p className="text-sm font-semibold text-zinc-100 mt-0.5">Curbside Pickup</p>
            <span className="text-[11px] text-zinc-400">Fast Business Bay bay delivery</span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-xs text-zinc-300">Doorstep Delivery</p>
            <p className="text-sm font-semibold text-zinc-100 mt-0.5">No-contact delivery</p>
            <span className="text-[11px] text-zinc-400">Via foodpanda.pk & in-house</span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-xs text-zinc-300">Community Heritage</p>
            <p className="text-sm font-semibold text-amber-300 mt-0.5">Women-Owned</p>
            <span className="text-[11px] text-zinc-400">Hospitality & curated cuisine</span>
          </div>
        </div>
      </div>
    </section>
  );
};
