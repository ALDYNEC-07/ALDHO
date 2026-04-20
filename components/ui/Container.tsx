import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.css";

type ContainerWidth = "default" | "narrow" | "wide";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  width?: ContainerWidth;
};

const widthClassName: Record<ContainerWidth, string> = {
  default: styles.default,
  narrow: styles.narrow,
  wide: styles.wide,
};

export function Container({
  children,
  className,
  width = "default",
  ...props
}: ContainerProps) {
  const resolvedClassName = [styles.container, widthClassName[width], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={resolvedClassName} {...props}>
      {children}
    </div>
  );
}
