import { getCharacterThemes } from "@/lib/catalog";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import styles from "./CollectionTeaserSection.module.css";

export function CollectionTeaserSection() {
  const themes = getCharacterThemes();

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <div className={styles.copy}>
            <p className={styles.label}>Collection teaser</p>
            <h2 className={styles.title}>Темы и персонажи.</h2>
            <p className={styles.text}>
              Здесь позже будет вход в каталог. Сейчас блок показывает будущую
              структуру карточек на главной странице.
            </p>
          </div>

          <Button variant="secondary" type="button" disabled>
            Коллекция скоро
          </Button>
        </div>

        <div className={styles.grid}>
          {themes.map((theme) => (
            <article key={theme.id} className={styles.card}>
              <div className={styles.preview} aria-hidden="true">
                <span className={styles.count}>{theme.designIds.length}</span>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{theme.name}</p>
                <p className={styles.cardText}>
                  {theme.subtitle ?? "Тема с несколькими дизайнами внутри."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
