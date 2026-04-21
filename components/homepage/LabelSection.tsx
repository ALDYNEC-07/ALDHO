import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./LabelSection.module.css";

export function LabelSection() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.block}>
          <div className={styles.content}>
            <p className={styles.label}>Label</p>
            <h2 className={styles.title}>Качество принта.</h2>
            <p className={styles.text}>
              Здесь позже будет крупный кадр рукава с фирменным лейблом ALDHO и
              деталью принта.
            </p>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.canvas}>
              <div className={styles.arm} />
              <div className={styles.tag}>ALDHO</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
