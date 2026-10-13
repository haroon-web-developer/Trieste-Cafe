import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ExternalLink, Phone, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('pickup');

  if (!isCartOpen) return null;

  const orderSummaryText = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.menuItem.name} x${item.quantity} (Rs ${item.menuItem.price * item.quantity})` +
        (item.steakDoneness ? `\n   - Doneness: ${item.steakDoneness}` : '') +
        (item.selectedSide ? `\n   - Side: ${item.selectedSide}` : '') +
        (item.specialInstructions ? `\n   - Notes: ${item.specialInstructions}` : '')
    )
    .join('\n');

  const whatsappMessage = encodeURIComponent(
    `Hello Cafe Trieste! I would like to place an order:\n\n` +
    `*Order Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Curbside / Takeaway Pickup'}\n` +
    `*Customer Name:* ${customerName || 'Guest'}\n` +
    (orderType === 'delivery' ? `*Delivery Address:* ${deliveryAddress || 'DHA Phase 1'}\n` : '') +
    `\n*Items Ordered:*\n${orderSummaryText}\n\n` +
    `*Total Bill:* Rs ${cartTotal.toLocaleString()}\n` +
    `Please confirm the order preparation time!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121318] border-l border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-cinzel text-lg font-bold text-white">Your Order Bag</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                <p className="text-sm text-zinc-400">Your bag is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  Browse our prime steaks & menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-semibold text-white">{item.menuItem.name}</h4>
                        <span className="text-xs font-mono text-amber-400 tabular-nums">
                          Rs {(item.menuItem.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(item.steakDoneness || item.selectedSide) && (
                      <div className="text-[11px] text-zinc-400 space-y-0.5 bg-black/30 p-2 rounded">
                        {item.steakDoneness && (
                          <p>
                            <span className="text-zinc-500">Doneness:</span> {item.steakDoneness}
                          </p>
                        )}
                        {item.selectedSide && (
                          <p>
                            <span className="text-zinc-500">Side:</span> {item.selectedSide}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-zinc-800 rounded px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono text-white px-1 tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-zinc-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-[11px] text-zinc-500">
                        Rs {item.menuItem.price.toLocaleString()} each
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="w-full text-right text-[11px] text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Empty bag
                </button>
              </div>
            )}

            {/* Customer Details Form if cart has items */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Order Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer ${
                        orderType === 'pickup'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Curbside / Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer ${
                        orderType === 'delivery'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Home Delivery
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Haroon Ashraf"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-zinc-400 font-medium mb-1">Delivery Address (Islamabad/DHA)</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g., Street 14, Sector E, DHA 1"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-zinc-950 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Total Bill Amount</span>
                <span className="font-bold text-amber-400 font-mono text-lg tabular-nums">
                  Rs {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <a
                  href={`https://wa.me/92515400170?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href={RESTAURANT_INFO.foodpandaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-pink-300 bg-pink-950/40 hover:bg-pink-900/50 border border-pink-700/50 rounded-lg transition-colors text-center"
                  >
                    <span>Foodpanda</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`tel:${RESTAURANT_INFO.phoneClean}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call To Order</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
