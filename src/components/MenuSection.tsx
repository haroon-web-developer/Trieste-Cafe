import React, { useState, useMemo } from 'react';
import { Search, Flame, SlidersHorizontal, Plus, Check, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { MenuItemModal } from './MenuItemModal';
import { useCart } from '../context/CartContext';

type CategoryFilter = 'all' | 'beef_steaks' | 'chicken_steaks' | 'burgers' | 'appetizers' | 'coffee_drinks' | 'chef_deals';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'beef_steaks', label: 'Prime Beef Steaks' },
    { id: 'chicken_steaks', label: 'Chicken Steaks' },
    { id: 'chef_deals', label: 'Special Deals (BOGO)' },
    { id: 'burgers', label: 'Gourmet Burgers' },
    { id: 'appetizers', label: 'Nachos & Starters' },
    { id: 'coffee_drinks', label: 'Artisan Coffee & Drinks' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.category === 'beef_steaks' || item.includesSides) {
      setSelectedItemForModal(item);
    } else {
      addToCart(item);
      setJustAddedId(item.id);
      setTimeout(() => setJustAddedId(null), 1200);
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Culinary Craftsmanship
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Handcrafted Menu
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            From prime cut aged beef steaks sizzling on cast iron to velvety artisan espresso. Prepared fresh in DHA Phase 1 Business Bay.
          </p>
        </div>

        {/* Featured Highlights Spotlight Bar - Spark icon removed */}
        <div id="highlights" className="mt-12 bg-gradient-to-r from-amber-950/20 via-zinc-900 to-amber-950/20 border border-amber-500/20 rounded-xl p-5 sm:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Guest Favorites & House Specials</h4>
                <p className="text-xs text-zinc-400">
                  Prime Mushroom Steak, Signature Italian Steak & Buy-One-Get-One Special Deals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="text-zinc-400">Average Spend:</span>
              <strong className="text-amber-300 font-semibold tabular-nums">Rs 1,000 – 6,000 / person</strong>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search steaks, burgers, coffee..."
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Menu Items Grid - Every Single Dish & Deal has an image */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItemForModal(item)}
              className="group bg-[#121318] border border-white/5 hover:border-amber-500/30 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-lg cursor-pointer"
            >
              <div>
                {/* Culinary Dish / Deal Image */}
                <div className="relative h-52 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-transparent opacity-75" />
                  {item.popular && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200 bg-amber-950/80 border border-amber-600/50 rounded backdrop-blur-sm">
                      Popular
                    </span>
                  )}
                  {item.category === 'chef_deals' && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-200 bg-rose-950/80 border border-rose-600/50 rounded backdrop-blur-sm">
                      Special Deal
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-cinzel text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action Bar */}
              <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-sm font-semibold text-amber-400 tabular-nums">
                  Rs {item.price.toLocaleString()}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(item, e)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    justAddedId === item.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-white/5'
                  }`}
                >
                  {justAddedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : item.includesSides || item.category === 'beef_steaks' ? (
                    <>
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search has no results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-zinc-400">No dishes found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs text-amber-400 hover:underline"
            >
              Reset search filters
            </button>
          </div>
        )}
      </div>

      {/* Item Customization Modal */}
      {selectedItemForModal && (
        <MenuItemModal
          item={selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
        />
      )}
    </section>
  );
};
