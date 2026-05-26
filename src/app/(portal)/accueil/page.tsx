"use client";

import { NextAppointmentCard } from "@/components/dashboard/next-appointment-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { IconCalendar, IconMotorcycle, IconFileText, IconCheckCircle } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { mockUser, mockAppointments, mockMotos, mockInvoices } from "@/lib/mock-data";
import Link from "next/link";

export default function AccueilPage() {
  const { user } = useAuth();
  const displayUser = user || mockUser;

  const upcomingAppointments = mockAppointments.filter(
    (a) => a.status === "planifie" && new Date(a.date) >= new Date()
  );
  const pastAppointments = mockAppointments.filter(
    (a) => a.status === "termine"
  );
  const nextAppointment = upcomingAppointments[0] || null;
  const nextMoto = nextAppointment
    ? mockMotos.find((m) => m.id === nextAppointment.motoId) || null
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour {displayUser.firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Bienvenue sur votre espace JBF Motos
        </p>
      </div>

      <div className="mb-5">
        <NextAppointmentCard appointment={nextAppointment} moto={nextMoto} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={<IconCalendar size={24} />}
          value={upcomingAppointments.length}
          label="RDV à venir"
          href="/mes-rdv"
          accent="text-primary-500"
        />
        <StatCard
          icon={<IconMotorcycle size={24} />}
          value={mockMotos.length}
          label="Mes motos"
          href="/mes-motos"
          accent="text-gray-600"
        />
        <StatCard
          icon={<IconFileText size={24} />}
          value={mockInvoices.length}
          label="Factures"
          href="/mes-factures"
          accent="text-gray-600"
        />
        <StatCard
          icon={<IconCheckCircle size={24} />}
          value={pastAppointments.length}
          label="RDV passés"
          href="/mes-rdv"
          accent="text-emerald-500"
        />
      </div>

      <Link href="/prendre-rdv" className="hidden lg:block">
        <Button variant="primary" size="xl" fullWidth className="rounded-xl">
          PRENDRE UN RENDEZ-VOUS →
        </Button>
      </Link>
    </div>
  );
}
