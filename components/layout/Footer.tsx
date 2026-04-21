import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.primary}>
            <p className={styles.brand}>ALDHO</p>
            <p className={styles.text}>
              Обмен в день получения при сохранении товарного вида.
            </p>
          </div>

          <div className={styles.meta}>
            <p className={styles.label}>Contacts</p>
            <div className={styles.links} aria-label="Footer contact placeholders">
              <span className={styles.linkItem}>WhatsApp</span>
              <span className={styles.linkItem}>Telegram</span>
              <span className={styles.linkItem}>Instagram</span>
            </div>
            <p className={styles.copy}>© 2026 ALDHO</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
