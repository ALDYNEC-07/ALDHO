import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Section>
        <Container width="narrow">
          <div className={styles.card}>
            <p className={styles.eyebrow}>ALDHO</p>
            <h1 className={styles.title}>Проект ALDHO.</h1>
            <p className={styles.text}>
              Здесь собирается сайт бренда одежды ALDHO.
            </p>
            <div className={styles.actions}>
              <LinkButton href="#next-step">ALDHO</LinkButton>
              <Button variant="secondary" type="button">
                Project
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="next-step">
        <Container width="narrow">
          <div className={styles.note}>
            <p className={styles.noteLabel}>ALDHO</p>
            <p className={styles.noteText}>
              Текущий экран используется как базовая заглушка проекта.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
