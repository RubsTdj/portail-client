"use client";

import { NextAppointmentCard } from "@/components/dashboard/next-appointment-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { mockUser, mockAppointments, mockMotos, mockInvoices } from "@/lib/mock-data";
import Link from "next/link";

export default function AccueilPage() {
  const upcomingAppointments = mockAppointments.filter(
    (a) => a.status === "planifie" && new Date(a.date) >= new Date()
  );
  const pastAppointments = mockAppointments.filter(
    (a) => a.status === "termine"
  );
  const nextAppointment = upcomingAppointments[0] || null;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bonjour {mockUser.firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Bienvenue sur votre espace JBF Motos
        </p>
      </div>

      <div className="mb-8">
        <NextAppointmentCard appointment={nextAppointment} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          icon="📅"
          value={upcomingAppointments.length}
          label="RDV à venir"
        />
        <StatCard
          icon="🏍️"
          value={mockMotos.length}
          label="Mes motos"
        />
        <StatCard
          icon="📄"
          value={mockInvoices.length}
          label="Factures"
        />
        <StatCard
          icon="✅"
          value={pastAppointments.length}
          label="RDV passés"
        />
      </div>

      <Link href="/prendre-rdv" className="block">
        <Button variant="primary" size="xl" fullWidth className="rounded-xl">
          PRENDRE UN RENDEZ-VOUS →
        </Button>
      </Link>
    </div>
  );
}
