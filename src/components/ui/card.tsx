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
          bordered && !dashed && !selected && "border border-gray-300/80 shadow-sm",
          dashed && "border-2 border-dashed border-primary-500 bg-primary-50/20",
          hoverable &&
            "cursor-pointer transition-all hover:shadow-md hover:border-gray-400",
          selected && "border-2 border-primary-600 bg-primary-50 shadow-sm",
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
