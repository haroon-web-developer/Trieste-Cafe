import React, { useState } from 'react';
import { ShoppingBag, Calendar, Phone, Menu as MenuIcon, X, MapPin, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-[#0e0e12]/95 backdrop-blur-md border-b border-white/5 transition-all">
      {/* Narrow info line above navbar */}
      <div className="bg-[#08080b] border-b border-white/10 text-[11px] sm:text-xs py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-zinc-300">
          <span className="flex items-center gap-1 text-amber-300 font-medium">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            Sector F, DHA Phase 1, Islamabad
          </span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="flex items-center gap-1 text-zinc-200">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
            <strong className="text-white font-semibold tabular-nums">4.2</strong>
            <span>(1,883 Google reviews)</span>
          </span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-300">Rs 1,000–6,000</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            Opens daily 11:00 AM – Midnight
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title (single text element) */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors whitespace-nowrap">
            CAFE TRIESTE
          </span>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a href="#overview" className="hover:text-amber-400 transition-colors">Overview</a>
          <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
          <a href="#highlights" className="hover:text-amber-400 transition-colors">Highlights</a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
          <a href="#hours" className="hover:text-amber-400 transition-colors">Hours</a>
          <a href="#location" className="hover:text-amber-400 transition-colors">Location</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <a
            href={`tel:${RESTAURANT_INFO.phoneClean}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            title="Call Cafe Trieste"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="whitespace-nowrap">{RESTAURANT_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenReservation}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Table</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-white bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700/80 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            aria-label="View Order Bag"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-zinc-950 bg-amber-400 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121318] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-zinc-300">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Overview
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Menu & Deals
            </a>
            <a
              href="#highlights"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Highlights & Steaks
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Google Reviews (1,883)
            </a>
            <a
              href="#hours"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Hours & Popular Times
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Directions & Map
            </a>
          </nav>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Table</span>
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 rounded-md transition-colors border border-zinc-700/60"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call +92 51 5400170</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
