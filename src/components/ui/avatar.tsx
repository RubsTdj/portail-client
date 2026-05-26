import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-16 h-16 text-xl",
  xl: "w-24 h-24 text-3xl",
};

export function Avatar({
  firstName,
  lastName,
  size = "md",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-[#A18072] font-semibold text-white select-none",
        sizeStyles[size],
        className
      )}
    >
      {getInitials(firstName, lastName)}
    </div>
  );
}
