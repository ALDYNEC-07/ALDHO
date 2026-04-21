import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./HomepageStateNote.module.css";

export function HomepageStateNote() {
  return (
    <Section id="homepage-state">
      <Container width="narrow">
        <div className={styles.note}>
          <p className={styles.label}>Current state</p>
          <p className={styles.text}>
            Сейчас на главной собран только первый hero-шаг без анимаций и без
            продуктовых секций ниже.
          </p>
        </div>
      </Container>
    </Section>
  );
}
