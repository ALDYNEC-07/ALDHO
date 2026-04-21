export type ProductSize = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  characterIds: string[];
};

export type CharacterTheme = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  collectionId: string;
  designIds: string[];
  coverImage?: string;
};

export type ProductVariant = {
  id: string;
  colorLabel: string;
  colorHex?: string;
  availableSizes: ProductSize[];
};

export type ProductDesign = {
  id: string;
  slug: string;
  characterId: string;
  title: string;
  description: string;
  price: number;
  variants: ProductVariant[];
  coverImage?: string;
};

export type CartItem = {
  id: string;
  characterId: string;
  designId: string;
  variantId: string;
  size: ProductSize;
  quantity: number;
  unitPrice: number;
};
