import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Label } from "./Typography";

// =========== BASE PROPS ===========
interface BaseFieldProps {
  label?: string;
  className?: string;
}

// =========== INPUT COMPONENT ===========
interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseFieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
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

Input.displayName = "Input";

// =========== TEXTAREA COMPONENT ===========

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseFieldProps {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className = "", ...props }, ref) => {
    const baseStyles = "border-2 border-gray-600 rounded-md p-2";

    return (
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor={props.id} required={props.required}>
          {label}
        </Label>
        <textarea
          ref={ref}
          className={`${baseStyles} ${className}`}
          {...props}
        ></textarea>
      </div>
    );
  }
);

TextArea.displayName = "Textarea";
