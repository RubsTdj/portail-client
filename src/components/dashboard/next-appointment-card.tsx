import { Appointment, Moto } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconCalendar, IconMotorcycle } from "@/components/ui/icons";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface NextAppointmentCardProps {
  appointment: Appointment | null;
  moto?: Moto | null;
}

function StatusLabel({ status }: { status: string }) {
  const label = status === "planifie" ? "Planifié" : status === "annule" ? "Annulé" : "Terminé";
  return <span className="text-sm font-semibold text-primary-600">{label}</span>;
}

export function NextAppointmentCard({ appointment, moto }: NextAppointmentCardProps) {
  if (!appointment) {
    return (
      <div className="rounded-xl border-l-4 border-l-primary-600 border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Votre prochain rendez-vous
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Vous n&apos;avez aucun rendez-vous prévu. Prenez rendez-vous en quelques clics.
        </p>
        <Link href="/prendre-rdv">
          <Button variant="primary" size="md">
            Prendre un rendez-vous
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-l-4 border-l-primary-600 border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-gray-900">
          Votre prochain rendez-vous
        </h3>
        <Badge variant="success">À venir</Badge>
      </div>
      <div>
        <StatusLabel status={appointment.status} />
        <p className="mt-1 text-lg font-bold text-gray-900">
          {appointment.service}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <IconCalendar size={15} className="text-gray-500" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          {moto && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <IconMotorcycle size={15} className="text-gray-500" />
              <span>{moto.brand} {moto.model}</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Link href="/mes-rdv">
          <Button variant="outline" size="sm">
            Voir tous mes RDV
          </Button>
        </Link>
      </div>
    </div>
  );
}
