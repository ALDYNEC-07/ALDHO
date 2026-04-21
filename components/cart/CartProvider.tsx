"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";
import {
  CART_STORAGE_KEY,
  addCartItem,
  clearCart,
  getCartTotalPrice,
  getCartTotalQuantity,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart";

type AddCartInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addItem: (input: AddCartInput) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearItems: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalPrice: getCartTotalPrice(items),
      totalQuantity: getCartTotalQuantity(items),
      addItem: (input) => {
        setItems((currentItems) => addCartItem(currentItems, input));
      },
      updateItemQuantity: (itemId, quantity) => {
        setItems((currentItems) =>
          updateCartItemQuantity(currentItems, itemId, quantity),
        );
      },
      removeItem: (itemId) => {
        setItems((currentItems) => removeCartItem(currentItems, itemId));
      },
      clearItems: () => {
        setItems(clearCart());
      },
      hydrated,
    }),
    [hydrated, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
