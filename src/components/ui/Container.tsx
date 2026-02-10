import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size: "sm" | "md" | "lg" | "xl" | "full";
  as?: "div" | "section" | "article" | "main";
};

export function Container({
  children,
  className = "",
  size,
  as: Component = "div",
}: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component className={`w-full ${sizeStyles[size]} mx-auto ${className}`}>
      {children}
    </Component>
  );
}
