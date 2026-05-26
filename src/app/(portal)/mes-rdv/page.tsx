"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { RdvCard } from "@/components/rdv/rdv-card";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { IconCalendar } from "@/components/ui/icons";
import { mockAppointments } from "@/lib/mock-data";
import { Appointment } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

type TabId = "a_venir" | "termines" | "annules";

export default function MesRdvPage() {
  const [activeTab, setActiveTab] = useState<TabId>("a_venir");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const cancellingRdv = cancellingId
    ? appointments.find((a) => a.id === cancellingId)
    : null;

  const upcoming = appointments
    .filter((a) => a.status === "planifie" && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = appointments
    .filter((a) => a.status === "termine")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const cancelled = appointments
    .filter((a) => a.status === "annule")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tabs = [
    { id: "a_venir" as const, label: "À venir", count: upcoming.length },
    { id: "termines" as const, label: "Passés", count: past.length },
    { id: "annules" as const, label: "Annulés", count: cancelled.length },
  ];

  const displayed =
    activeTab === "a_venir"
      ? upcoming
      : activeTab === "termines"
        ? past
        : cancelled;

  const handleCancel = () => {
    if (!cancellingId) return;
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === cancellingId ? { ...a, status: "annule" as const } : a
      )
    );
    setCancellingId(null);
  };

  const handleReschedule = (id: string) => {
    const rdv = appointments.find((a) => a.id === id);
    if (!rdv) return;
    alert(
      "En production, cette action redirigera vers Cal.com pour reprogrammer votre rendez-vous."
    );
  };

  return (
    <div>
      <PageHeader title="Mes Rendez-vous" />

      <div className="mb-5">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
        />
      </div>

      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <IconCalendar size={40} className="text-gray-300 mb-3" />
          <p className="text-sm text-gray-500 mb-4">
            {activeTab === "a_venir" && "Aucun rendez-vous à venir."}
            {activeTab === "termines" && "Aucun rendez-vous passé."}
            {activeTab === "annules" && "Aucun rendez-vous annulé."}
          </p>
          {activeTab === "a_venir" && (
            <Link href="/prendre-rdv">
              <Button variant="primary" size="md">
                Prendre un rendez-vous
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((appointment) => (
            <RdvCard
              key={appointment.id}
              appointment={appointment}
              onCancel={
                appointment.status === "planifie"
                  ? (id) => setCancellingId(id)
                  : undefined
              }
              onReschedule={
                appointment.status === "planifie"
                  ? handleReschedule
                  : undefined
              }
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!cancellingId}
        onClose={() => setCancellingId(null)}
        onConfirm={handleCancel}
        title="Annuler ce rendez-vous ?"
        message={`Êtes-vous sûr de vouloir annuler votre rendez-vous « ${cancellingRdv?.service} » du ${cancellingRdv ? formatDate(cancellingRdv.date) : ""} ? Cette action est irréversible.`}
        confirmLabel="Oui, annuler"
        cancelLabel="Non, garder"
        variant="danger"
      />
    </div>
  );
}
