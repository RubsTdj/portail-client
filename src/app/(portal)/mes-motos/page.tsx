"use client";

import { useState } from "react";
import { MotoCard } from "@/components/motos/moto-card";
import { MotoModal, MotoFormData } from "@/components/motos/moto-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { mockMotos } from "@/lib/mock-data";
import { Moto } from "@/lib/types";

export default function MesMotosPage() {
  const [motos, setMotos] = useState<Moto[]>(mockMotos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);
  const [deletingMoto, setDeletingMoto] = useState<Moto | null>(null);

  const formToMoto = (data: MotoFormData, id?: number): Moto => ({
    id: id ?? Math.max(...motos.map((m) => m.id), 0) + 1,
    brand: data.brand,
    model: data.model,
    year: parseInt(data.year) || new Date().getFullYear(),
    registrationDate: data.registrationDate || new Date().toISOString().split("T")[0],
    mileage: parseInt(data.mileage) || 0,
    licensePlate: data.licensePlate,
    vin: data.vin,
    displacement: parseInt(data.displacement) || 0,
    color: data.color,
  });

  const handleAdd = (data: MotoFormData) => {
    setMotos((prev) => [...prev, formToMoto(data)]);
  };

  const handleEdit = (data: MotoFormData) => {
    if (!editingMoto) return;
    setMotos((prev) =>
      prev.map((m) => (m.id === editingMoto.id ? formToMoto(data, m.id) : m))
    );
    setEditingMoto(null);
  };

  const handleDelete = () => {
    if (!deletingMoto) return;
    setMotos((prev) => prev.filter((m) => m.id !== deletingMoto.id));
    setDeletingMoto(null);
  };

  return (
    <div className="mx-auto max-w-4xl py-4 lg:py-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Mes Motos</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Ajouter une moto
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {motos.map((moto) => (
          <MotoCard
            key={moto.id}
            moto={moto}
            onEdit={(m) => setEditingMoto(m)}
            onDelete={(m) => setDeletingMoto(m)}
          />
        ))}
      </div>

      <MotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
      />

      <MotoModal
        isOpen={!!editingMoto}
        onClose={() => setEditingMoto(null)}
        onSubmit={handleEdit}
        moto={editingMoto}
      />

      <ConfirmDialog
        isOpen={!!deletingMoto}
        onClose={() => setDeletingMoto(null)}
        onConfirm={handleDelete}
        title="Supprimer cette moto ?"
        message={`Êtes-vous sûr de vouloir supprimer la ${deletingMoto?.brand} ${deletingMoto?.model} ? Cette action est irréversible.`}
        confirmLabel="Oui, supprimer"
        cancelLabel="Annuler"
        variant="danger"
      />
    </div>
  );
}
