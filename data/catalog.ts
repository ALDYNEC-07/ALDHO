import type { CharacterTheme, Collection, ProductDesign } from "@/types";
import { PRODUCT_SIZES } from "./product-options";

export const collections: Collection[] = [
  {
    id: "example-collection-01",
    slug: "example-collection-01",
    title: "Example Collection 01",
    description: "Техническая заглушка коллекции для проектирования структуры каталога.",
    characterIds: ["example-theme-01"],
  },
];

export const characterThemes: CharacterTheme[] = [
  {
    id: "example-theme-01",
    slug: "example-theme-01",
    name: "Example Theme 01",
    subtitle: "Техническая тема с несколькими дизайнами внутри одного набора.",
    description: "Заглушка для проектирования страницы темы и каталожной карточки.",
    collectionId: "example-collection-01",
    designIds: ["example-design-01", "example-design-02"],
    coverImage: "/images/placeholders/example-theme-cover.jpg",
  },
];

export const productDesigns: ProductDesign[] = [
  {
    id: "example-design-01",
    slug: "example-design-01",
    characterId: "example-theme-01",
    title: "Example Design 01",
    description: "Технический дизайн для проверки связки тема → дизайн → варианты.",
    price: 3500,
    coverImage: "/images/placeholders/example-design-01.jpg",
    variants: [
      {
        id: "example-design-01-black",
        colorLabel: "Black",
        colorHex: "#111111",
        availableSizes: PRODUCT_SIZES,
      },
      {
        id: "example-design-01-white",
        colorLabel: "White",
        colorHex: "#F5F5F5",
        availableSizes: PRODUCT_SIZES,
      },
    ],
  },
  {
    id: "example-design-02",
    slug: "example-design-02",
    characterId: "example-theme-01",
    title: "Example Design 02",
    description: "Вторая техническая заглушка для проверки нескольких дизайнов внутри одной темы.",
    price: 3500,
    coverImage: "/images/placeholders/example-design-02.jpg",
    variants: [
      {
        id: "example-design-02-black",
        colorLabel: "Black",
        colorHex: "#111111",
        availableSizes: PRODUCT_SIZES,
      },
      {
        id: "example-design-02-khaki",
        colorLabel: "Khaki",
        colorHex: "#7A7F63",
        availableSizes: PRODUCT_SIZES,
      },
    ],
  },
];
