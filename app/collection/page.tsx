import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getCharacterThemes, getCollections } from "@/lib/catalog";
import styles from "./CollectionPage.module.css";

export default function CollectionPage() {
  const collections = getCollections();
  const themes = getCharacterThemes();
  const totalDesigns = themes.reduce(
    (sum, theme) => sum + theme.designIds.length,
    0,
  );

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.label}>Collection</p>
            <h1 className={styles.title}>Темы и персонажи ALDHO.</h1>
            <p className={styles.text}>
              Здесь начинается каталог: пользователь выбирает тему, затем
              переходит к дизайнам и параметрам товара.
            </p>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaCard}>
              <span className={styles.metaValue}>{collections.length}</span>
              <span className={styles.metaLabel}>коллекций</span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaValue}>{themes.length}</span>
              <span className={styles.metaLabel}>тем</span>
            </div>
            <div className={styles.metaCard}>
              <span className={styles.metaValue}>{totalDesigns}</span>
              <span className={styles.metaLabel}>дизайнов</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/collection/${theme.slug}`}
              className={styles.card}
            >
              <div className={styles.preview} aria-hidden="true">
                <span className={styles.count}>{theme.designIds.length}</span>
                <span className={styles.previewLabel}>ALDHO</span>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>{theme.name}</p>
                <p className={styles.cardSubtitle}>
                  {theme.subtitle ?? "Тема с несколькими дизайнами внутри."}
                </p>
                <p className={styles.cardText}>
                  {theme.description ??
                    "Страница темы ведёт к наборам дизайнов, цветов и размеров."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
