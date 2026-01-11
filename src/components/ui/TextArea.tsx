import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={props.id}>{label}</label>
        <textarea
          ref={ref}
          className="border-2 border-gray-600 rounded-md p-2"
          {...props}
        ></textarea>
      </div>
    );
  }
);

export default TextArea;
