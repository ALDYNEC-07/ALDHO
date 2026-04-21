import Link from "next/link";
import { Container } from "@/components/ui/Container";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            ALDHO
          </Link>

          <div className={styles.navPlaceholder} aria-hidden="true">
            ALDHO project
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.actionButton} aria-label="Cart">
              Cart
              <span className={styles.badge}>0</span>
            </button>
            <button type="button" className={styles.actionButton} aria-label="Menu">
              Menu
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
