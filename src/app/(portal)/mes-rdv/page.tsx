"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { RdvCard } from "@/components/rdv/rdv-card";
import { Tabs } from "@/components/ui/tabs";
import { mockAppointments } from "@/lib/mock-data";

type TabId = "a_venir" | "termines" | "annules";

export default function MesRdvPage() {
  const [activeTab, setActiveTab] = useState<TabId>("a_venir");

  const upcoming = mockAppointments
    .filter((a) => a.status === "planifie" && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = mockAppointments
    .filter((a) => a.status === "termine")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const cancelled = mockAppointments
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

  return (
    <div>
      <PageHeader title="Mes Rendez-vous" />

      <div className="mb-6">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as TabId)}
        />
      </div>

      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-gray-500">
            {activeTab === "a_venir" && "Aucun rendez-vous à venir."}
            {activeTab === "termines" && "Aucun rendez-vous passé."}
            {activeTab === "annules" && "Aucun rendez-vous annulé."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((appointment) => (
            <RdvCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}
