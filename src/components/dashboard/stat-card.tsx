import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center py-8 px-4" hoverable>
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className="mt-1 text-sm text-gray-500">{label}</span>
    </Card>
  );
}
