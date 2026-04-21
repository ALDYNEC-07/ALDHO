import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>ALDHO / homepage mvp</p>
            <h1 className={styles.title}>ALDHO</h1>
            <p className={styles.text}>
              Проект сайта бренда одежды ALDHO. Главная страница собирается
              поэтапно: сначала сильная статическая версия, потом детали и
              только после этого motion.
            </p>

            <div className={styles.actions}>
              <LinkButton href="#homepage-state">О проекте</LinkButton>
              <Button variant="secondary" type="button" disabled>
                WhatsApp скоро
              </Button>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.visualFrame}>
              <span className={styles.visualLabel}>ALDHO</span>
              <div className={styles.visualObject}>
                <span className={styles.visualObjectInner}>project</span>
              </div>
              <p className={styles.visualMeta}>Brand site placeholder</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
