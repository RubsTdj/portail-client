"use client";

import { useState } from "react";
import { MotoCard } from "@/components/motos/moto-card";
import { AddMotoModal, MotoFormData } from "@/components/motos/add-moto-modal";
import { Button } from "@/components/ui/button";
import { mockMotos } from "@/lib/mock-data";
import { Moto } from "@/lib/types";

export default function MesMotosPage() {
  const [motos, setMotos] = useState<Moto[]>(mockMotos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (data: MotoFormData) => {
    const newMoto: Moto = {
      id: Math.max(...motos.map((m) => m.id), 0) + 1,
      brand: data.brand,
      model: data.brand,
      year: parseInt(data.year) || new Date().getFullYear(),
      registrationDate: data.registrationDate || new Date().toISOString().split("T")[0],
      mileage: parseInt(data.mileage) || 0,
      licensePlate: data.licensePlate,
      vin: data.vin,
      displacement: parseInt(data.displacement) || 0,
      color: data.color,
    };
    setMotos((prev) => [...prev, newMoto]);
  };

  const handleDelete = (id: number) => {
    setMotos((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mes Motos</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Ajouter une moto
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {motos.map((moto) => (
          <MotoCard key={moto.id} moto={moto} onDelete={handleDelete} />
        ))}
      </div>

      <AddMotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
