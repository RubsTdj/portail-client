import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "danger" | "warning" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-amber-500 text-white",
  neutral: "bg-gray-200 text-gray-700",
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
