import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "./cn";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

export type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, error, children }: FieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type { InputProps } from "./input";
export { Input };
export type { TextareaProps } from "./textarea";
export { Textarea };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export function Select({ id, error, className, children, ...props }: SelectProps) {
  return (
    <select
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? `${id}-error` : undefined}
      className={cn(
        "glass-input min-h-11 w-full rounded px-4 py-3 text-white placeholder:text-white/50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
