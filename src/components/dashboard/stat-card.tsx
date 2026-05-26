import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center py-5 lg:py-6 px-3" hoverable>
      <div className="mb-1.5 text-gray-500">{icon}</div>
      <span className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</span>
      <span className="mt-1 text-xs lg:text-sm text-gray-500">{label}</span>
    </Card>
  );
}
