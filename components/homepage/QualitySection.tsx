import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./QualitySection.module.css";

export function QualitySection() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.block}>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.texture} />
          </div>

          <div className={styles.content}>
            <p className={styles.label}>Quality</p>
            <h2 className={styles.title}>Плотный хлопок.</h2>
            <p className={styles.text}>
              Спокойная, чистая подача качества без лишнего визуального шума.
              Здесь позже будет реальное фото ткани крупным планом.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
