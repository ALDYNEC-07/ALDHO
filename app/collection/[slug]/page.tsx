import { notFound } from "next/navigation";
import { ThemePurchaseCard } from "@/components/collection/ThemePurchaseCard";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import {
  getCharacterThemeBySlug,
  getCharacterThemeDesigns,
  getCollections,
  getCharacterThemes,
} from "@/lib/catalog";
import styles from "./ThemePage.module.css";

type ThemePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getCharacterThemes().map((theme) => ({
    slug: theme.slug,
  }));
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = getCharacterThemeBySlug(slug);

  if (!theme) {
    notFound();
  }

  const collection = getCollections().find(
    (item) => item.id === theme.collectionId,
  );
  const designs = getCharacterThemeDesigns(theme.id);

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.label}>
              {collection?.title ?? "Collection"} / theme detail
            </p>
            <h1 className={styles.title}>{theme.name}</h1>
            <p className={styles.subtitle}>
              {theme.subtitle ?? "Тема с несколькими дизайнами внутри."}
            </p>
            <p className={styles.text}>
              {theme.description ??
                "На следующем шаге сюда подключим cart flow и заказ через WhatsApp. Пока страница уже собирает narrative товара и структуру выбора."}
            </p>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryValue}>{designs.length}</span>
              <span className={styles.summaryLabel}>дизайнов в теме</span>
            </div>
            <div className={styles.actions}>
              <LinkButton href="/collection" variant="secondary">
                Назад к коллекции
              </LinkButton>
              <LinkButton href="/" variant="secondary">
                На главную
              </LinkButton>
            </div>
          </div>
        </div>

        <div className={styles.designGrid}>
          {designs.map((design) => (
            <ThemePurchaseCard key={design.id} design={design} theme={theme} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
