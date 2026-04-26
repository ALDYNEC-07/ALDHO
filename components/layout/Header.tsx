"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { Container } from "@/components/ui/Container";
import styles from "./Header.module.css";

export function Header() {
  const { totalQuantity } = useCart();
  const pathname = usePathname();
  const isHomeStage = pathname === "/";
  const headerClassName = `${styles.header} ${isHomeStage ? styles.headerHomeStage : ""}`;

  return (
    <header className={headerClassName}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="ALDHO home">
            ALDHO
          </Link>

          <div className={styles.actions}>
            <Link href="/cart" className={styles.actionButton} aria-label="Cart">
              <Image
                src="/bag-icon.svg"
                alt=""
                width={22}
                height={22}
                className={styles.icon}
              />
              {totalQuantity > 0 ? (
                <span className={styles.badge}>{totalQuantity}</span>
              ) : null}
            </Link>
            <button type="button" className={styles.actionButton} aria-label="Menu">
              <span className={styles.burger} aria-hidden="true">
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
