import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "personalized";
  fullWidth?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
  size?: "sm" | "md" | "lg" | "personalized";
  children?: ReactNode;
  className?: string;
}

export const Button = ({
  variant = "primary",
  fullWidth = false,
  rounded = "md",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "hover:cursor-pointer transition-colors font-medium";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    personalized: "",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    personalized: "",
  };

  return (
    <button
      {...props}
      className={`${className} ${baseStyles} ${variantStyles[variant]} ${
        roundedStyles[rounded]
      } ${sizeStyles[size]} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
};
