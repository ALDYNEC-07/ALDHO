import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ children, className, ...props }: SectionProps) {
  const resolvedClassName = [styles.section, className].filter(Boolean).join(" ");

  return (
    <section className={resolvedClassName} {...props}>
      {children}
    </section>
  );
}
