import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type LinkButtonVariant = "primary" | "secondary";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  variant?: LinkButtonVariant;
};

const variantClassName: Record<LinkButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function LinkButton({
  children,
  href,
  variant = "primary",
}: LinkButtonProps) {
  const resolvedClassName = [styles.button, variantClassName[variant]]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={resolvedClassName}>
      {children}
    </Link>
  );
}