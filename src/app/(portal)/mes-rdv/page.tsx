"use client";

import { RdvCard } from "@/components/rdv/rdv-card";
import { mockAppointments } from "@/lib/mock-data";

export default function MesRdvPage() {
  const sortedAppointments = [...mockAppointments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Mes Rendez-vous
      </h1>
      <div className="flex flex-col gap-4">
        {sortedAppointments.map((appointment) => (
          <RdvCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
