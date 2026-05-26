import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  href?: string;
  accent?: string;
}

export function StatCard({ icon, value, label, href, accent }: StatCardProps) {
  const content = (
    <Card
      className={cn(
        "flex flex-col items-center justify-center py-5 lg:py-6 px-3 group transition-all",
        href && "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <div className={cn("mb-1.5", accent || "text-gray-500")}>{icon}</div>
      <span className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</span>
      <span className="mt-1 text-xs lg:text-sm text-gray-500">{label}</span>
    </Card>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
