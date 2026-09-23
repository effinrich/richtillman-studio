import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

const GOLD =
  "min-h-11 rounded bg-gold px-6 py-3 font-semibold text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:bg-[#ffe54c] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] motion-safe:hover:scale-105";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: GOLD,
        glass:
          "glass-panel min-h-11 rounded px-6 py-3 font-medium text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] motion-safe:hover:scale-105",
        outline:
          "min-h-11 rounded border border-gold/30 bg-transparent px-6 py-3 font-medium text-gold hover:bg-gold/10",
        ghost:
          "min-h-11 rounded-lg bg-transparent px-1 py-2 font-medium text-gold hover:text-[#ffe54c]",
        muted:
          "min-h-11 rounded-lg bg-transparent px-4 py-3 text-sm font-medium text-white/50 hover:text-white",
      },
      fullWidth: {
        true: "w-full sm:w-auto",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      fullWidth: false,
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

type ButtonStyleProps = VariantProps<typeof buttonVariants>;

export function buttonClassName({
  variant = "primary",
  fullWidth = false,
  className,
}: ButtonStyleProps & { className?: string }): string {
  return cn(buttonVariants({ variant, fullWidth }), className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps & {
    asChild?: boolean;
  };

export function Button({
  variant = "primary",
  fullWidth = false,
  className,
  type = "button",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      type={asChild ? undefined : type}
      className={buttonClassName({ variant, fullWidth, className })}
      {...props}
    />
  );
}

export type ButtonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyleProps;

export const ButtonAnchor = forwardRef<HTMLAnchorElement, ButtonAnchorProps>(function ButtonAnchor(
  { variant = "muted", fullWidth = false, className, children, ...props },
  ref,
) {
  return (
    <a ref={ref} className={buttonClassName({ variant, fullWidth, className })} {...props}>
      {children}
    </a>
  );
});
