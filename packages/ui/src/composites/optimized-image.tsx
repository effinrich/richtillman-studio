const WIDTHS = [640, 1280] as const

const ASPECT_WIDTH = 1280
const ASPECT_HEIGHT = 800

type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  loading?: "lazy" | "eager"
}

function variantSrcSet(stem: string, format: "avif" | "webp"): string {
  return WIDTHS.map((width) => {
    const suffix = width === ASPECT_WIDTH ? "" : `-${width}`
    return `${stem}${suffix}.${format} ${width}w`
  }).join(", ")
}

/**
 * The screenshots ship as AVIF and WebP next to the PNG. The variant paths
 * are derived from the source path, so the content layer keeps pointing at
 * one file per image and nothing has to be kept in step by hand.
 *
 * The picture element is laid out as contents, which keeps the image in the
 * same box it was in before, so the caller's classes still apply to it.
 */
export function OptimizedImage({
  src,
  alt,
  className,
  sizes = "100vw",
  loading = "lazy"
}: OptimizedImageProps) {
  const stem = src.replace(/\.png$/, "")

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={variantSrcSet(stem, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={variantSrcSet(stem, "webp")} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        width={ASPECT_WIDTH}
        height={ASPECT_HEIGHT}
      />
    </picture>
  )
}
