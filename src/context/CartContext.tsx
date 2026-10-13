import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/restaurantData';

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  steakDoneness?: string;
  selectedSide?: string;
  specialInstructions?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: { doneness?: string; side?: string; notes?: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe_trieste_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cafe_trieste_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (item: MenuItem, options?: { doneness?: string; side?: string; notes?: string }) => {
    const uniqueKey = `${item.id}-${options?.doneness || 'standard'}-${options?.side || 'standard'}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === uniqueKey);
      if (existing) {
        return prev.map((c) =>
          c.id === uniqueKey ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          id: uniqueKey,
          menuItem: item,
          quantity: 1,
          steakDoneness: options?.doneness,
          selectedSide: options?.side,
          specialInstructions: options?.notes,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
