import { Card } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center py-10 lg:py-12 px-4" hoverable>
      <div className="mb-3 text-gray-400">{icon}</div>
      <span className="text-4xl lg:text-5xl font-bold text-gray-900">{value}</span>
      <span className="mt-2 text-sm text-gray-500">{label}</span>
    </Card>
  );
}
