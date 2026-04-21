import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CartPageClient } from "@/components/cart/CartPageClient";
import styles from "./CartPage.module.css";

export default function CartPage() {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.label}>Cart</p>
            <h1 className={styles.title}>Корзина ALDHO.</h1>
            <p className={styles.text}>
              Здесь собирается заказ до этапа оформления через WhatsApp.
            </p>
          </div>
        </div>

        <CartPageClient />
      </Container>
    </Section>
  );
}
