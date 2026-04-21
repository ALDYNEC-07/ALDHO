import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div>
            <p className={styles.brand}>ALDHO</p>
            <p className={styles.text}>Проект сайта бренда одежды ALDHO.</p>
          </div>

          <div className={styles.meta}>
            <p className={styles.label}>ALDHO</p>
            <p className={styles.text}>Project placeholder</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
