import { Appointment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface NextAppointmentCardProps {
  appointment: Appointment | null;
}

function StatusLabel({ status }: { status: string }) {
  const label = status === "planifie" ? "Planifié" : status === "annule" ? "Annulé" : "Terminé";
  return <span className="text-sm font-medium text-primary-500">{label}</span>;
}

export function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
  if (!appointment) {
    return (
      <div className="rounded-xl border-l-4 border-l-primary-500 border border-gray-200 bg-white p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Votre prochain rendez-vous
        </h3>
        <p className="text-sm text-gray-500">Aucun rendez-vous à venir.</p>
        <div className="mt-4">
          <Link href="/prendre-rdv">
            <Button variant="outline" size="md">
              Prendre un RDV
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-l-4 border-l-primary-500 border border-gray-200 bg-white p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Votre prochain rendez-vous
      </h3>
      <div className="flex items-start justify-between">
        <div>
          <StatusLabel status={appointment.status} />
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {appointment.service}
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <span>📅</span>
            <span>{formatDate(appointment.date)}</span>
          </div>
        </div>
        <Badge variant="success">À venir</Badge>
      </div>
      <div className="mt-5">
        <Link href="/mes-rdv">
          <Button variant="outline" size="md">
            Voir tous mes RDV
          </Button>
        </Link>
      </div>
    </div>
  );
}
