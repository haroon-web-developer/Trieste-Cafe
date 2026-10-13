import React, { useState } from 'react';
import { X, Check, Flame, Clock } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const STEAK_DONENESS_OPTIONS = [
  { value: 'Medium Rare', desc: 'Warm red center, very tender & juicy' },
  { value: 'Medium', desc: 'Warm pink center, balanced tenderness' },
  { value: 'Medium Well', desc: 'Slight hint of pink, firm texture' },
  { value: 'Well Done', desc: 'Cooked thoroughly through, browned throughout' },
];

const SIDE_OPTIONS = [
  'Roasted Herb Baby Potatoes',
  'Velvety Garlic Mashed Potatoes',
  'Signature Hand-Cut Fries',
  'Char-Grilled Fresh Vegetables',
];

export const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [selectedDoneness, setSelectedDoneness] = useState<string>('Medium');
  const [selectedSide, setSelectedSide] = useState<string>('Roasted Herb Baby Potatoes');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const isSteak = item.category === 'beef_steaks' || item.category === 'chef_deals';

  const handleAdd = () => {
    addToCart(item, {
      doneness: isSteak ? selectedDoneness : undefined,
      side: item.includesSides ? selectedSide : undefined,
      notes: specialInstructions,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14151b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header with optional item image */}
        {item.image ? (
          <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-5 border-b border-zinc-800">
            <h3 className="font-cinzel text-lg font-bold text-white">{item.name}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-cinzel text-xl font-bold text-white">{item.name}</h3>
              <span className="font-semibold text-amber-400 text-lg tabular-nums">
                Rs {item.price.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>
            {item.prepTime && (
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Preparation time: {item.prepTime}</span>
              </div>
            )}
          </div>

          {/* Steak Doneness Selector */}
          {isSteak && (
            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Steak Doneness Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STEAK_DONENESS_OPTIONS.map((doneness) => (
                  <button
                    key={doneness.value}
                    type="button"
                    onClick={() => setSelectedDoneness(doneness.value)}
                    className={`text-left p-2.5 rounded-lg border transition-all text-xs cursor-pointer ${
                      selectedDoneness === doneness.value
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span>{doneness.value}</span>
                      {selectedDoneness === doneness.value && (
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">{doneness.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Complimentary Sides Selection */}
          {item.includesSides && (
            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Choose Complimentary Side
              </label>
              <div className="space-y-1.5">
                {SIDE_OPTIONS.map((side) => (
                  <button
                    key={side}
                    type="button"
                    onClick={() => setSelectedSide(side)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md border transition-all cursor-pointer ${
                      selectedSide === side
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span>{side}</span>
                    {selectedSide === side && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div className="pt-2 border-t border-zinc-800">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Special Instructions / Dietary Notes
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Extra peppercorn sauce, sauce on side..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] text-zinc-400 block">Total Item Price</span>
            <span className="font-semibold text-white text-base tabular-nums">
              Rs {item.price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              Add to Order Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
