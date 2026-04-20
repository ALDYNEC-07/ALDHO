import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClassName: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const resolvedClassName = [styles.button, variantClassName[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={resolvedClassName} {...props}>
      {children}
    </button>
  );
}