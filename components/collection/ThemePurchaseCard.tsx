"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getCartItemId } from "@/lib/cart";
import { useCart } from "@/components/cart/CartProvider";
import type { CharacterTheme, ProductDesign, ProductSize } from "@/types";
import styles from "./ThemePurchaseCard.module.css";

type ThemePurchaseCardProps = {
  design: ProductDesign;
  theme: CharacterTheme;
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function ThemePurchaseCard({
  design,
  theme,
}: ThemePurchaseCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(design.variants[0]?.id);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    design.variants[0]?.availableSizes[0] ?? "M",
  );
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const selectedVariant =
    design.variants.find((variant) => variant.id === selectedVariantId) ??
    design.variants[0];
  const availableSizes = selectedVariant?.availableSizes ?? [];

  function handleSizeChange(size: ProductSize) {
    setSelectedSize(size);
    setAdded(false);
  }

  function handleVariantChange(variantId: string) {
    const nextVariant =
      design.variants.find((variant) => variant.id === variantId) ?? design.variants[0];

    setSelectedVariantId(variantId);
    setAdded(false);

    if (nextVariant && !nextVariant.availableSizes.includes(selectedSize)) {
      setSelectedSize(nextVariant.availableSizes[0] ?? "M");
    }
  }

  function handleAddToCart() {
    if (!selectedVariant) {
      return;
    }

    addItem({
      id: getCartItemId(design.id, selectedVariant.id, selectedSize),
      characterId: theme.id,
      designId: design.id,
      variantId: selectedVariant.id,
      size: selectedSize,
      unitPrice: design.price,
    });

    setAdded(true);
  }

  return (
    <article className={styles.designCard}>
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.visualLabel}>{design.title}</span>
      </div>

      <div className={styles.designContent}>
        <div className={styles.designHeader}>
          <div>
            <p className={styles.designTitle}>{design.title}</p>
            <p className={styles.designText}>{design.description}</p>
          </div>
          <p className={styles.price}>{formatPrice(design.price)} ₽</p>
        </div>

        <div className={styles.metaBlock}>
          <p className={styles.metaLabel}>Цвет</p>
          <div className={styles.optionList}>
            {design.variants.map((variant) => {
              const isActive = selectedVariant?.id === variant.id;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleVariantChange(variant.id)}
                  className={`${styles.optionButton} ${isActive ? styles.optionButtonActive : ""}`}
                >
                  <span
                    className={styles.swatch}
                    style={{ backgroundColor: variant.colorHex ?? "#ffffff" }}
                    aria-hidden="true"
                  />
                  <span className={styles.optionLabel}>{variant.colorLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.metaBlock}>
          <p className={styles.metaLabel}>Размер</p>
          <div className={styles.optionList}>
            {availableSizes.map((size) => {
              const isActive = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`${styles.optionButton} ${isActive ? styles.optionButtonActive : ""}`}
                >
                  <span className={styles.optionLabel}>{size}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.purchaseRow}>
          <Button type="button" onClick={handleAddToCart}>
            В корзину
          </Button>
          <p className={styles.purchaseHint}>
            {added
              ? "Товар добавлен в корзину."
              : "Заказ через WhatsApp подключим после получения номера."}
          </p>
        </div>
      </div>
    </article>
  );
}
