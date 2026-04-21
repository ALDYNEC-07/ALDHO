import type { CartItem } from "@/types";

export const CART_STORAGE_KEY = "aldho-cart";

type AddCartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

export function getCartTotalQuantity(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotalPrice(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

export function addCartItem(
  items: CartItem[],
  input: AddCartItemInput,
): CartItem[] {
  const quantity = input.quantity ?? 1;

  const existingItem = items.find(
    (item) =>
      item.designId === input.designId &&
      item.variantId === input.variantId &&
      item.size === input.size,
  );

  if (!existingItem) {
    return [...items, { ...input, quantity }];
  }

  return items.map((item) =>
    item.id === existingItem.id
      ? { ...item, quantity: item.quantity + quantity }
      : item,
  );
}

export function updateCartItemQuantity(
  items: CartItem[],
  itemId: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return removeCartItem(items, itemId);
  }

  return items.map((item) =>
    item.id === itemId ? { ...item, quantity } : item,
  );
}

export function removeCartItem(items: CartItem[], itemId: string): CartItem[] {
  return items.filter((item) => item.id !== itemId);
}

export function clearCart(): CartItem[] {
  return [];
}
