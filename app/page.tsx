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
            <p className={styles.eyebrow}>ALDHO / foundation</p>
            <h1 className={styles.title}>Clean start.</h1>
            <p className={styles.text}>
              Базовый Next.js проект создан без Tailwind. Дальше можно
              последовательно собирать структуру сайта на CSS Modules.
            </p>
            <div className={styles.actions}>
              <LinkButton href="#next-step">Следующий шаг</LinkButton>
              <Button variant="secondary" type="button">
                Foundation mode
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="next-step">
        <Container width="narrow">
          <div className={styles.note}>
            <p className={styles.noteLabel}>Phase 1 / in progress</p>
            <p className={styles.noteText}>
              Следом собираем shell сайта: Header, Footer, кнопки и шрифты.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
