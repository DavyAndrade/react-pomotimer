import type { ReactNode } from "react";

// =========== HEADING ===========

type HeadingProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

export function Heading({
  children,
  as: Component = "h2",
  className = "",
}: HeadingProps) {
  const styles = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-semibold",
    h5: "text-lg font-semibold",
    h6: "text-base font-semibold",
  };

  return (
    <Component className={`${className} ${styles[Component]}`}>
      {children}
    </Component>
  );
}

// =========== TEXT/PARAGRAPH ===========

type TextProps = {
  children: ReactNode;
  as?: "p" | "span" | "div";
  variant?: "body" | "small" | "caption" | "muted";
  className?: string;
};

export function Text({
  children,
  as: Component = "p",
  variant = "body",
  className = "",
}: TextProps) {
  const styles = {
    body: "text-base",
    small: "text-sm",
    caption: "text-xs",
    muted: "text-sm text-gray-400",
  };

  return (
    <Component className={`${styles[variant]} ${className}`}>
      {children}
    </Component>
  );
}

// =========== LABEL ===========

type LabelProps = {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
  required?: boolean;
};

export function Label({
  children,
  className = "",
  htmlFor,
  required = false,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-white ${className}`}
    >
      {children} {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  );
}
