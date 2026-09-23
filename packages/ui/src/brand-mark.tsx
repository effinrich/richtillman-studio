import type { SVGProps } from "react";
import { cn } from "./cn";

export type BrandMarkProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Draw the black rounded tile behind the mark (app-icon form). Default false. */
  tile?: boolean;
};

const LEFT_BRACE =
  "M39.480 9.24Q34.524 9.24 30.954 7.602Q27.384 5.964 25.536 2.814Q23.688 -0.336 23.94 -4.704L24.78 -18.48Q25.032 -22.932 23.436 -24.906Q21.84 -26.880 16.380 -26.880H7.140V-33.6H16.380Q21.84 -33.6 23.436 -35.574Q25.032 -37.548 24.78 -42.0L23.94 -55.776Q23.688 -60.228 25.536 -63.336Q27.384 -66.444 30.954 -68.082Q34.524 -69.72 39.480 -69.72H43.260V-63.000H39.480Q35.532 -63.000 33.432 -61.194Q31.332 -59.388 31.500 -55.776L32.34 -42.0Q32.676 -36.54 29.736 -33.306Q26.796 -30.072 21.42 -30.072V-30.492Q26.712 -30.492 29.694 -27.216Q32.676 -23.94 32.34 -18.48L31.500 -4.704Q31.332 -1.092 33.432 0.714Q35.532 2.52 39.480 2.52H43.260V9.24Z";
const RIGHT_BRACE =
  "M7.140 9.24V2.52H10.92Q14.868 2.52 16.968 0.714Q19.068 -1.092 18.900 -4.704L18.060 -18.48Q17.724 -23.94 20.706 -27.216Q23.688 -30.492 28.98 -30.492V-30.072Q23.604 -30.072 20.664 -33.306Q17.724 -36.54 18.060 -42.0L18.900 -55.776Q19.068 -59.388 16.968 -61.194Q14.868 -63.000 10.92 -63.000H7.140V-69.72H10.92Q15.876 -69.72 19.446 -68.082Q23.016 -66.444 24.864 -63.336Q26.712 -60.228 26.46 -55.776L25.62 -42.0Q25.368 -37.548 26.964 -35.574Q28.560 -33.6 34.02 -33.6H43.260V-26.880H34.02Q28.644 -26.880 27.006 -24.906Q25.368 -22.932 25.62 -18.48L26.46 -4.704Q26.712 -0.336 24.864 2.814Q23.016 5.964 19.446 7.602Q15.876 9.24 10.92 9.24Z";

/**
 * "Brace" — the studio mark: JetBrains Mono braces joined by a gold span with a magenta node.
 * Source of truth for the SVG is apps/web/public/brand/rt-mark-notile.svg; keep them in step.
 * Decorative by default (aria-hidden); pass `aria-hidden={false}` and `aria-label` when it stands alone.
 */
export function BrandMark({ className, tile = false, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
      {...props}
    >
      {tile ? (
        <>
          <rect width="128" height="128" rx="24" className="fill-black" />
          <rect
            x="0.5"
            y="0.5"
            width="127"
            height="127"
            rx="23.5"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.08"
          />
        </>
      ) : null}
      <path transform="translate(6.86 94.24)" fill="currentColor" d={LEFT_BRACE} />
      <path transform="translate(70.74 94.24)" fill="currentColor" d={RIGHT_BRACE} />
      <rect x="46" y="60" width="36" height="8" rx="3" className="fill-gold" />
      <circle cx="64" cy="64" r="6" className="fill-black" />
      <circle cx="64" cy="64" r="4" className="fill-magenta" />
    </svg>
  );
}
