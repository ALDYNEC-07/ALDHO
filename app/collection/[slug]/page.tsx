import { notFound } from "next/navigation";
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

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

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
            <article key={design.id} className={styles.designCard}>
              <div className={styles.visual} aria-hidden="true">
                <span className={styles.visualLabel}>{design.title}</span>
              </div>

              <div className={styles.designContent}>
                <div className={styles.designHeader}>
                  <div>
                    <p className={styles.designTitle}>{design.title}</p>
                    <p className={styles.designText}>{design.description}</p>
                  </div>
                  <p className={styles.price}>{formatPrice(design.price)} ₽</p>
                </div>

                <div className={styles.metaBlock}>
                  <p className={styles.metaLabel}>Цвета</p>
                  <div className={styles.variantList}>
                    {design.variants.map((variant) => (
                      <div key={variant.id} className={styles.variantRow}>
                        <span
                          className={styles.swatch}
                          style={{ backgroundColor: variant.colorHex ?? "#ffffff" }}
                          aria-hidden="true"
                        />
                        <span className={styles.variantName}>
                          {variant.colorLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.metaBlock}>
                  <p className={styles.metaLabel}>Размеры</p>
                  <div className={styles.sizeList}>
                    {Array.from(
                      new Set(
                        design.variants.flatMap(
                          (variant) => variant.availableSizes,
                        ),
                      ),
                    ).map((size) => (
                      <span key={size} className={styles.sizeChip}>
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
