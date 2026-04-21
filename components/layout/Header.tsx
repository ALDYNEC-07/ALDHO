"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Container } from "@/components/ui/Container";
import styles from "./Header.module.css";

export function Header() {
  const { totalQuantity } = useCart();

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            ALDHO
          </Link>

          <div className={styles.actions}>
            <Link href="/cart" className={styles.actionButton} aria-label="Cart">
              Cart
              <span className={styles.badge}>{totalQuantity}</span>
            </Link>
            <button type="button" className={styles.actionButton} aria-label="Menu">
              Menu
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
