"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { useCart } from "@/components/cart/CartProvider";
import { getCharacterThemeById, getProductDesignById } from "@/lib/catalog";
import styles from "./CartPageClient.module.css";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function CartPageClient() {
  const {
    items,
    totalPrice,
    totalQuantity,
    updateItemQuantity,
    removeItem,
    clearItems,
    hydrated,
  } = useCart();

  if (!hydrated) {
    return <p className={styles.emptyText}>Загружаем корзину...</p>;
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Корзина пока пустая.</p>
        <p className={styles.emptyText}>
          Добавьте товар из коллекции, чтобы продолжить к оформлению.
        </p>
        <LinkButton href="/collection">Перейти в коллекцию</LinkButton>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.itemList}>
        {items.map((item) => {
          const design = getProductDesignById(item.designId);
          const theme = getCharacterThemeById(item.characterId);
          const variant = design?.variants.find(
            (entry) => entry.id === item.variantId,
          );
          const itemTotal = item.unitPrice * item.quantity;

          return (
            <article key={item.id} className={styles.itemCard}>
              <div className={styles.itemHeader}>
                <div>
                  <p className={styles.itemTheme}>{theme?.name ?? "ALDHO"}</p>
                  <p className={styles.itemTitle}>{design?.title ?? item.designId}</p>
                </div>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                >
                  Удалить
                </button>
              </div>

              <div className={styles.metaRow}>
                <span className={styles.metaChip}>
                  Цвет: {variant?.colorLabel ?? item.variantId}
                </span>
                <span className={styles.metaChip}>Размер: {item.size}</span>
              </div>

              <div className={styles.itemFooter}>
                <div className={styles.quantityRow}>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className={styles.itemPrice}>{formatPrice(itemTotal)} ₽</p>
              </div>
            </article>
          );
        })}
      </div>

      <aside className={styles.summaryCard}>
        <p className={styles.summaryLabel}>Cart summary</p>
        <p className={styles.summaryValue}>{totalQuantity}</p>
        <p className={styles.summaryText}>товаров в корзине</p>
        <p className={styles.total}>{formatPrice(totalPrice)} ₽</p>

        <div className={styles.summaryActions}>
          <Button type="button" variant="secondary" onClick={clearItems}>
            Очистить корзину
          </Button>
          <LinkButton href="/collection">Продолжить выбор</LinkButton>
        </div>

        <p className={styles.summaryNote}>
          WhatsApp checkout подключим, когда будет номер для заказов.
        </p>
        <Link href="/" className={styles.backLink}>
          Вернуться на главную
        </Link>
      </aside>
    </div>
  );
}
