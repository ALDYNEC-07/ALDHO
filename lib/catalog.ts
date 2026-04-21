import { characterThemes, collections, productDesigns } from "@/data/catalog";
import type { CharacterTheme, Collection, ProductDesign } from "@/types";

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getCharacterThemes(): CharacterTheme[] {
  return characterThemes;
}

export function getCharacterThemeBySlug(slug: string): CharacterTheme | undefined {
  return characterThemes.find((theme) => theme.slug === slug);
}

export function getCharacterThemeDesigns(characterId: string): ProductDesign[] {
  return productDesigns.filter((design) => design.characterId === characterId);
}

export function getProductDesigns(): ProductDesign[] {
  return productDesigns;
}

export function getProductDesignBySlug(slug: string): ProductDesign | undefined {
  return productDesigns.find((design) => design.slug === slug);
}
