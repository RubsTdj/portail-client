"use client";

import { Appointment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconCalendar } from "@/components/ui/icons";
import { formatDate } from "@/lib/utils";

interface RdvCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onReschedule?: (id: string) => void;
}

function getStatusDisplay(status: string) {
  switch (status) {
    case "planifie":
      return { label: "Planifié", color: "text-primary-600" };
    case "annule":
      return { label: "Annulé", color: "text-primary-600" };
    case "termine":
      return { label: "Terminé", color: "text-emerald-600" };
    default:
      return { label: status, color: "text-gray-500" };
  }
}

export function RdvCard({ appointment, onCancel, onReschedule }: RdvCardProps) {
  const statusDisplay = getStatusDisplay(appointment.status);
  const isUpcoming =
    appointment.status === "planifie" &&
    new Date(appointment.date) >= new Date();

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <span className={`text-sm font-semibold ${statusDisplay.color}`}>
            {statusDisplay.label}
          </span>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {appointment.service}
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <IconCalendar size={15} className="text-gray-500" />
            <span>{formatDate(appointment.date)}</span>
          </div>
        </div>
        {isUpcoming && <Badge variant="success">À venir</Badge>}
      </div>

      {isUpcoming && (onCancel || onReschedule) && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
          {onReschedule && (
            <button
              onClick={() => onReschedule(appointment.id)}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Déplacer
            </button>
          )}
          {onCancel && (
            <button
              onClick={() => onCancel(appointment.id)}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              Annuler
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
