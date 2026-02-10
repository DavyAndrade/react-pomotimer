import { type ReactNode } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
  className?: string;
}

export function Form({ children, className = "", ...props }: FormProps) {
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
}
