import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { PopularTimesAndInfo } from './components/PopularTimesAndInfo';
import { LocationAndHours } from './components/LocationAndHours';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';

export function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0c0d10] text-[#f4f4f5] flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
        {/* Navigation Bar following Top Bar Contract */}
        <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero onOpenReservation={() => setIsReservationOpen(true)} />
          <MenuSection />
          <ReviewsSection />
          <PopularTimesAndInfo />
          <LocationAndHours />
        </main>

        {/* Quiet Footer */}
        <Footer onOpenReservation={() => setIsReservationOpen(true)} />

        {/* Slide-over Bag Drawer & Reservation Modal */}
        <CartDrawer />
        <ReservationModal
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
