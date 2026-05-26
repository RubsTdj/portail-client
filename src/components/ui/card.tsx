import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
  selected?: boolean;
  dashed?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverable = false,
      bordered = true,
      selected = false,
      dashed = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-white p-5",
          bordered && !dashed && "border border-gray-200",
          dashed && "border-2 border-dashed border-primary-300",
          hoverable &&
            "cursor-pointer transition-shadow hover:shadow-md",
          selected && "border-2 border-primary-500 bg-primary-50/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
