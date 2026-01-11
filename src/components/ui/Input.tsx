import { forwardRef, type InputHTMLAttributes } from "react";
import { Label } from "./Typography";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => {
    const baseStyles = "border-2 border-gray-600 rounded-md p-2";

    return (
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor={props.id} required={props.required}>
          {label}
        </Label>
        <input ref={ref} className={`${baseStyles} ${className}`} {...props} />
      </div>
    );
  }
);

export default Input;
