import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import styles from "./BrandSection.module.css";

export function BrandSection() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.block}>
          <p className={styles.word}>ALDHO</p>
          <div className={styles.content}>
            <p className={styles.text}>
              Бренд из Алды. Одежда для тех, кому не нужно ничего доказывать.
            </p>
            <LinkButton href="/collection" variant="secondary">
              Смотреть коллекцию
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
