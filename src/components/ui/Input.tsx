import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={props.id}>{label}</label>
        <input
          ref={ref}
          className="border-2 border-gray-600 rounded-md p-2"
          {...props}
        />
      </div>
    );
  }
);

export default Input;
