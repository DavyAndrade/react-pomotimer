import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  variant?: "default" | "bordered";
  tabIndex?: number;
};

export function Card({
  children,
  className = "",
  as: Component = "article",
  variant = "default",
  tabIndex,
}: CardProps) {
  const baseStyles = "rounded-lg transition-colors";

  const variantStyles = {
    default: "bg-gray-800/50 p-6",
    bordered: "bg-gray-800/50 p-6 border-2 border-gray-600",
  };

  return (
    <Component
      className={`${className} ${baseStyles} ${variantStyles[variant]} `}
      tabIndex={tabIndex}
    >
      {children}
    </Component>
  );
}
