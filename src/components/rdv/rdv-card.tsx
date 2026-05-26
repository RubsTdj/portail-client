import { Appointment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface RdvCardProps {
  appointment: Appointment;
}

function getStatusDisplay(status: string) {
  switch (status) {
    case "planifie":
      return { label: "Planifié", color: "text-primary-500" };
    case "annule":
      return { label: "Annulé", color: "text-primary-500" };
    case "termine":
      return { label: "Terminé", color: "text-emerald-500" };
    default:
      return { label: status, color: "text-gray-500" };
  }
}

export function RdvCard({ appointment }: RdvCardProps) {
  const statusDisplay = getStatusDisplay(appointment.status);
  const isUpcoming =
    appointment.status === "planifie" &&
    new Date(appointment.date) >= new Date();

  return (
    <Card className="flex items-start justify-between">
      <div>
        <span className={`text-sm font-medium ${statusDisplay.color}`}>
          {statusDisplay.label}
        </span>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {appointment.service}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <span>📅</span>
          <span>{formatDate(appointment.date)}</span>
        </div>
      </div>
      {isUpcoming && <Badge variant="success">À venir</Badge>}
    </Card>
  );
}
