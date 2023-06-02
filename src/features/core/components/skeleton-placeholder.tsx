interface SkeletonPlaceholderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: "circle";
}

export default function SkeletonPlaceholder({
  width,
  height,
  variant,
  borderRadius = 8,
}: SkeletonPlaceholderProps) {
  const hasVariant = Boolean(variant);

  return (
    <div
      className={`animate-pulse bg-dark-300 ${
        variant === "circle" ? "rounded-full" : "rounded-none"
      }`}
      style={{
        width,
        height,
        borderRadius: !hasVariant ? borderRadius : undefined,
      }}
    />
  );
}
