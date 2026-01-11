import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "transparent";
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

const Button = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-md hover:cursor-pointer transition-colors p-2 font-bold";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    transparent: "bg-transparent hover:bg-gray-700",
  };

  if (fullWidth) {
    className = `w-full ${variantStyles[variant]} ${className}`;
  } else {
    className = `${variantStyles[variant]} ${className}`;
  }

  return (
    <button {...props} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
