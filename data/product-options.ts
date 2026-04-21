import type { ProductSize, ProductVariant } from "@/types";

export const PRODUCT_SIZES: ProductSize[] = ["S", "M", "L", "XL", "XXL", "XXXL"];

export const PRODUCT_COLORS = [
  {
    id: "black",
    label: "Черный",
    hex: "#111111",
  },
  {
    id: "white",
    label: "Белый",
    hex: "#F5F5F1",
  },
  {
    id: "khaki",
    label: "Хаки",
    hex: "#7A7F63",
  },
  {
    id: "red",
    label: "Красный",
    hex: "#A62323",
  },
  {
    id: "beige",
    label: "Бежевый",
    hex: "#D7C2A3",
  },
  {
    id: "burgundy",
    label: "Бордовый",
    hex: "#6E1F33",
  },
] as const;

export function createProductVariants(designId: string): ProductVariant[] {
  return PRODUCT_COLORS.map((color) => ({
    id: `${designId}-${color.id}`,
    colorLabel: color.label,
    colorHex: color.hex,
    availableSizes: PRODUCT_SIZES,
  }));
}
