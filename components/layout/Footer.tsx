import { Container } from "@/components/ui/Container";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <div>
            <p className={styles.brand}>ALDHO</p>
            <p className={styles.text}>Minimal clothing brand website in progress.</p>
          </div>

          <div className={styles.meta}>
            <p className={styles.label}>Launch phase</p>
            <p className={styles.text}>Foundation / MVP / Motion</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}